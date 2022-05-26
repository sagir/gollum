import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateSurveyRequest } from '../models/CreateSurveyRequest';
import { lastValueFrom } from 'rxjs';
import { Survey } from '../models/Survey';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  constructor(private http: HttpClient) { }

  createSurvey(data: CreateSurveyRequest): Promise<any> {
    return lastValueFrom(this.http.post<Survey>('v1/surveys', data))
  }
}
