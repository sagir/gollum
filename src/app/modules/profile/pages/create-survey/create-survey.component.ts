import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateSurveyRequest } from 'src/app/modules/surveys/models/CreateSurveyRequest';
import { SurveyService } from 'src/app/modules/surveys/services/survey.service';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.scss'],
})
export class CreateSurveyComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private surveyService: SurveyService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.fb.group({
      title: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ],
      ],
      description: [
        null,
        [Validators.minLength(10), Validators.maxLength(2000)],
      ],
      timeLimit: [
        null,
        [Validators.required, Validators.min(1), Validators.max(120)],
      ],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.snackBar.open('Invalid data.', 'Close', { duration: 3000 });
      return;
    }

    try {
      const survey = await this.surveyService.createSurvey(
        this.form.value as CreateSurveyRequest
      );
      this.snackBar.open('Survey created successfully', 'Close', {
        duration: 3000,
      });
    } catch (error) {
      this.snackBar.open('Something went wrong. Please try again.', 'Close', {
        duration: 3000,
      });
    }
  }
}
