export type User = {
  id: number;
  email: string;
  phone_number: string;
  username: string;
  first_name: string;
  last_name: string;
  profile_image: string | null;
  banner_image: string | null;
  birthday: string | null;
  bio: string | null;
  social_media: {
    instagram?: string;
    twitter?: string;
    telegram?: string;
  } | null;
  role: string;
  last_login_at: string;
  created_at: string;
  updated_at: string;
};

export type SendOtpRequest = {
  credential: string; //email or password
};

export type LoginWithPassRequest = SendOtpRequest & {
  password?: string;
};

export type SendOtpResponseData = {
  expiredAt: string;
};

export type CheckOtpRequest = {
  credential: string;
  code: number;
};
