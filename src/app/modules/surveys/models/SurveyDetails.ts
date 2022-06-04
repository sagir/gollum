import { Survey } from "./Survey";
import { Question } from './Question';
import { User } from "../../auth/models/User";

export interface SurveyDetails extends Survey {
  questions: Question[];
  user?: User;
}
