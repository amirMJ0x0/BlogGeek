import { Separator } from "@/components/ui/separator";
import ChangeUsernameField from "./change-username-field";

const SettingAccountSection = () => {
  return (
    <div className="flex flex-col py-3">
      <section>
        {/* <h3>نام کاربری</h3> */}
        <ChangeUsernameField />
      </section>
      <Separator />
      <section>
        <div>
          {/* <ChangePasswordField/> */}
        </div>
      </section>
      <Separator />
      <section>
        {/* <ChangeEmailField /> */}
      </section>
      <Separator />
      <section>
        {/* <ChangePhoneField /> */}
      </section>
    </div>
  );
};

export default SettingAccountSection;
