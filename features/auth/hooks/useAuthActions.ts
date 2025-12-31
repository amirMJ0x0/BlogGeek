"use client";

import { useCustomToast } from "@/features/nav/hooks/useCustomToast";
import { fetchUserInfo } from "@/features/user";
import { useAuthStore } from "@/features/user/store/useAuthStore";
import { useUserStore } from "@/features/user/store/useUserStore";
import { useRouter } from "next/navigation";
import { setSession } from "../api/session.api";
import {
  LoginWithPassForm,
  OtpSchema,
  SendOtpForm,
} from "../schemas/auth.schemas";
import { useCheckOtp } from "./useCheckOtp";
import { useLoginWithPass } from "./useLoginWithPass";
import { useSendOtp } from "./useSendOtp";

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

      await setSession(res.data!);
      await new Promise((r) => setTimeout(r, 0));

      const user = await fetchUserInfo();
      setUser(user);
      clearCredential();
      showToast(res.message, "success");
      await router.push("/");
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
