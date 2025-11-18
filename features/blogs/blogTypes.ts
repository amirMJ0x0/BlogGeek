export type BlogCategory = {
  id: number;
  title: string;
  slug: string;
  children?: BlogCategory[];
};

export type BlogCount = {
  likes: number;
  comments: number;
  saved_blogs: number;
  views: number;
};

export type Blog = {
  id: number;
  title: string;
  content: string;
  slug: string;
  created_at: string;
  updated_at: string;
  category: BlogCategory;
  _count: BlogCount;
};

export type BlogUser = {
  first_name: string;
  last_name: string;
  profile_image: string;
  username: string;
};

export type BlogItem = {
  blog: Blog;
  user: BlogUser;
};

export type BlogsResponse = {
  blogs: BlogItem[];
  totalPages: number;
  totalCount: number;
  currentPage: number;
};
