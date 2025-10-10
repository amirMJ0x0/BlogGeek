export type ApiResponse<T = unknown> = {
  data: T | null;
  message: string;
  statusCode: number;
};

export type SendOtpRequest = {
  credential: string; //email or password
};

export type LoginWithPassRequest = SendOtpRequest & {
  password?: string;
};

export type SendOtpResponseData = {
  expiredAt: string;
};

export type CheckOtpRequest = {
  credential: string;
  code: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
};
