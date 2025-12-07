export const TAGS_LIMIT = 10;

export type TagItem = {
  id: number;
  title: string;
  slug: string;
  _count: {
    blogs: number;
  };
};

export type TagsResponse = {
  tags: TagItem[];
  totalPage: number;
  totalCount: number;
};

export type TagsCreateRequest = {
  title: string;
  slug?: string;
};

export type CreateBlogReqBody = {
  title: string;
  content: string;
  banner_image: string;
  blog_image: string;
  summary: string;
  visibility: string;
  published_at: string | null;
  tags: { id: number; title: string }[];
};
