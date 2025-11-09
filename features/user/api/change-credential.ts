import {
  CheckOtpRequest,
  SendOtpResponseData,
  User,
} from "@/features/auth/types";
import api from "@/lib/api";
import { ApiResponse } from "@/types";

/**
 * @desc POST Send change credential otp
 * @route POST https://bloggeek.ir/api/v1/user/update/{credentialType}/send-otp
 */
const makeCredentialApi = (credentialType: "email" | "phone") => ({
  sendOtp: async (data: {
    credential: string;
  }): Promise<ApiResponse<SendOtpResponseData>> => {
    const { data: response } = await api.post(
      `v1/user/update/${credentialType}/send-otp`,
      data
    );
    return response;
  },

  /**
   * @desc POST Check change credential otp
   * @route POST https://bloggeek.ir/api/v1/user/update/{credentialType}/check-otp
   */
  checkOtp: async (data: CheckOtpRequest): Promise<ApiResponse<null>> => {
    const { data: response } = await api.post(
      `v1/user/update/${credentialType}/check-otp`,
      data
    );
    return response;
  },
});

export const emailCredentialApi = makeCredentialApi("email");
export const phoneCredentialApi = makeCredentialApi("phone");
