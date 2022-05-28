import { SurveySortOptions } from "../enums/SurveySortOptions";
import { SurveyStatuses } from "../enums/SurveyStatuses";

export interface SurveyFilterData {
  search: string | null;
  sortBy: SurveySortOptions;
  status: SurveyStatuses | null;
}
