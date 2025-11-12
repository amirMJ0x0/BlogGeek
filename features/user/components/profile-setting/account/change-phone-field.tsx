"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import useCountdown from "@/features/auth/hooks/useCountdown";
import { SendOtpForm } from "@/features/auth/schemas/credentialSchema";
import { otpSchema, OtpSchema } from "@/features/auth/schemas/otpSchema";
import { useCustomToast } from "@/features/nav/hooks/useCustomToast";
import { phoneCredentialApi } from "@/features/user/api/change-credential";
import { useUserStore } from "@/features/user/store/useUserStore";
import { cn, num2en, phoneNumberRegex } from "@/lib/utils";
import { ApiResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Check, Mail, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const ChangePhoneField = () => {
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const [showButtons, setShowButtons] = useState(false);
  const [phone, setPhone] = useState(user?.phone_number || "");
  //   const [isChecking, setIsChecking] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const { showToast } = useCustomToast();
  const [otpExpireTime, setOtpExpireTime] = useState<string | null>("");
  const { minutes, seconds } = useCountdown(otpExpireTime);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setPhone(user?.phone_number ?? "");
  }, [user]);

  // normalize Persian digits, strip unwanted chars and normalize country code to 09xxxxxxxxx
  const phoneSchema = z.preprocess((val) => {
    if (typeof val !== "string") return val;
    let s = num2en(val).replace(/[^\d+]/g, "");
    if (s.startsWith("+98")) s = "0" + s.slice(3);
    else if (s.startsWith("98")) s = "0" + s.slice(2);
    else if (s.length === 10 && s.startsWith("9")) s = "0" + s;
    return s;
  }, z.string().regex(phoneNumberRegex, "شماره تلفن معتبر نیست"));

  // otp form input
  const { handleSubmit, control, reset } = useForm<OtpSchema>({
    resolver: zodResolver(otpSchema),
    defaultValues: { code: "" },
  });

  // send mutation
  const { mutate: sendPhoneOtp, isPending: isSendingOtp } = useMutation({
    mutationFn: (data: { credential: string }) =>
      phoneCredentialApi.sendOtp(data),
    onSuccess: (res) => {
      setOtpExpireTime(res.data?.expiredAt as string);
      showToast(res.message, "success");
      setOpenDialog(true);
    },
    onError: (error: AxiosError<ApiResponse>) => {
      const message =
        error.response?.data?.message || "مشکلی پیش اومد، دوباره تلاش کنید";
      showToast(message, "error");
    },
  });

  // check mutation
  const {
    mutate: checkPhoneOtp,
    isPending: isCheckingOtp,
    isError,
  } = useMutation({
    mutationFn: (data: { credential: string; code: number }) =>
      phoneCredentialApi.checkOtp(data),
    onSuccess: (res) => {
      showToast(res.message, "success");
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
      setShowButtons(false);
      setOpenDialog(false);
      reset();
    },
    onError: (error: AxiosError<ApiResponse>) => {
      const message =
        error.response?.data?.message || "مشکلی پیش اومد، دوباره تلاش کنید";
      showToast(message, "error");
    },
  });

  const handleConfirm = () => {
    const parsed = phoneSchema.safeParse(phone);
    if (!parsed.success) {
      const msg = parsed.error.issues?.[0]?.message || "شماره تلفن معتبر نیست";
      showToast(msg, "error");
      return;
    }

    sendPhoneOtp({ credential: parsed.data });
  };

  const handleCancel = () => {
    setPhone(user?.phone_number || "");
    setShowButtons(false);
    inputRef.current?.blur();
  };

  const onOtpSubmit = (data: OtpSchema) => {
    checkPhoneOtp({
      credential: phone,
      code: Number(data.code),
    });
  };

  const onResend = (values: SendOtpForm) => {
    reset();
    sendPhoneOtp(values);
  };

  return (
    <div className="flex flex-col gap-2 w-full max-w-sm mx-auto py-6 relative">
      <Label htmlFor="phone_number" className="flex justify-end">
        تغییر شماره تلفن
      </Label>
      <div className="flex gap-2 items-center">
        <InputGroup>
          <InputGroupInput
            value={phone}
            id="phone_number"
            autoComplete="off"
            ref={inputRef}
            onFocus={() => setShowButtons(true)}
            onChange={(e) => setPhone(e.target.value)}
            disabled={isSendingOtp}
          />
          <InputGroupAddon>
            <Mail />
          </InputGroupAddon>
          <InputGroupAddon align={"inline-end"}>
            {isSendingOtp && <Spinner />}
          </InputGroupAddon>
        </InputGroup>

        {showButtons && (
          <>
            <Button variant="destructive" size="icon" onClick={handleCancel}>
              <X size={16} />
            </Button>
            <Button size="icon" disabled={isSendingOtp} onClick={handleConfirm}>
              <Check size={16} />
            </Button>
          </>
        )}
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent showCloseButton={false} className="!max-w-[315px]">
          <DialogClose
            className="absolute left-3 top-3"
            onClick={() => setShowButtons(false)}
          >
            <X size={"20px"} />
          </DialogClose>
          <DialogHeader className="!text-right">
            <DialogTitle>تایید شماره</DialogTitle>
            <DialogDescription className="text-sm dark:text-muted text-black/50">
              کد ارسال شده به {phone} را وارد کنید
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onOtpSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="otp">کد تایید</FieldLabel>

                <Controller
                  control={control}
                  name="code"
                  render={({ field }) => (
                    <InputOTP
                      id="otp"
                      maxLength={6}
                      value={field.value}
                      onChange={field.onChange}
                    >
                      <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                        <InputOTPSlot index={5} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={0} />
                      </InputOTPGroup>
                    </InputOTP>
                  )}
                />
              </Field>

              <FieldGroup>
                <Button
                  type="submit"
                  disabled={isCheckingOtp}
                  className={cn("w-full", isError && "animate-shake")}
                >
                  {isCheckingOtp ? (
                    <>
                      {" "}
                      <Spinner scale={"0.8"} /> درحال ذخیره..{" "}
                    </>
                  ) : (
                    "ذخیره"
                  )}
                </Button>
                <FieldDescription className="text-center flex flex-col ">
                  <span>
                    {" "}
                    کدی دریافت نکردید؟
                    <Button
                      variant={"link"}
                      disabled={
                        (minutes && seconds) > 0 || isSendingOtp ? true : false
                      }
                      className="p-1"
                      onClick={() =>
                        onResend({
                          credential: phone,
                        })
                      }
                    >
                      ارسال دوباره
                    </Button>
                  </span>
                  <span dir="ltr">
                    {minutes} : {seconds.toString().padStart(2, "0")}
                  </span>
                </FieldDescription>
              </FieldGroup>
            </FieldGroup>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChangePhoneField;
