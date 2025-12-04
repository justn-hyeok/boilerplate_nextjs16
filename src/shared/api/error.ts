export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
    public details?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }

  static isApiError(error: unknown): error is ApiError {
    return error instanceof ApiError;
  }

  static fromResponse(status: number, body?: ApiErrorResponse): ApiError {
    const message = body?.message ?? getDefaultMessage(status);
    return new ApiError(message, status, body?.code, body?.details);
  }
}

interface ApiErrorResponse {
  message?: string;
  code?: string;
  details?: unknown;
}

function getDefaultMessage(status: number): string {
  const messages: Record<number, string> = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    409: "Conflict",
    422: "Validation Error",
    429: "Too Many Requests",
    500: "Internal Server Error",
    502: "Bad Gateway",
    503: "Service Unavailable",
  };
  return messages[status] ?? `HTTP Error ${status}`;
}

export function isNetworkError(error: unknown): boolean {
  return error instanceof TypeError && error.message === "Failed to fetch";
}

export function getErrorMessage(error: unknown): string {
  if (ApiError.isApiError(error)) {
    return error.message;
  }
  if (isNetworkError(error)) {
    return "Network error. Please check your connection.";
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred";
}
