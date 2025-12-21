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
