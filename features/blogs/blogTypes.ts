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

export type Blog = {
  id: number;
  title: string;
  content: string;
  published_at?: string | null;
  slug?: string;
  blog_image?: string | null;
  banner_image: string | null;
  created_at: string;
  updated_at: string;
  author: BlogAuthor;
  tags: BlogTag[];
  _count: BlogCount;
  liked: boolean;
  saved: boolean;
};

export type BlogsResponse = {
  blogs: Blog[];
  totalPages: number;
  totalCount: number;
};

export const BLOG_PAGE_LIMIT = 10;
