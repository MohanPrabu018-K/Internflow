import type { ListQueryParams } from "@/types/query";

export type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiRequestConfig<TBody = unknown> {
  method?: ApiMethod;
  body?: TBody;
  headers?: Record<string, string>;
  query?: Record<string, unknown> | ListQueryParams;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiAuthContext {
  accessToken?: string;
  role?: string;
}

export async function apiClient<TResponse, TBody = unknown>(
  _path: string,
  _config: ApiRequestConfig<TBody> = {},
): Promise<ApiResponse<TResponse>> {
  throw new Error("API client is a placeholder. Connect your backend service here.");
}
