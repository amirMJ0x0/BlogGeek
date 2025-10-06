"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import loginBanner from "@/public/login-banner.jpeg";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  credentialSchema,
  CredentialSchema,
} from "../schemas/credentialSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSendOtp } from "../hooks/useSendOtp";
import { Spinner } from "@/components/ui/spinner";
import { Bounce, toast } from "react-toastify";
import { AxiosError } from "axios";
import { ApiResponse } from "../types";

export function CredentialForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const { setCredential, setOtpExpireTime } = useAuthStore();
  const { mutate, isPending } = useSendOtp();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CredentialSchema>({
    resolver: zodResolver(credentialSchema),
    defaultValues: { credential: "" },
  });

  const onSubmit = (values: CredentialSchema) => {
    mutate(values, {
      onSuccess: (res) => {
        setCredential(values.credential);
        setOtpExpireTime(res.data?.expiredAt as string);

        toast.success(res?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          rtl: true,
        });

        router.push("/verify");
      },
      onError: (error: AxiosError<ApiResponse>) => {
        const message =
          error.response?.data?.message || "مشکلی پیش اومد، دوباره تلاش کنید";

        toast.error(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          rtl: true,
        });
      },
    });
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            className="px-6 !pt-20 !pb-24"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-5">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">خوش آمدید</h1>
                <p className="text-muted-foreground text-balance">
                  ورود | ثبت نام
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="credential">ایمیل یا شماره</Label>
                <Input
                  id="credential"
                  placeholder="example@mail.com یا 0912..."
                  required
                  {...register("credential")}
                />
                {errors.credential && (
                  <p className="text-sm text-destructive !-mt-1">
                    {errors.credential.message as string}
                  </p>
                )}
              </div>
              <div className="-mt-2">
                <Button type="submit" className="w-full" disabled={isPending}>
                  ادامه {isPending && <Spinner />}
                </Button>
              </div>
              <Link
                href={"#"}
                className="text-sm text-slate-700 text-center !underline"
              >
                ورود با رمز عبور
              </Link>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <Image
              src={loginBanner}
              alt="Image"
              placeholder="blur"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        ورود شما به معنای پذیرش <Link href="#">شرایط بلاگیک</Link> و{" "}
        <Link href="#">قوانین حریم خصوصی</Link> است.
      </div>
    </div>
  );
}
