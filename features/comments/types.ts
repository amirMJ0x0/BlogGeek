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

type CommentResponseData<T> = {
  comments: T;
  totalPage: number;
  totalCount: number;
};

type MyCommentItem = {
  id: number;
  content: string;
  created_at: string;
  blog: RelatedBlog;
};

type RelatedBlog = {
  title: string;
  content: string;
  tags: {
    id: number;
    title: string;
    slug: string;
  }[];
  _count: {
    likes: number;
    comments: number;
    saved_blogs: number;
    views: number;
  };
  created_at: string;
  updated_at: string;
};

export type { CommentItem, CommentAuthor, CommentResponseData, MyCommentItem };
