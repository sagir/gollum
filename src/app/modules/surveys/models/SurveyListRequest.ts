import { HttpParams } from "@angular/common/http";
import { SurveySortOptions } from "../enums/SurveySortOptions";
import { SurveyStatuses } from "../enums/SurveyStatuses";

export interface SurveyListRequest extends HttpParams {
  page: number;
  perPage: number;
  search: string;
  sortBy: SurveySortOptions;
  status: SurveyStatuses;
  user?: number;
}
