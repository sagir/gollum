import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { QuestionService } from 'src/app/modules/surveys/services/question.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Question } from '../models/Question';

@Injectable({
  providedIn: 'root'
})
export class QuestionResolver implements Resolve<QuestionResolver | undefined> {
  constructor(
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private questionService: QuestionService
  ) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<QuestionResolver | undefined> {
    try {
      this.spinner.show('global');
      const question = await this.questionService.getQuestion(route.parent?.params['id'], route.params['id'])
      return question;
    } catch (error: any) {
      this.snackBar.open(error.message || 'Something went wrong.', 'Close', { duration: 3000 });
      return undefined
    } finally {
      this.spinner.hide('global');
    }
  }
}
