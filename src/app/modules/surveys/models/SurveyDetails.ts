import { Survey } from "./Survey";
import { Question } from './Question';

export interface SurveyDetails extends Survey {
  questions: Question[]
}
