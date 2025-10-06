export type ApiResponse<T = unknown> = {
  data: T | null;
  message: string;
  statusCode: number;
};

export type SendOtpRequest = {
  credential: string; //email or password
};

export type SendOtpResponseData = {
  expiredAt: string;
};

export type CheckOtpRequest = {
  credential: string;
  code: number;
};
