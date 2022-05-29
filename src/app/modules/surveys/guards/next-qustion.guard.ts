import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { SurveyStorageService } from './../services/survey-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Question } from '../models/Question';
import { QuestionResultStore } from '../models/SurveyResultStore';

@Injectable({
  providedIn: 'root'
})
export class NextQustionGuard implements CanActivate {
  questions: Question[] = [];
  answers: QuestionResultStore[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private surveyStorageService: SurveyStorageService
  ) {
    this.surveyStorageService.questionsObservable$.subscribe(questions => {
      this.questions = questions || [];
    });

    this.surveyStorageService.answersObservable$.subscribe(survey => {
      this.answers = survey?.questions || [];
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot
  ): boolean {
    const index = this.questions.findIndex(item => item.id === Number(route.params['id']));

    if (index === -1) {
      this.snackBar.open('Question not found.', 'Close', { duration: 3000 });
      return false;
    }

    if (index === 0) {
      return true;
    }

    const prev = this.answers[index - 1];
    if (prev.option?.length || prev.answer) {
      return true;
    }

    this.snackBar.open('Please provide the answer to proceed to the next question.', 'Close', { duration: 3000 });
    return false;
  }

}
