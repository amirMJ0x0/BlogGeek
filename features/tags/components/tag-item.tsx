import Link from "next/link";
import { TagItemType } from "@/features/tags"

const TagItem = ({ tag }: { tag: TagItemType }) => {
  return (
    <Link href={`/tags${tag.slug}`}>
      <div className="p-4 bg-gray-50 dark:bg-card border rounded-lg">
        <h3 className="font-bold">{tag.title}</h3>
        <span className="text-sm text-gray-400">{tag._count.blogs} مقاله</span>
      </div>
    </Link>
  );
};

export default TagItem;
