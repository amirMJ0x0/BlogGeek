type EditUserInfoRequest = {
  username: string;
  first_name: string | null;
  last_name: string | null;
  birthday: string | null;
  bio: string | null;
  social_media: {
    instagram: string | null;
    twitter: string | null;
    telegram: string | null;
    linkedin: string | null;
    github: string | null;
  };
};
