import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { filter, Observable, of, Subject, takeUntil } from 'rxjs';
import { QuestionService } from 'src/app/modules/surveys/services/question.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Question } from '../models/Question';
import { SurveyStorageService } from '../services/survey-storage.service';
import { SurveyResultStore } from '../models/SurveyResultStore';
import { SurveyDetails } from './../models/SurveyDetails';

@Injectable({
  providedIn: 'root'
})
export class QuestionResolver implements Resolve<QuestionResolver | undefined> {
  private readonly ngUnsubscribe$ = new Subject<void>();
  private surveyResult?: SurveyResultStore;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private questionService: QuestionService,
    private surveyStorageService: SurveyStorageService
  ) {
    this.surveyStorageService.answersObservable$
      .pipe(takeUntil(this.ngUnsubscribe$), filter(Boolean))
      .subscribe(surveyResult => this.surveyResult = surveyResult);
  }

  async resolve(route: ActivatedRouteSnapshot): Promise<QuestionResolver | undefined> {
    try {
      this.spinner.show('global');
      const question = await this.questionService.getQuestion(route.parent?.params['id'], route.params['id'])
      const survey = route.parent?.data['survey'] as SurveyDetails;
      const index = survey.questions.findIndex(({ id }) => id == route.params['id']);

      if (index === 0) {
        return question;
      }

      if (index > 0) {
        const prevAnswer = this.surveyResult?.questions[index - 1];

        if (prevAnswer && (prevAnswer.option?.length || prevAnswer.answer)) {
          return question;
        }
      }

      this.router.navigateByUrl(`surveys/${route.parent?.params['id']}`)
      return;
    } catch (error: any) {
      this.snackBar.open(error.message || 'Something went wrong.', 'Close', { duration: 3000 });
      return undefined
    } finally {
      this.spinner.hide('global');
      this.ngUnsubscribe$.next();
      this.ngUnsubscribe$.complete();
    }
  }
}
