import { User } from "../../auth/models/User"
import { SurveyStatuses } from "../enums/SurveyStatuses"
import { Survey } from "./Survey"

export interface SurveyListItem extends Survey {
  meta: { questions_count: number };
  status: SurveyStatuses;
  user: User;
}
