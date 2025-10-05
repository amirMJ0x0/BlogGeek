import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";

export function OTPForm({ ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>کد تایید را وارد کنید</CardTitle>
        <CardDescription>ما یک کد ۶ رقمی برات فرستادیم مشتی</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="otp">کد تایید</FieldLabel>
              <InputOTP maxLength={6} id="otp" required>
                <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                  <InputOTPSlot index={5} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={0} />
                </InputOTPGroup>
              </InputOTP>
              <FieldDescription>تست</FieldDescription>
            </Field>
            <FieldGroup>
              <Button type="submit">تایید</Button>
              <FieldDescription className="text-center">
                کدی دریافت نکردید؟ <Link href="#">ارسال دوباره</Link>
              </FieldDescription>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
