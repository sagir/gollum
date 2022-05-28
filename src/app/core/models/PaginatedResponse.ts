import { PaginatorData } from "./PaginatorData";

export interface PaginatedResponse<T> {
  data: Array<T>;
  meta: PaginatorData;
}
