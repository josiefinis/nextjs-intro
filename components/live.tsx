import type { Result } from "@/lib/errors";
import type { Event, Events } from "@/lib/types";
import Button from "@/components/button";
import EventDate from "@/components/event-date";
import { fetchEvents } from "@/data/events";
import Pagination from "@/components/navigation/pagination";
import Filter from "./navigation/filter";

interface EventProps {
  url: string;
  title: string;
  venue: string;
  date: Date | undefined;
}

export default async function Live({
  currentPage,
  currentSize,
  subcategories,
}: {
  currentPage: number;
  currentSize: number;
  subcategories: string[];
}) {
  const response: Result<Events> = await fetchEvents({
    page: currentPage,
    size: currentSize,
    subcategories: subcategories,
  });
  if (!response.success) {
    console.error(response.error.context);
  }

  const {
    subcategories: allSubcategories = [],
    next: nextPage = null,
    previous: previousPage = null,
    events = [],
  } = response.success ? response.result : {};

  const currentParams = new URLSearchParams();
  currentParams.set("page", String(currentPage) ?? "1");
  subcategories.map((subcategory) =>
    currentParams.append("subcategory", subcategory),
  );

  return (
    <section aria-labelledby="live" className="mx-4">
      <h2
        id="live"
        className="font-display text-fluid-4xl text-center mbs-8 mbe-4"
      >
        Live
      </h2>
      <Filter
        allSubcategories={allSubcategories}
        currentSearchParams={currentParams}
        className="flex justify-center flex-wrap mbe-24 *:m-1 text-fluid-sm"
      />
      <Pagination
        currentParams={currentParams}
        previousPage={previousPage}
        nextPage={nextPage}
        className="text-center text-fluid-sm mbe-12 *:mx-4"
      />
      {response.success ? (
        <EventGrid events={events} className="my-24" />
      ) : (
        <p className="text-fluid-lg text-center my-36">
          There was a problem retrieving live events. Please try again later.
        </p>
      )}
    </section>
  );
}

function Event({ url, title, venue, date }: EventProps) {
  return (
    <article className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-4 md:gap-8 items-center text-fluid-lg uppercase text-center font-display text-gray-300">
      <header>
        <h3 className="text-xl md:text-fluid-xl text-white">{title}</h3>
        <p>{venue}</p>
      </header>
      <EventDate date={date} className="order-first" />
      <Button href={`/event/${url}`} className="mx-auto font-normal">
        More info
      </Button>
    </article>
  );
}

function EventGrid({
  events,
  className,
}: {
  events: Event[];
  className: string;
}) {
  return (
    <div className={`grid gap-24 md:gap-12 inline-full ${className}`}>
      {events.flatMap((event) => {
        // Some events are scheduled on more than one date. Create a separate card for each date.
        let i = 0;
        const arr = [];
        const { id, url, title, venueName } = event;
        do {
          const date = event.schedule[i]?.startTime;
          date &&
            date > new Date() &&
            arr.push(
              <Event
                key={`${id}${i}`}
                url={url}
                title={cleanTitle(title, venueName)}
                venue={venueName}
                date={date}
              />,
            );
        } while (++i < event.schedule.length);
        return arr;
      })}
    </div>
  );
}

function cleanTitle(title: string, venue: string): string {
  const regex = new RegExp(` ((on)|(at)) ${venue}`);
  return title.replace(regex, "");
}
