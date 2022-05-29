import { SurveyStatuses } from "../enums/SurveyStatuses";

export interface Survey {
  id: number;
  title: string;
  description?: string;
  time_limit: string;
  publish_at: string;
  created_at: string;
  updated_at: string;
  status: SurveyStatuses;
}
