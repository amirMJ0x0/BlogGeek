type CommentAuthor = {
  username: string;
  profile_image: string | null;
  first_name: string;
  last_name: string;
  social_media?: {
    instagram: string | null;
    twitter: string | null;
    telegram: string | null;
    linkedin: string | null;
    github: string | null;
  };
};

type CommentItem = {
  id: number;
  content: string;
  parent_id: number | null;
  created_at: string;
  author: CommentAuthor;
  replies: CommentItem[];
};

type CommentResponseData = {
  comments: CommentItem[];
  totalPage: number;
  totalCount: number;
};

export type { CommentItem, CommentAuthor, CommentResponseData };
