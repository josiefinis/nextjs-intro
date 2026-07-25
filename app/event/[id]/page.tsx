import Link from "next/link";
import { notFound } from "next/navigation";
import EventDate from "@/components/event-date";
import type { Event } from "@/lib/types";
import type { Result } from "@/lib/errors";
import { fetchEventById, getIdByUrl } from "@/data/events";

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

  const response: Result<Event> = await fetchEventById(eventId);
  if (response.success === false) {
    return null;
  }
  const event = response.result;
  return { title: event.title };
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

  const response: Result<Event> = await fetchEventById(eventId);
  if (response.success === false) {
    console.warn(response.error.context);
    notFound();
  }
  const event = response.result;

  return (
    <div className="flex flex-col items-start gap-4 text-fluid-lg  mbs-12 mx-4 md:mx-12">
      <header>
        <h1 className="font-display text-fluid-2xl">{event.title}</h1>
        <p className="max-inline-[70ch] font-semibold">{event.description}</p>
      </header>
      {event.schedule
        .filter((item) => item.startTime > new Date())
        .map((scheduleItem, index) => (
          <div key={`${event.id}${index}`} className="text-fluid-xl font-bold">
            <EventDate date={scheduleItem.startTime} />
            &mdash;
            <EventDate
              date={scheduleItem.endTime}
              format={Intl.DateTimeFormat("en-UK", {
                hour: "numeric",
                minute: "numeric",
              })}
            />
          </div>
        ))}
      <section aria-labelledby="venue">
        <h2 id="venue" className="text-fluid-xl">
          Venue
        </h2>
        <p>{event.venueName}</p>
        <address>
          <p>{event.address}</p>
          <p>
            {event.zipCode} {event.city}
          </p>
        </address>
        <p>Closest station: {event.closestStation}</p>
      </section>
      <Link
        href={event.externalWebsiteUrl}
        prefetch={false}
        target="_blank"
        className="break-all"
      >
        {event.externalWebsiteUrl}
      </Link>
    </div>
  );
}
