import { User } from "../../auth/models/User"
import { Survey } from "./Survey"

export interface SurveyListItem extends Survey {
  meta: { questions_count: number }
  user: User
}
