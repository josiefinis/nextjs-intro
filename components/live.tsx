import type { Result } from "@/lib/errors";
import type { Event, Events } from "@/lib/types";
import Button from "@/components/button";
import EventDate from "@/components/event-date";
import { fetchEvents } from "@/data/events";

function cleanTitle(title: string, venue: string): string {
  const regex = new RegExp(` ((on)|(at)) ${venue}`);
  return title.replace(regex, "");
}

interface EventProps {
  url: string;
  title: string;
  venue: string;
  date: Date | undefined;
}

function Event({ url, title, venue, date }: EventProps) {
  return (
    <article className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-4 md:gap-8 items-center text-fluid-lg uppercase text-center font-display text-gray-300">
      <header>
        <h3 className="text-xl md:text-fluid-xl text-white">{title}</h3>
        <p>{venue}</p>
      </header>
      <EventDate date={date} className="order-first" />
      <Button href={`/event/${url}`} classes="mx-auto font-normal">
        More info
      </Button>
    </article>
  );
}

function EventGrid({ events }: { events: Event[] }) {
  return (
    <div className="grid gap-24 md:gap-12 inline-full">
      {events.flatMap((event) => {
        // Some events are scheduled on more than one date. Create a separate card for each date.
        let i = 0;
        const arr = [];
        do {
          arr.push(
            <Event
              key={`${event.id}${i}`}
              url={event.url}
              title={cleanTitle(event.title, event.venueName)}
              venue={event.venueName}
              date={event.schedule[i]?.startTime}
            />,
          );
        } while (++i < event.schedule.length);
        return arr;
      })}
    </div>
  );
}

export default async function Live({
  page,
  size,
}: {
  page: number;
  size: number;
}) {
  const response: Result<Events> = await fetchEvents({
    page: page,
    size: size,
    subcategories: [
      "hard-rock-metal",
      "dance-electronic",
      "indie-punk",
      "hip-hop-soul-rnb",
    ],
  });
  if (!response.success) {
    console.error(response.error.context);
  }
  const events: Event[] = response.success ? response.result.events : [];
  const next: number | null = response.success ? response.result.next : 1;
  const previous: number | null = response.success
    ? response.result.previous
    : 1;

  return (
    <section aria-labelledby="live" className="mx-4">
      <h2 id="live" className="font-display text-fluid-4xl text-center mbs-8">
        Live
      </h2>
      <div className="text-center mbe-12">
        <p className="font-display text-fluid-xl">(Supporting)</p>
        <small className="font-display text-fluid-sm text-pretty">
          ((in her heart))
        </small>
      </div>
      <nav className="text-center mbe-24 *:mx-4">
        {previous && <Button href={`/?page=${previous}#live`}>Previous</Button>}
        {next && <Button href={`/?page=${next}#live`}>Next</Button>}
      </nav>
      {response.success ? (
        <EventGrid events={events} />
      ) : (
        <p className="text-fluid-lg text-center mbe-12">
          There was a problem retrieving live events. Please try again later.
        </p>
      )}
    </section>
  );
}
