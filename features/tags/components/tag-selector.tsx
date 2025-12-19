"use client";
import {
  Tags,
  TagsContent,
  TagsEmpty,
  TagsGroup,
  TagsInput,
  TagsItem,
  TagsList,
  TagsTrigger,
  TagsValue,
} from "@/components/ui/shadcn-io/tags";
import { Skeleton } from "@/components/ui/skeleton";
import { useTagsQuery } from "@/features/tags/hooks/useTagsQuery";
import { debounce } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { useRef, useState } from "react";

type TagSelectionProps = {
  value: { id: number; title: string }[];
  onUpdate: (tags: { id: number; title: string }[]) => void;
};
const TagSelector = ({ value, onUpdate }: TagSelectionProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debounced, setDebounced] = useState("");
  const [openSelector, setOpenSelector] = useState(false);
  const { data, isLoading } = useTagsQuery({
    search: debounced,
    limit: 100,
    enabled: openSelector,
  });
  const tagList = data?.pages.flatMap((page) => page?.tags) ?? [];

  const selectedIds = value.map((tag) => tag.id.toString()) ?? [];

  const debouncedSearch = useRef(
    debounce((val: string) => {
      setDebounced(val);
    }, 400)
  ).current;

  const handleSearch = (val: string) => {
    setSearchQuery(val);

    if (val === "") {
      setDebounced("");
      return;
    }

    debouncedSearch(val);
  };

  const handleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      const newSelected = value.filter((tag) => tag.id.toString() !== id);
      onUpdate(newSelected);
    } else if (selectedIds.length < 3) {
      const tag = tagList.find((tag) => tag?.id.toString() === id);
      if (tag) {
        onUpdate([...value, { id: tag.id, title: tag.title }]);
      }
    }
  };
  return (
    <Tags
      className="max-w-[300px]"
      open={openSelector}
      onOpenChange={(val) => setOpenSelector(val)}
    >
      <TagsTrigger>
        {value.map((tag) => (
          <TagsValue
            key={tag.id}
            onRemove={() => handleSelect(tag.id.toString())}
          >
            {tag.title}
          </TagsValue>
        ))}
      </TagsTrigger>
      <TagsContent dir="rtl">
        <TagsInput
          value={searchQuery}
          onValueChange={handleSearch}
          placeholder="جستجوی تگ..."
        />
        <TagsList>
          {isLoading && (
            <div className="flex flex-col gap-2 p-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-8" />
              ))}
            </div>
          )}
          {tagList.length === 0 && !isLoading ? (
            <TagsEmpty>
              <p className="text-center text-sm text-muted-foreground">
                هیچ تگی یافت نشد
              </p>
            </TagsEmpty>
          ) : (
            <TagsGroup forceMount>
              {tagList.map((tag) => (
                <TagsItem
                  key={tag?.id}
                  onSelect={() => handleSelect(String(tag?.id))}
                  value={String(tag?.id)}
                >
                  {tag?.title}
                  {selectedIds.includes(String(tag?.id)) && (
                    <CheckIcon className="text-muted-foreground" size={14} />
                  )}
                </TagsItem>
              ))}
            </TagsGroup>
          )}
        </TagsList>
      </TagsContent>
    </Tags>
  );
};
export default TagSelector;
