export const TAGS_LIMIT = 50;

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
