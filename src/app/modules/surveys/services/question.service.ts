import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { QuestionDto } from '../models/QuestionDto';
import { Question } from '../models/Question';
import { QuestionResponse } from './../models/QuestionResponse';

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

  updateQuestion(surveyId: number, quesitonId: number, data: QuestionDto): Promise<Question> {
    return lastValueFrom(
      this.http.put<Question>(`v1/surveys/${surveyId}/questions/${quesitonId}`, data)
    );
  }

  getQuestion(surveyId: number | string, questionId: number | string): Promise<QuestionResponse> {
    return lastValueFrom(
      this.http.get<QuestionResponse>(`v1/surveys/${surveyId}/questions/${questionId}`)
    );
  }
}
