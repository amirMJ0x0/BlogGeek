export type BlogCount = {
  likes: number;
  comments: number;
  saved_blogs: number;
  views: number;
};

export type BlogTag = {
  tag: {
    id: number;
    title: string;
    slug: string;
  };
};

export type BlogAuthor = {
  id: number;
  username: string;
  profile_image: string | null;
  first_name: string;
  last_name: string;
  bio: string;
  social_media?: {
    instagram: string | null;
    twitter: string | null;
    telegram: string | null;
    linkedin: string | null;
    github: string | null;
  };
};

export type Blog = {
  id: number;
  title: string;
  content: string;
  summary: string;
  published_at?: string | null;
  slug?: string;
  blog_image?: string | null;
  banner_image: string | null;
  created_at: string;
  updated_at: string;
  author_id: number;
  author: BlogAuthor;
  tags: BlogTag[];
  _count: BlogCount;
  is_followed_by_you: boolean;
  is_following: boolean;
  liked: boolean;
  saved: boolean;
};

export type MyPostType = Omit<
  Blog,
  "is_followed_by_you" | "is_following" | "author_id"
> & {
  visibility: string;
};

export type BlogsResponse = {
  blogs: Blog[];
  totalPages: number;
  totalCount: number;
};

export const BLOG_PAGE_LIMIT = 10;
