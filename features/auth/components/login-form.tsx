"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import loginBanner from "@/public/login-banner.jpeg";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import useLoginForm from "../hooks/useLoginForm";
import { useRouter } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const authStore = useAuthStore();
  const { register, handleSubmit, errors, mode, identifierType } =
    useLoginForm();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="px-6 !pt-20 !pb-24" onSubmit={() => {}}>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">خوش آمدید</h1>
                <p className="text-muted-foreground text-balance">
                  ورود یا ثبت‌نام
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="identifier">ایمیل یا شماره</Label>
                <Input
                  id="identifier"
                  placeholder="example@mail.com یا 0912..."
                  required
                  {...register("identifier")}
                />
                {errors.identifier && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.identifier.message as string}
                  </p>
                )}
              </div>
              {mode === "password" && (
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password" className="flex-1">
                      رمز عبور
                    </Label>
                    <Link
                      href="#"
                      className="ml-auto text-sm underline-offset-2 hover:underline"
                    >
                      رمز عبور خود را فراموش کرده اید؟
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.password.message as string}
                    </p>
                  )}
                </div>
              )}
              <div className="-mt-2">
                <Button type="submit" className="w-full">
                  {mode === "identifier" ? "ادامه" : "ورود"}
                </Button>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <Image
              src={loginBanner}
              alt="Image"
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
