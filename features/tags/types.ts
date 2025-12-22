import { Blog } from "../blogs/blogTypes";

export type TagItemType = {
  id: number;
  title: string;
  slug: string;
  _count: {
    blogs: number;
  };
};

export type TagsResponse = {
  tags: TagItemType[];
  totalPage: number;
  totalCount: number;
};

export type TagBlogData = {
  title: string;
  slug: string;
  blogs: Omit<Blog, "is_followed_by_you" | "is_following" | "author_id">[];
  totalPage: number;
  totalCount: number;
};
