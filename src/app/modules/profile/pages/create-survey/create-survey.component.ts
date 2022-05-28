import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateSurveyRequest } from 'src/app/modules/surveys/models/CreateSurveyRequest';
import { SurveyService } from 'src/app/modules/surveys/services/survey.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.scss'],
})
export class CreateSurveyComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private surveyService: SurveyService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.form = this.surveyService.createSurveyForm()
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.snackBar.open('Invalid data.', 'Close', { duration: 3000 });
      return;
    }

    try {
      this.spinner.show('global');
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
    } finally {
      this.spinner.hide('global');
    }
  }
}
