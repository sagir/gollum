import { Question } from "./Question";

export interface QuestionResponse {
  quesiton: Question,
  nextQuestionId?: number,
  previousQuestionId?: number;
}
