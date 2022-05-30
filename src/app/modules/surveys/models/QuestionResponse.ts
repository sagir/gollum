import { Question } from "./Question";

export interface QuestionResponse {
  question: Question,
  nextQuestionId?: number,
  previousQuestionId?: number;
}
