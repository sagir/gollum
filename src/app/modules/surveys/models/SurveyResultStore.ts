export interface SurveyResultStore {
  id: number;
  questions: QuestionResultStore[];
}

export interface QuestionResultStore {
  id: number;
  options?: number[];
  answer?: string;
}
