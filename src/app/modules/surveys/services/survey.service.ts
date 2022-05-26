import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CreateSurveyRequest } from '../models/CreateSurveyRequest';
import { lastValueFrom } from 'rxjs';
import { Survey } from '../models/Survey';
import { SurveyListRequest } from '../models/SurveyListRequest';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  constructor(private http: HttpClient) { }

  getSurveys(data: SurveyListRequest): Promise<any> {
    return lastValueFrom(this.http.get('v1/surveys', { params: data }));
  }

  createSurvey(data: CreateSurveyRequest): Promise<any> {
    return lastValueFrom(this.http.post<Survey>('v1/surveys', data))
  }
}
