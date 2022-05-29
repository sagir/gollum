import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { QuestionDto } from '../models/QuestionDto';
import { Question } from '../models/Question';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  createQuestion(surveyId: number, data: QuestionDto): Promise<Question> {
    return lastValueFrom(
      this.http.post<Question>(`v1/surveys/${surveyId}/questions`, data)
    );
  }
}
