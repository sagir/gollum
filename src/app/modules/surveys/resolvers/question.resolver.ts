import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import { filter } from 'rxjs';
import { QuestionService } from 'src/app/modules/surveys/services/question.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SurveyStorageService } from '../services/survey-storage.service';
import { SurveyResultStore } from '../models/SurveyResultStore';
import { SurveyDetails } from './../models/SurveyDetails';
import { Question } from '../models/Question';
import { QuestionResponse } from './../models/QuestionResponse';

@Injectable({
  providedIn: 'root'
})
export class QuestionResolver implements Resolve<QuestionResponse | undefined> {
  private surveyResult?: SurveyResultStore;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private questionService: QuestionService,
    private surveyStorageService: SurveyStorageService
  ) {
    this.surveyStorageService.answersObservable$
      .pipe(filter(Boolean))
      .subscribe(surveyResult => this.surveyResult = surveyResult);
  }

  resolve(route: ActivatedRouteSnapshot): QuestionResponse | undefined {
    try {
      // this.spinner.show('global');
      // const question = await this.questionService.getQuestion(route.parent?.params['id'], route.params['id'])
      const survey = route.parent?.data['survey'] as SurveyDetails;
      const question = survey.questions.find(item => item.id == route.params['id']) as Question;
      const index = survey.questions.findIndex(({ id }) => id == route.params['id']);

      const response: QuestionResponse = { question };

      if (index === 0) {
        response.nextQuestionId = survey.questions[index + 1].id;
        response.previousQuestionId = undefined;
        return response;
      }

      if (index > 0) {
        const prevAnswer = this.surveyResult?.questions[index - 1];

        if (prevAnswer && (prevAnswer.option?.length || prevAnswer.answer)) {
          response.nextQuestionId = survey.questions[index + 1]?.id;
          response.previousQuestionId = survey.questions[index - 1]?.id;
          return response;
        }
      }

      throw new Error('Not permitted');
    } catch (error: any) {
      this.snackBar.open(error.message || 'Something went wrong.', 'Close', { duration: 3000 });
      this.router.navigateByUrl(`surveys/${route.parent?.params['id']}`)
      return undefined
    } // finally {
      // this.spinner.hide('global');
    // }
  }
}
