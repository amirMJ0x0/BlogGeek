export type SearchItem = {
  title: string;
  href: string;
  type: "blog" | "user" | "tag";
  summary?: string;
  image?: string;
};

export type SearchListEntry = {
  blogs: SearchItem[];
  users: SearchItem[];
  tags: SearchItem[];
};

export type SearchResponseData = {
  searchList: SearchListEntry[];
  searchResultCount: number;
};
