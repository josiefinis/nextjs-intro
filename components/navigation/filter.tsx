import { Subcategory } from "@/lib/types";
import Button from "../button";

interface FilterProps {
  allSubcategories: Subcategory[];
  currentSearchParams: URLSearchParams;
  className?: string;
}
export default function Filter({
  allSubcategories,
  currentSearchParams,
  className,
}: FilterProps) {
  currentSearchParams.delete("page");
  return (
    <div aria-label="filter by genre" className={className}>
      {allSubcategories.map((subcategory) => {
        const isIncluded = currentSearchParams.has(
          "subcategory",
          subcategory.slug,
        );
        return (
          <Button
            key={`${subcategory.slug}`}
            href={`/?${
              isIncluded
                ? (() => {
                    const newParams = new URLSearchParams(currentSearchParams);
                    newParams.delete("subcategory", subcategory.slug);
                    return newParams;
                  })()
                : (() => {
                    const newParams = new URLSearchParams(currentSearchParams);
                    newParams.append("subcategory", subcategory.slug);
                    return newParams;
                  })()
            }`}
            scroll={false}
            className={isIncluded ? "bg-pink-700" : "bg-black"}
          >
            {`${subcategory.title}`}
          </Button>
        );
      })}
    </div>
  );
}
