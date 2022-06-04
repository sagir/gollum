import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CreateSurveyRequest } from '../models/CreateSurveyRequest';
import { lastValueFrom, map } from 'rxjs';
import { SurveyListRequest } from '../models/SurveyListRequest';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Survey } from './../models/Survey';
import { SurveyDetails } from 'src/app/modules/surveys/models/SurveyDetails';
import { PaginatedResponse } from './../../../core/models/PaginatedResponse';
import { SurveyListItem } from '../models/SurveyListItem';
import { SurveyResultStore } from '../models/SurveyResultStore';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SurveyStorageService } from './survey-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private surveyStorageService: SurveyStorageService
  ) { }

  getSurveys(data: SurveyListRequest): Promise<PaginatedResponse<SurveyListItem>> {
    return lastValueFrom(
      this.http.get<PaginatedResponse<SurveyListItem>>('v1/surveys', { params: (data as unknown) as HttpParams })
    );
  }

  createSurvey(data: CreateSurveyRequest): Promise<any> {
    return lastValueFrom(this.http.post<Survey>('v1/surveys', data))
  }

  getSurvey(id: string | number): Promise<SurveyDetails> {
    return lastValueFrom(
      this.http
        .get<SurveyDetails>(`v1/surveys/${id}`)
        .pipe(map(survey => {
          survey.questions.forEach(question => question.answer_type = Number(question.answer_type));
          return survey;
        }))
    );
  }

  publishSurvey(id: string | number): Promise<void> {
    return lastValueFrom(
      this.http.patch<void>(`v1/surveys/${id}/publish`, {})
    );
  }

  createSurveyForm(survey?: Survey): FormGroup {
    return this.fb.group({
      title: [
        survey?.title || null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ],
      ],
      description: [
        survey?.description || null,
        [Validators.minLength(10), Validators.maxLength(2000)],
      ],
      timeLimit: [
        survey?.time_limit || null,
        [Validators.required, Validators.min(1), Validators.max(120)],
      ],
    });
  }

  updateSurvey(id: number, data: CreateSurveyRequest): Promise<any> {
    return lastValueFrom(
      this.http.put(`v1/surveys/${id}`, data)
    );
  }

  async takeSurvey(data: SurveyResultStore): Promise<void> {
    try {
      this.spinner.show('global');
      await lastValueFrom(
        this.http.post<void>(`v1/surveys/${data.id}/take-survey`, { answers: data.questions })
      );
      this.snackBar.open('Survey created successfully.', 'Close', { duration: 3000 });
      this.surveyStorageService.clearPendingSurvey();
      this.router.navigateByUrl('/surveys');
    } catch (error: any) {
      this.snackBar.open(error.message || 'Something went wrong.', 'Close', { duration: 3000 });
    } finally {
      this.spinner.hide('global');
    }
  }

  getSurveyReport(id: number | string): Promise<SurveyDetails> {
    return lastValueFrom(
      this.http.get<SurveyDetails>(`v1/surveys/${id}/report`)
    );
  }
}
