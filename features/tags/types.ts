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