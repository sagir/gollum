import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CreateSurveyRequest } from '../models/CreateSurveyRequest';
import { lastValueFrom } from 'rxjs';
import { SurveyListRequest } from '../models/SurveyListRequest';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Survey } from './../models/Survey';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  constructor(
    private http: HttpClient,
    private fb: FormBuilder
  ) { }

  getSurveys(data: SurveyListRequest): Promise<any> {
    return lastValueFrom(this.http.get('v1/surveys', { params: (data as unknown) as HttpParams }));
  }

  createSurvey(data: CreateSurveyRequest): Promise<any> {
    return lastValueFrom(this.http.post<Survey>('v1/surveys', data))
  }

  getSurvey(id: string | number): Promise<any> {
    return lastValueFrom(this.http.get(`v1/surveys/${id}`));
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
}
