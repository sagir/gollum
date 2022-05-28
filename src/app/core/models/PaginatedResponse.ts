export interface PaginatedResponse<T> {
  data: Array<T>;
  meta: {
    current_page: number;
    first_page: number;
    first_page_url: string;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    previous_page_url: string | null;
    per_page: number;
    total: number;
  };
}
