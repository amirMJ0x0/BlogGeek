//constants
export const TAGS_PAGE_LIMIT = 10;

// types
export type { TagItemType, TagsResponse } from "./types";

// api
export { getAllTags } from "./api/tags.api";

// hooks
export { useTagsQuery } from "./hooks/useTagsQuery";
