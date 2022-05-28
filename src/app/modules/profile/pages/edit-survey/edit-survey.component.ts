import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyDetails } from 'src/app/modules/surveys/models/SurveyDetails';
import { NgxSpinnerService } from 'ngx-spinner';
import { SurveyService } from 'src/app/modules/surveys/services/survey.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SaveQuestionComponent } from '../../components/save-question/save-question.component';

@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.scss']
})
export class EditSurveyComponent implements OnInit {
  form!: FormGroup;
  survey!: SurveyDetails;

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
  }

}
