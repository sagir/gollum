import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SurveyService } from 'src/app/modules/surveys/services/survey.service';
import { SurveyDetails } from 'src/app/modules/surveys/models/SurveyDetails';
import { SurveyStorageService } from '../../services/survey-storage.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit, OnDestroy {
  private readonly ngUnsubscribe$ = new Subject<void>();

  survey!: SurveyDetails;
  timer$!: Observable<string>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private surveyService: SurveyService,
    private surveyStorageService: SurveyStorageService
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(({ id }) => {
        this.loadSurvey(id);
      });
  }

  private async loadSurvey(id: string | number): Promise<void> {
    try {
      this.spinner.show('global');
      this.survey = await this.surveyService.getSurvey(id);
      this.surveyStorageService.setQuestions(this.survey.questions);
      this.timer$ = this.surveyStorageService.startTimer(this.survey.id, this.survey.time_limit);
      this.router.navigateByUrl(`/surveys/${id}/questions/${this.survey.questions[0].id}`)
    } catch (error: any) {
      this.snackBar.open(error.message || 'Something went wrong. Please try again.', 'Close', { duration: 3000 })
    } finally {
      this.spinner.hide('global');
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
