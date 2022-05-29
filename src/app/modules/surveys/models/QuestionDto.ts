import { QuesitonTypes } from "../enums/QuestionTypes";

export interface QuestionDto {
  text: string;
  answerType: QuesitonTypes;
  options: string[];
}
