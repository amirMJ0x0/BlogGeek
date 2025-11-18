export interface BlogCategory {
  id: number;
  title: string;
  slug: string;
  children?: BlogCategory[];
}

export interface BlogCount {
  likes: number;
  comments: number;
  saved_blogs: number;
  views: number;
}

export interface Blog {
  id: number;
  title: string;
  content: string;
  slug: string;
  created_at: string;
  updated_at: string;
  category: BlogCategory;
  _count: BlogCount;
}

export interface BlogUser {
  first_name: string;
  last_name: string;
  profile_image: string;
  username: string;
}

export interface BlogItem {
  blog: Blog;
  user: BlogUser;
}

export interface BlogsResponse {
  blogs: BlogItem[];
  totalPages: number;
  totalCount: number;
  currentPage: number;
}
