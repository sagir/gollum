export interface Option {
  id: number;
  text: string;
  question_id: number;
  created_at: number;
  updated_at: number;
  chosen_by?: number;
}
