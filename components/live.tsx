import type { Event } from "@/data/events";
import Button from "@/components/button";
import EventDate from "@/components/event-date";
import { fetchEvents, getSchedule } from "@/data/events";

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
      <Button
        href={`/event/${url}`}
        children="More info"
        classes="mx-auto font-normal"
      />
    </article>
  );
}

export default async function Live() {
  const events: Event[] = await fetchEvents({
    subcategories: [
      "hard-rock-metal",
      "dance-electronic",
      "indie-punk",
      "hip-hop-soul-rnb",
    ],
  });

  return (
    <section aria-labelledby="live" className="mx-4">
      <h2 id="live" className="font-display text-fluid-4xl text-center mbs-8">
        Live
      </h2>
      <div className="text-center mbe-24">
        <p className="font-display text-fluid-xl">(Supporting)</p>
        <small className="font-display text-fluid-sm text-pretty">
          ((in her heart))
        </small>
      </div>
      <div className="grid gap-24 md:gap-12 inline-full">
        {events.flatMap((event) => {
          const schedule = getSchedule(event);
          // Some events are scheduled on more than one date. Create a separate card for each date.
          let i = 0;
          let arr = [];
          do {
            arr.push(
              <Event
                key={`${event.id}${i}`}
                url={event.url}
                title={cleanTitle(event.title.en, event.venue_name)}
                venue={event.venue_name}
                date={schedule[i]?.startTime}
              />,
            );
          } while (++i < schedule.length);
          return arr;
        })}
      </div>
    </section>
  );
}
