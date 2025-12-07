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
import { debounce } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTags } from "../hooks/useTags";
import { Spinner } from "@/components/ui/spinner";

type TagSelectionProps = {
  value: { id: number; title: string }[];
  onUpdate: (tags: { id: number; title: string }[]) => void;
};
const TagSelection = ({ value, onUpdate }: TagSelectionProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debounced, setDebounced] = useState("");

  const { data, isLoading } = useTags(debounced);
  const tagList = data?.tags ?? [];

  const selectedIds = value.map((tag) => tag.id.toString()) ?? [];

  const debouncedSearch = useRef(
    debounce((val: string) => {
      setDebounced(val);
    }, 400)
  ).current;

  useEffect(() => {
    console.log("searchQuery:", searchQuery);
    console.log("debounced:", debounced);
    console.log(tagList);
  }, [searchQuery, debounced, data]);

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
    <Tags className="max-w-[300px]">
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
                  key={tag.id}
                  onSelect={() => handleSelect(tag.id.toString())}
                  value={tag.id.toString()}
                >
                  {tag.title}
                  {selectedIds.includes(tag.id.toString()) && (
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
export default TagSelection;
