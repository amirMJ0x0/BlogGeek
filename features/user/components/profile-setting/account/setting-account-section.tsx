import { Separator } from "@/components/ui/separator";
import ChangeUsernameField from "./change-username-field";
import ChangePasswordField from "./change-password-filed";
import ChangeEmailField from "./change-email-field";
import ChangePhoneField from "./change-phone-field";

const SettingAccountSection = () => {
  return (
    <div className="flex flex-col p-3">
      <section>
        <ChangeUsernameField />
      </section>
      <Separator />
      <section>
        <ChangeEmailField />
      </section>
      <Separator />
      <section>
        <ChangePhoneField />
      </section>
      <Separator />
      <section>
        <ChangePasswordField />
      </section>
    </div>
  );
};

export default SettingAccountSection;
