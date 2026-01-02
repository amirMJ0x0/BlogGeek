// types
export type {
  CheckOtpReqBody,
  LoginWithPassReqBody,
  SendOtpReqBody,
  SendOtpResponseData,
  User,
  LoginResponseData,
} from "./types";

// api
export { checkOTP, loginWithPass, sendOTP } from "./api/auth.api";
export { logout } from "./api/auth.server";

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
