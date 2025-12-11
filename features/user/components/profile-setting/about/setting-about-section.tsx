"use client";

import { useUserStore } from "../../../store/useUserStore";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import {
  ProfileInfoFormData,
  profileInfoSchema,
} from "../../../schemas/aboutSettingSchema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { format } from "date-fns";
import { useEditUserInfo } from "@/features/user/hooks/useEditUserInfo";
import { useCustomToast } from "@/features/nav/hooks/useCustomToast";
import { Spinner } from "@/components/ui/spinner";
import BirthdayInput from "./birthday-input";
import { useRouter } from "next/navigation";
import {
  Telegram,
  Github,
  Instagram,
  Linkedin,
  Twitter,
} from "@/components/icons";
import { EditUserInfoRequest } from "@/features/user/userTypes";

const SettingAboutSection = () => {
  const { user, setUser } = useUserStore();
  const { showToast } = useCustomToast();
  const { mutate: mutateUserInfo, isPending } = useEditUserInfo();
  const router = useRouter();
  const form = useForm<ProfileInfoFormData>({
    resolver: zodResolver(profileInfoSchema),
    values: {
      first_name: user?.first_name ?? "",
      last_name: user?.last_name ?? "",
      birthday: user?.birthday ?? "",
      bio: user?.bio ?? "",
      github: user?.social_media?.github ?? "",
      instagram: user?.social_media?.instagram ?? "",
      linkedin: user?.social_media?.linkedin ?? "",
      telegram: user?.social_media?.telegram ?? "",
      twitter: user?.social_media?.twitter ?? "",
    },
  });

  function onSubmit(data: ProfileInfoFormData) {
    const apiData: EditUserInfoRequest = {
      first_name: data.first_name || null,
      last_name: data.last_name || null,
      birthday: (data.birthday && format(data.birthday, "yyyy-MM-dd")) || null,
      bio: data.bio || null,
      social_media: {
        instagram: data.instagram || null,
        twitter: data.twitter || null,
        telegram: data.telegram || null,
        linkedin: data.linkedin || null,
        github: data.github || null,
      },
    };
    mutateUserInfo(apiData, {
      onSuccess: (response) => {
        showToast(response.message, "success");
        setUser(response.data);
        router.push(`/@${response.data?.username}/settings?tab=about-me`);
      },
    });
  }

  return (
    <div>
      <form
        className="p-4 grid md:grid-cols-[1fr_auto_1fr] gap-6 "
        id="profile-info-form"
        dir="rtl"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup>
          <h2 className="text-md font-bold">اطلاعات فردی</h2>
          {/* name */}
          <Controller
            name="first_name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="max-h-[80]">
                <FieldLabel
                  htmlFor="first_name"
                  className="py-2 font-semibold text-slate-600"
                >
                  نام:
                </FieldLabel>
                <Input
                  {...field}
                  id="first_name"
                  placeholder="Your First Name"
                  aria-invalid={fieldState.invalid}
                  className="min-h-9"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* last_name */}
          <Controller
            name="last_name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="max-h-[80px]">
                <FieldLabel
                  htmlFor="last_name"
                  className="py-2 font-semibold text-slate-600"
                >
                  نام خانوادگی:
                </FieldLabel>
                <Input
                  {...field}
                  id="last_name"
                  placeholder="Your Last Name"
                  className="min-h-9"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* birthday */}
          <BirthdayInput control={form.control} name="birthday" />
          {/* Bio  */}
          <Controller
            name="bio"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="bio"
                  className="py-2 font-semibold text-slate-600"
                >
                  بیوگرافی
                </FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    {...field}
                    id="bio"
                    placeholder="Tell us about yourself"
                    aria-invalid={fieldState.invalid}
                    rows={3}
                    className="min-h-27 max-h-27 resize-none"
                  />
                  <InputGroupAddon align="block-end">
                    <InputGroupText
                      className={`${
                        field.value?.length! > 400 ? "text-red-600" : ""
                      } tabular-nums`}
                    >
                      {field.value?.length}/400
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <Separator orientation="vertical" />
        <FieldGroup>
          <h2 className="text-md font-bold">شبکه های اجتماعی</h2>
          {/* telegram */}
          <Controller
            name="telegram"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="max-h-[80px]">
                <FieldLabel
                  htmlFor="telegram"
                  className="py-2 font-semibold text-slate-600"
                >
                  تلگرام:
                </FieldLabel>
                <InputGroup dir="ltr" className="p-0 m-0">
                  <InputGroupInput
                    {...field}
                    id="telegram"
                    placeholder="Link to telegram profile"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  <InputGroupAddon>
                    <InputGroupButton variant="secondary" size="icon-xs">
                      <Telegram />
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Instagram  */}
          <Controller
            name="instagram"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="max-h-[80px]">
                <FieldLabel
                  htmlFor="instagram"
                  className="py-2 font-semibold text-slate-600"
                >
                  اینستاگرام:
                </FieldLabel>
                <InputGroup dir="ltr">
                  <InputGroupInput
                    {...field}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    id="instagram"
                    placeholder="Link to instagram profile"
                  />
                  <InputGroupAddon>
                    <InputGroupButton variant="secondary" size="icon-xs">
                      <Instagram />
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* X  */}
          <Controller
            name="twitter"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="max-h-[80px]">
                <FieldLabel
                  htmlFor="twitter"
                  className="py-2 font-semibold text-slate-600"
                >
                  توییتر (ایکس):
                </FieldLabel>
                <InputGroup dir="ltr">
                  <InputGroupInput
                    {...field}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    id="twitter"
                    placeholder="Link to twitter profile"
                  />
                  <InputGroupAddon>
                    <InputGroupButton variant="secondary" size="icon-xs">
                      <Twitter />
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Linkedin  */}
          <Controller
            name="linkedin"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="max-h-[80px]">
                <FieldLabel
                  htmlFor="linkedin"
                  className="py-2 font-semibold text-slate-600"
                >
                  لینکدین:
                </FieldLabel>
                <InputGroup dir="ltr">
                  <InputGroupInput
                    {...field}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    id="linkedin"
                    placeholder="Link to linkedin profile"
                  />
                  <InputGroupAddon>
                    <InputGroupButton variant="secondary" size="icon-xs">
                      <Linkedin />
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* Github  */}
          <Controller
            name="github"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="max-h-[80px]">
                <FieldLabel
                  htmlFor="github"
                  className="py-2 font-semibold text-slate-600"
                >
                  گیت هاب:
                </FieldLabel>
                <InputGroup dir="ltr">
                  <InputGroupInput
                    {...field}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    id="github"
                    placeholder="Link to github profile"
                  />
                  <InputGroupAddon>
                    <InputGroupButton variant="secondary" size="icon-xs">
                      <Github />
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>
      <Field className="md:w-1/3 p-7">
        <Button type="submit" form="profile-info-form" disabled={isPending}>
          {isPending ? "در حال ذخیره..." : "ذخیره تغییرات"}{" "}
          {isPending && <Spinner />}
        </Button>
      </Field>
    </div>
  );
};

export default SettingAboutSection;
