import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SurveyStorageService } from './modules/surveys/services/survey-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'gollum';

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private surveyStorageService: SurveyStorageService
  ) { }

  ngOnInit(): void {
    const url = this.router.url;
    const survey = this.surveyStorageService.getPendingSurvey();
    if (survey && ['surveys/', 'questions/'].every(item => url.indexOf(item) === -1)) {
      const ref = this.snackBar.open('You have a pending survey. Do you want to continue?', 'Yes', { duration: 5000 });
      ref.onAction().subscribe(() => {
        this.router.navigateByUrl(`/surveys/${survey.id}/questions/${survey.questions[survey.questions.length - 1]}`);
      })
    }
  }
}
