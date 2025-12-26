export type User = {
  id: number;
  email: string;
  phone_number: string;
  username: string;
  first_name: string;
  last_name: string;
  profile_image: string | undefined;
  banner_image: string | undefined;
  birthday: string | undefined;
  bio: string | undefined;
  social_media:
    | {
        instagram?: string;
        twitter?: string;
        telegram?: string;
        linkedin?: string;
        github?: string;
      }
    | undefined;
  role: string;
  last_login_at: string;
  created_at: string;
  updated_at: string;
  _count: {
    followers: number;
    following: number;
    blogs: number;
  };
};

export type SendOtpReqBody = {
  credential: string; //email or password
};

export type LoginWithPassReqBody = SendOtpReqBody & {
  password?: string;
};

export type SendOtpResponseData = {
  expiredAt: string;
};

export type CheckOtpReqBody = {
  credential: string;
  code: number;
};
