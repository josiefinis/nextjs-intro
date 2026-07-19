import type { Result } from "@/lib/errors";
import type { Event, Events } from "@/lib/types";
import Button from "@/components/button";
import EventDate from "@/components/event-date";
import { fetchEvents } from "@/data/events";

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
      <Button href={`/event/${url}`} className="mx-auto font-normal">
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

  const events: Event[] = response.success ? response.result.events : [];
  const allSubcategories = response.success
    ? response.result.subcategories
    : [];
  const nextPage: number | null = response.success
    ? response.result.next
    : null;
  const previousPage: number | null = response.success
    ? response.result.previous
    : null;

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
      <div
        aria-label="filter by genre"
        className="flex justify-center flex-wrap mbe-24 *:m-1 text-fluid-sm"
      >
        {allSubcategories.map((subcategory) => {
          const isIncluded = currentParams.has("subcategory", subcategory.slug);
          return (
            <Button
              key={`${subcategory.slug}`}
              href={`/?${newSearchParams(currentParams, subcategory.slug)}`}
              scroll={false}
              className={isIncluded ? "bg-pink-700" : "bg-black"}
            >
              {`${subcategory.title}`}
            </Button>
          );
        })}
      </div>
      <nav
        aria-label="pages"
        className="text-center text-fluid-sm mbe-12 *:mx-4"
      >
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

function cleanTitle(title: string, venue: string): string {
  const regex = new RegExp(` ((on)|(at)) ${venue}`);
  return title.replace(regex, "");
}

function newSearchParams(
  currentParams: URLSearchParams,
  subcategory: string,
): URLSearchParams {
  const newParams = new URLSearchParams(currentParams);
  newParams.delete("page");
  if (currentParams.has("subcategory", subcategory)) {
    newParams.delete("subcategory", subcategory);
  } else {
    newParams.append("subcategory", subcategory);
  }
  return newParams;
}
