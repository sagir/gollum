import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyDetails } from 'src/app/modules/surveys/models/SurveyDetails';
import { NgxSpinnerService } from 'ngx-spinner';
import { SurveyService } from 'src/app/modules/surveys/services/survey.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.scss']
})
export class EditSurveyComponent implements OnInit {
  survey!: SurveyDetails;

  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private surveyService: SurveyService
  ) { }

  ngOnInit(): void {
    this.loadSurvey();
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

}
