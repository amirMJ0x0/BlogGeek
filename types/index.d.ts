export type ApiResponse<T = unknown> = {
  data: T | null;
  message: string;
  statusCode: number;
};
