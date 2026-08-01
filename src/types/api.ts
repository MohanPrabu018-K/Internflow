export interface ApiListResponse<T> {
  items: T[];
  total: number;
}

export interface ApiStatusResponse {
  success: boolean;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

export type { PaginatedResponse, ListQueryParams } from "./query";
