import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { QuestionDto } from '../models/QuestionDto';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  createQuestion(surveyId: number, data: QuestionDto): Promise<any> {
    return lastValueFrom(
      this.http.post(`v1/surveys/${surveyId}/questions`, data)
    );
  }
}
