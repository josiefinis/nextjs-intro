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
      <h1 className="font-display text-fluid-2xl">{event.title.en}</h1>
      <p>{event.venue_name}</p>
    </div>
  );
}
