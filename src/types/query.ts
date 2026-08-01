export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface SortParams {
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface SearchParams {
  search?: string;
}

export type FilterValue = string | number | boolean | null | undefined;
export type FilterMap = Record<string, FilterValue | FilterValue[]>;

export interface ListQueryParams extends PaginationParams, SortParams, SearchParams {
  filters?: FilterMap;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}
