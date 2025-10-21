"use client";

import { useUserStore } from "../../store/useUserStore";
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
} from "../../schemas/aboutSettingSchema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useEditUserInfo } from "../../hooks/useEditUserInfo";
import { useCustomToast } from "@/features/nav/hooks/useCustomToast";
import { Spinner } from "@/components/ui/spinner";
import BirthdayInput from "./birthday-input";
import { useRouter } from "next/navigation";

const SettingAboutSection = () => {
  const { user } = useUserStore();
  const { showToast } = useCustomToast();
  const { mutate: mutateUserInfo, isPending } = useEditUserInfo();
  const router = useRouter();
  const form = useForm<ProfileInfoFormData>({
    resolver: zodResolver(profileInfoSchema),
    defaultValues: {
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
      birthday: data.birthday || null,
      bio: data.bio || null,
      social_media: {
        instagram: data.instagram
          ? `https://instagram.com/${data.instagram}`
          : null,
        twitter: data.twitter ? `https://twitter.com/${data.twitter}` : null,
        telegram: data.telegram ? `https://t.me/${data.telegram}` : null,
        linkedin: data.linkedin
          ? `https://linkedin.com/in/${data.linkedin}`
          : null,
        github: data.github ? `https://github.com/${data.github}` : null,
      },
    };
    mutateUserInfo(apiData, {
      onSuccess: (response) => {
        showToast(response.message, "success");
        useUserStore.setState({ user: response.data });
        router.push(`/@${user?.username}`);
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
                  placeholder="علی"
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
                  placeholder="اسدی"
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
                    placeholder="یه جوون ایرانی برنامه نویس..."
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
                    placeholder="aliAsadi1"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  <InputGroupAddon>
                    <InputGroupButton variant="secondary" size="icon-xs">
                      <svg
                        width="800px"
                        height="800px"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M41.4193 7.30899C41.4193 7.30899 45.3046 5.79399 44.9808 9.47328C44.8729 10.9883 43.9016 16.2908 43.1461 22.0262L40.5559 39.0159C40.5559 39.0159 40.3401 41.5048 38.3974 41.9377C36.4547 42.3705 33.5408 40.4227 33.0011 39.9898C32.5694 39.6652 24.9068 34.7955 22.2086 32.4148C21.4531 31.7655 20.5897 30.4669 22.3165 28.9519L33.6487 18.1305C34.9438 16.8319 36.2389 13.8019 30.8426 17.4812L15.7331 27.7616C15.7331 27.7616 14.0063 28.8437 10.7686 27.8698L3.75342 25.7055C3.75342 25.7055 1.16321 24.0823 5.58815 22.459C16.3807 17.3729 29.6555 12.1786 41.4193 7.30899Z"
                          fill="#000000"
                        />
                      </svg>
                    </InputGroupButton>
                  </InputGroupAddon>
                  <InputGroupAddon className="text-muted-foreground pl-1.5">
                    https://t.me/
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
                    placeholder="aliAsadi1"
                  />
                  <InputGroupAddon>
                    <InputGroupButton variant="secondary" size="icon-xs">
                      <svg
                        fill="#000000"
                        width="800px"
                        height="800px"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8,2 L16,2 C19.3137085,2 22,4.6862915 22,8 L22,16 C22,19.3137085 19.3137085,22 16,22 L8,22 C4.6862915,22 2,19.3137085 2,16 L2,8 C2,4.6862915 4.6862915,2 8,2 Z M8,4 C5.790861,4 4,5.790861 4,8 L4,16 C4,18.209139 5.790861,20 8,20 L16,20 C18.209139,20 20,18.209139 20,16 L20,8 C20,5.790861 18.209139,4 16,4 L8,4 Z M12,17 C9.23857625,17 7,14.7614237 7,12 C7,9.23857625 9.23857625,7 12,7 C14.7614237,7 17,9.23857625 17,12 C17,14.7614237 14.7614237,17 12,17 Z M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z M17,8 C16.4477153,8 16,7.55228475 16,7 C16,6.44771525 16.4477153,6 17,6 C17.5522847,6 18,6.44771525 18,7 C18,7.55228475 17.5522847,8 17,8 Z"
                        />
                      </svg>
                    </InputGroupButton>
                  </InputGroupAddon>
                  <InputGroupAddon className="text-muted-foreground pl-1.5">
                    https://instagram.com/
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
                    placeholder="aliAsadi1"
                  />
                  <InputGroupAddon>
                    <InputGroupButton variant="secondary" size="icon-xs">
                      <svg height="240" width="240" viewBox="0 0 240 240">
                        <g>
                          <path d="M142.58 101.52 231.76 0h-21.13l-77.47 88.13L71.33 0H0l93.52 133.28L0 239.73h21.13l81.76 -93.09 65.31 93.09h71.33zm-28.95 32.93 -9.49 -13.28L28.75 15.6h32.46l60.86 85.23 9.45 13.28 79.1 110.78h-32.46zm0 0"></path>
                        </g>
                      </svg>
                    </InputGroupButton>
                  </InputGroupAddon>
                  <InputGroupAddon className="text-muted-foreground pl-1.5">
                    https://twitter.com/
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
                    placeholder="aliAsadi1"
                  />
                  <InputGroupAddon>
                    <InputGroupButton variant="secondary" size="icon-xs">
                      <svg
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>LinkedIn icon</title>
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </InputGroupButton>
                  </InputGroupAddon>
                  <InputGroupAddon className="text-muted-foreground pl-1.5">
                    https://linkedin.com/in/
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
                    placeholder="aliAsadi1"
                  />
                  <InputGroupAddon>
                    <InputGroupButton variant="secondary" size="icon-xs">
                      <svg
                        fill="#000000"
                        width="800px"
                        height="800px"
                        viewBox="-2 -2 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="xMinYMin"
                        className="jam jam-github"
                      >
                        <path d="M18.88 1.099C18.147.366 17.265 0 16.233 0H3.746C2.714 0 1.832.366 1.099 1.099.366 1.832 0 2.714 0 3.746v12.487c0 1.032.366 1.914 1.099 2.647.733.733 1.615 1.099 2.647 1.099H6.66c.19 0 .333-.007.429-.02a.504.504 0 0 0 .286-.169c.095-.1.143-.245.143-.435l-.007-.885c-.004-.564-.006-1.01-.006-1.34l-.3.052c-.19.035-.43.05-.721.046a5.555 5.555 0 0 1-.904-.091 2.026 2.026 0 0 1-.872-.39 1.651 1.651 0 0 1-.572-.8l-.13-.3a3.25 3.25 0 0 0-.41-.663c-.186-.243-.375-.407-.566-.494l-.09-.065a.956.956 0 0 1-.17-.156.723.723 0 0 1-.117-.182c-.026-.061-.004-.111.065-.15.07-.04.195-.059.378-.059l.26.04c.173.034.388.138.643.311a2.1 2.1 0 0 1 .631.677c.2.355.44.626.722.813.282.186.566.28.852.28.286 0 .533-.022.742-.065a2.59 2.59 0 0 0 .585-.196c.078-.58.29-1.028.637-1.34a8.907 8.907 0 0 1-1.333-.234 5.314 5.314 0 0 1-1.223-.507 3.5 3.5 0 0 1-1.047-.872c-.277-.347-.505-.802-.683-1.365-.177-.564-.266-1.215-.266-1.952 0-1.049.342-1.942 1.027-2.68-.32-.788-.29-1.673.091-2.652.252-.079.625-.02 1.119.175.494.195.856.362 1.086.5.23.14.414.257.553.352a9.233 9.233 0 0 1 2.497-.338c.859 0 1.691.113 2.498.338l.494-.312a6.997 6.997 0 0 1 1.197-.572c.46-.174.81-.221 1.054-.143.39.98.424 1.864.103 2.653.685.737 1.028 1.63 1.028 2.68 0 .737-.089 1.39-.267 1.957-.177.568-.407 1.023-.689 1.366-.282.343-.633.63-1.053.865-.42.234-.828.403-1.223.507a8.9 8.9 0 0 1-1.333.235c.45.39.676 1.005.676 1.846v3.11c0 .147.021.266.065.357a.36.36 0 0 0 .208.189c.096.034.18.056.254.064.074.01.18.013.318.013h2.914c1.032 0 1.914-.366 2.647-1.099.732-.732 1.099-1.615 1.099-2.647V3.746c0-1.032-.367-1.914-1.1-2.647z" />
                      </svg>
                    </InputGroupButton>
                  </InputGroupAddon>
                  <InputGroupAddon className="text-muted-foreground pl-1.5">
                    https://github.com/
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
