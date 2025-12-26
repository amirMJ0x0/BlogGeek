"use client";

import { useRouter } from "next/navigation";
import { useSendOtp } from "./useSendOtp";
import { useCheckOtp } from "./useCheckOtp";
import { useLoginWithPass } from "./useLoginWithPass";
import { fetchUserInfo } from "@/features/user/api/fetch-userinfo";
import { useUserStore } from "@/features/user/store/useUserStore";
import { useAuthStore } from "@/features/user/store/useAuthStore";
import { useCustomToast } from "@/features/nav/hooks/useCustomToast";
import {
  LoginWithPassForm,
  OtpSchema,
  SendOtpForm,
} from "../schemas/auth.schemas";
import { AxiosError } from "axios";

function getApiMessage(err: unknown, fallback = "مشکلی پیش اومد") {
  return (
    (err as any)?.response?.data?.message ?? (err as any)?.message ?? fallback
  );
}

export const useAuthActions = () => {
  const router = useRouter();
  const { showToast } = useCustomToast();
  const { setUser, clearUser } = useUserStore();
  const { setCredential, setOtpExpireTime, clearCredential } = useAuthStore();

  const { mutateAsync: sendMut, isPending: isSendingOtp } = useSendOtp();
  const { mutateAsync: loginMut, isPending: isLoggingIn } = useLoginWithPass();
  const {
    mutateAsync: checkMut,
    isPending: isCheckingOtp,
    isError: hasCheckError,
  } = useCheckOtp();

  /* helpers */
  const setSession = async (tokens?: {
    accessToken?: string;
    refreshToken?: string;
  }) => {
    if (!tokens) return;
    await fetch("/api/auth/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tokens),
    });
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    clearUser();
    clearCredential();
    router.push("/login");
  };

  /* actions */
  const sendOtp = async (values: SendOtpForm) => {
    try {
      const res = await sendMut(values);
      console.log(res);
      setCredential(values.credential);
      setOtpExpireTime(res.data!.expiredAt);
      showToast(res.message, "success");
      router.push("/verify");
    } catch (error) {
      showToast(getApiMessage(error, "ارسال کد ناموفق بود"), "error");
    }
  };

  const loginWithPassword = async (values: LoginWithPassForm) => {
    try {
      const res = await loginMut(values);
      console.log(res);
      if (!res?.data) throw new Error("Invalid server response");
      await setSession(res.data);
      const user = await fetchUserInfo();
      setUser(user);
      clearCredential();
      showToast(res.message, "success");
      router.push("/");
    } catch (error) {
      showToast(getApiMessage(error), "error");
    }
  };

  const verifyOtp = async (data: OtpSchema) => {
    try {
      const { credential } = useAuthStore.getState();
      if (!credential) {
        router.push("/login");
        return;
      }

      const res = await checkMut({
        credential,
        code: Number(data.code),
      });
      console.log(res);

      await setSession(res.data!);
      const user = await fetchUserInfo();
      setUser(user);
      clearCredential();
      showToast(res.message, "success");
      router.push("/");
    } catch (error) {
      showToast(getApiMessage(error), "error");
    }
  };

  return {
    sendOtp,
    loginWithPassword,
    verifyOtp,
    logout,
    isSendingOtp,
    isLoggingIn,
    isCheckingOtp,
    isCheckError: hasCheckError,
  };
};
