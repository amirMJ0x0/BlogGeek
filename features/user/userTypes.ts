export type EditUserInfoRequest = {
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

export type FollowRelation = {
  id: number;
  username: string;
  first_name?: string | null;
  last_name?: string | null;
  profile_image?: string | null;
  is_followed_by_you: boolean;
  is_following: boolean;
};

export type SuggestedUser = {
  id: number;
  username: string;
  first_name: string | null;
  last_name: string | null;
  profile_image: string | null;
  is_followed_by_you: boolean;
  is_following: boolean;
};
