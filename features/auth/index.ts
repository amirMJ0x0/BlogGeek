// types
export type {
  CheckOtpReqBody,
  LoginWithPassReqBody,
  SendOtpReqBody,
  SendOtpResponseData,
  User,
} from "./types";

// api
export { checkOTP, loginWithPass, logout, sendOTP } from "./api/auth.api";

// schemas
export {
  type LoginWithPassForm,
  type OtpSchema,
  type SendOtpForm,
  LoginWithOtpSchema,
  loginWithPassSchema,
  otpSchema,
  sendOtpSchema,
} from "./schemas/auth.schemas";
