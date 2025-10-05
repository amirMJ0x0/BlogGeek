export type SendOtpRequest = {
  credential: string; //email or password
};

export type ApiResponse<T = unknown> = {
  data: T;
  message: string;
  statusCode: number;
};

export type CheckOtpRequest = {
  credential: string;
  code: number;
};
