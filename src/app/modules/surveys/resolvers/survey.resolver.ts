import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { SurveyService } from 'src/app/modules/surveys/services/survey.service';
import { SurveyDetails } from 'src/app/modules/surveys/models/SurveyDetails';
import { SurveyStorageService } from './../services/survey-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SurveyResolver implements Resolve<SurveyDetails | undefined> {
  constructor(
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private surveyService: SurveyService,
    private surveStorageService: SurveyStorageService
  ) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<SurveyDetails | undefined> {
    try {
      this.spinner.show('global');
      const survey = await this.surveyService.getSurvey(Number(route.params['id']));
      return survey;
    } catch (error: any) {
      this.snackBar.open(error.message || 'Could not load survey.', 'Close', { duration: 3000 });
      return undefined;
    } finally {
      this.spinner.hide('global');
    }
  }
}
