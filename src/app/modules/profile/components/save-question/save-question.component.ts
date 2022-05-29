import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { QuesitonTypes } from 'src/app/modules/surveys/enums/QuestionTypes';
import { NgxSpinnerService } from 'ngx-spinner';
import { QuestionService } from 'src/app/modules/surveys/services/question.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestionDto } from 'src/app/modules/surveys/models/QuestionDto';

@Component({
  selector: 'app-save-question',
  templateUrl: './save-question.component.html',
  styleUrls: ['./save-question.component.scss'],
})
export class SaveQuestionComponent implements OnInit, OnDestroy {
  private readonly ngUnsubscribe$ = new Subject<void>();

  form!: FormGroup;
  optionText = new FormControl(null);
  questionTypes!: Array<{ label: string; value: QuesitonTypes }>;

  get options(): FormArray {
    return this.form.controls['options'] as FormArray;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      surveyId: number;
    },
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private questionService: QuestionService,
    private dialogRef: MatDialogRef<SaveQuestionComponent>,
  ) {}

  ngOnInit(): void {
    const values = Object.values(QuesitonTypes).slice(3, 6);
    this.questionTypes = Object.keys(QuesitonTypes)
      .slice(3, 6)
      .map((key, index) => {
        return { label: key, value: values[index] as QuesitonTypes };
      });

    this.createForm();
  }

  private createForm() {
    this.form = this.fb.group({
      text: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ],
      ],
      answerType: [QuesitonTypes.MultiChoice, [Validators.required]],
      options: this.fb.array([]),
    });

    this.updateOptionValidators(QuesitonTypes.MultiChoice);
    this.form.controls['answerType'].valueChanges
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((value: QuesitonTypes) => this.updateOptionValidators(value));
  }

  private updateOptionValidators(questionType: QuesitonTypes): void {
    if (questionType !== QuesitonTypes.Text) {
      this.options.setValidators([Validators.required, Validators.minLength(2), Validators.maxLength(4)]);
      this.options.controls.forEach((option) => {
        option.setValidators([Validators.required, Validators.minLength(1), Validators.maxLength(255)]);
      });
    } else {
      this.options.clearValidators();
      this.options.controls.forEach((option) => {
        option.clearValidators();
        option.updateValueAndValidity();
      });
    }

    this.options.updateValueAndValidity();
    this.options.controls.forEach(option => option.updateValueAndValidity());
  }

  onOptionTextEnter($event: KeyboardEvent): void {
    if ($event.key === 'Enter') {
      $event.preventDefault();
      $event.stopPropagation();
      this.addOption();
    }
  }

  addOption(): void {
    if (this.optionText.valid) {
      const options = this.form.controls['options'] as FormArray
      options.push(new FormControl(this.optionText.value));
      this.optionText.setValue(null);
      this.updateOptionValidators(this.form.controls['answerType'].value as QuesitonTypes);
    }
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.snackBar.open('Invalid question data.', 'Close', { duration: 3000 });
      return;
    }

    try {
      this.spinner.show('global');
      const res = await this.questionService.createQuestion(this.data.surveyId, this.form.value as QuestionDto);
      this.dialogRef.close(res);
    } catch (error) {
      this.snackBar.open('Something went wrong. Please try again.');
    } finally {
      this.spinner.hide('global');
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
