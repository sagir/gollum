import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SurveyStorageService } from './modules/surveys/services/survey-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { PendingSurveyConfirmationComponent } from './components/pending-survey-confirmation/pending-survey-confirmation.component';
import { filter, first } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'gollum';

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private surveyStorageService: SurveyStorageService
  ) { }

  ngOnInit(): void {

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd), first())
      .subscribe(({ url }: any) => this.showPendingSurveyNotification(url));
  }

  showPendingSurveyNotification(url: string): void {
    const survey = this.surveyStorageService.getPendingSurvey();

    if (survey && ['surveys/', 'questions/'].every(item => url.indexOf(item) === -1)) {
      const ref = this.dialog.open(PendingSurveyConfirmationComponent);

      ref.afterClosed().subscribe(bool => {
        if (bool) {
          if (survey.questions.length) {
            this.router.navigate(['surveys', survey.id, 'quesitons', survey.questions[survey.questions.length - 1].id]);
          } else {
            this.router.navigate(['surveys', survey.id]);
          }
        } else {
          this.surveyStorageService.clearPendingSurvey();
        }
      })
    }
  }
}
