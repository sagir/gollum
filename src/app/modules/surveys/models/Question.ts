import { QuesitonTypes } from "../enums/QuestionTypes";
import { Answer } from "./Answer";
import { Option } from "./Option";

export interface Question {
  id: number;
  text: string;
  answer_type: QuesitonTypes;
  survey_id: number;
  created_at: string;
  updated_at: string;
  options: Option[];
  answers?: Answer[];
}
