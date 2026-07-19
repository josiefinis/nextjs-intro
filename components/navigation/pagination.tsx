import Button from "@/components/button";

interface PaginationProps {
  currentParams: URLSearchParams;
  previousPage: number | null;
  nextPage: number | null;
  className?: string;
}

export default function Pagination({
  currentParams,
  previousPage,
  nextPage,
  className,
}: PaginationProps) {
  return (
    <nav aria-label="pages" className={className}>
      {previousPage && (
        <Button
          href={(() => {
            const newParams = new URLSearchParams(currentParams);
            newParams.set("page", String(previousPage));
            return `/?${newParams}`;
          })()}
          scroll={false}
        >
          previous
        </Button>
      )}
      {nextPage && (
        <Button
          href={(() => {
            const newParams = new URLSearchParams(currentParams);
            newParams.set("page", String(nextPage));
            return `/?${newParams}`;
          })()}
          scroll={false}
        >
          next
        </Button>
      )}
    </nav>
  );
}
