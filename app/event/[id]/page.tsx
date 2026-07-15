import Link from "next/link";
import { notFound } from "next/navigation";
import EventDate from "@/components/event-date";
import type { Event, ScheduleItem } from "@/data/events";
import { fetchEventById, getIdByUrl, getSchedule } from "@/data/events";
import { replaceHtmlEntities } from "@/lib/util";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const eventId = getIdByUrl(id);
  if (!eventId) {
    return null;
  }

  const event: Event = await fetchEventById(eventId);
  if (!event) {
    return null;
  }
  return { title: event.title.en };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const eventId = getIdByUrl(id);
  if (!eventId) {
    notFound();
  }

  const event: Event = await fetchEventById(eventId);
  const schedule: ScheduleItem[] = getSchedule(event);
  if (!event) {
    notFound();
  }

  return (
    <div className="flex flex-col items-start gap-4 mbs-12 mx-4 md:mx-12">
      <header>
        <h1 className="font-display text-fluid-2xl">{event.title.en}</h1>
        <p className="max-inline-[70ch]">
          {replaceHtmlEntities(event.description.en)}
        </p>
      </header>
      {schedule.map((scheduleItem, index) => (
        <EventDate
          key={`${event.id}${index}`}
          date={scheduleItem.startTime}
          className="text-fluid-xl"
        />
      ))}
      <section aria-labelledby="venue">
        <h2 id="venue" className="text-fluid-xl">
          Venue
        </h2>
        <p>{event.venue_name}</p>
        <address>
          <p>{event.address}</p>
          <p>
            {event.zip_code} {event.city}
          </p>
        </address>
        <p>Closest station: {event.closest_station}</p>
      </section>
      <Link href={event.external_website_url} prefetch={false}>
        {event.external_website_url}
      </Link>
    </div>
  );
}
