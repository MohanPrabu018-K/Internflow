import type { ListQueryParams } from "./query";

export type RestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RestEndpoint<TParams = void, TResponse = unknown, TBody = unknown> {
  method: RestMethod;
  path: string;
  buildPath?: (params: TParams) => string;
  description?: string;
  query?: ListQueryParams;
  response?: TResponse;
  body?: TBody;
}

export interface AuthEndpoints {
  login: RestEndpoint<void, unknown, { email: string; password: string }>;
  logout: RestEndpoint;
  me: RestEndpoint;
  refresh: RestEndpoint;
}
