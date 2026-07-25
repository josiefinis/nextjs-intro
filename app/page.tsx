import Hero from "@/components/hero";
import Live from "@/components/live";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { page = "1", size = "16", subcategory = [] } = await searchParams;
  const currentPage = Number(page);
  const currentSize = Number(size);
  const subcategories =
    subcategory instanceof Array ? subcategory : [subcategory];

  return (
    <div>
      <Hero />
      <Live
        currentPage={currentPage}
        currentSize={currentSize}
        subcategories={subcategories}
      />
    </div>
  );
}
