import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyDetails } from 'src/app/modules/surveys/models/SurveyDetails';
import { NgxSpinnerService } from 'ngx-spinner';
import { SurveyService } from 'src/app/modules/surveys/services/survey.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SaveQuestionComponent } from '../../components/save-question/save-question.component';
import { filter, Subject, takeUntil } from 'rxjs';
import { Question } from 'src/app/modules/surveys/models/Question';

@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.scss']
})
export class EditSurveyComponent implements OnInit, OnDestroy {
  private readonly ngUnsubscribe$ = new Subject<void>();

  form!: FormGroup;
  survey!: SurveyDetails;

  questionDisplayColumns = ['text', 'actions', 'options'];

  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private surveyService: SurveyService,
    private dialog: MatDialog
  ) { }

  async ngOnInit(): Promise<void> {
    await this.loadSurvey();
    this.form = this.surveyService.createSurveyForm(this.survey);
  }

  private async loadSurvey(): Promise<void> {
    const id = this.route.snapshot.params['id'];
    try {
      this.spinner.show('global');
      this.survey = await this.surveyService.getSurvey(id);
    } catch (error) {
      this.snackBar.open('Something went wrong. Please try again.', 'Close', { duration: 400 })
    } finally {
      this.spinner.hide('global');
    }
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.snackBar.open('Invalid data', 'Close', { duration: 3000 });
      return;
    }

    try {
      this.spinner.show('global');
      await this.surveyService.updateSurvey(this.survey.id, this.form.value);
      this.snackBar.open('Survey updated successfully', 'Close', { duration: 3000 });
    } catch (error) {
      this.snackBar.open('Something went wrong. Please try again.', 'Close', { duration: 3000 });
    } finally {
      this.spinner.hide('global');
    }
  }

  addQuestion() {
    const dialog = this.dialog.open(SaveQuestionComponent, {
      width: '500px',
      maxWidth: 'calc(100% - 32px)',
      data: {
        title: 'Create Question',
        surveyId: this.survey.id
      }
    });

    dialog.afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe$), filter(Boolean))
      .subscribe((question: Question) => {
        this.survey.questions.push(question);
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
