import { getEventById } from "@/lib/util";
import { notFound } from "next/navigation";

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = getEventById(id);

  if (!event) {
    notFound();
  }

  return (
    <div>
      <h1>{event.title.en}</h1>
    </div>
  );
}
