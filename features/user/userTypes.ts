type EditUserInfoRequest = {
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

// follow section
export type UserSummary = {
  id: number;
  username: string;
  first_name?: string | null;
  last_name?: string | null;
  profile_image?: string | null;
};

export type FollowRelation = {
  id: number;
  follower?: UserSummary;
  following?: UserSummary;
};
