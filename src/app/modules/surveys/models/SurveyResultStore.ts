export interface SurveyResultStore {
  id: number;
  questions: QuestionResultStore;
}

export interface QuestionResultStore {
  id: number;
  option?: number[];
  answer?: string;
}
