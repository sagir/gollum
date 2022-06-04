import { Component, OnInit } from '@angular/core';
import { SurveyDetails } from 'src/app/modules/surveys/models/SurveyDetails';
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from '../../services/survey.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  survey?: SurveyDetails;

  constructor(
    private route: ActivatedRoute,
    private surveyService: SurveyService,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar,
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      this.spinner.show('global');
      this.survey = await this.surveyService.getSurveyReport(this.route.snapshot.params['id']);
    } catch (error: any) {
      this.snackBar.open(error.message || 'Something went wrong. Please try again later.', 'Close');
    } finally {
      this.spinner.hide('global');
    }
  }

}
