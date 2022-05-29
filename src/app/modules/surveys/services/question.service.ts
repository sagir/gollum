import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { QuestionDto } from '../models/QuestionDto';
import { Question } from '../models/Question';
import { QuestionResolver } from '../resolvers/question.resolver';

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

  getQuestion(surveyId: number | string, questionId: number | string): Promise<QuestionResolver> {
    return lastValueFrom(
      this.http.get<QuestionResolver>(`v1/surveys/${surveyId}/questions/${questionId}`)
    );
  }
}
