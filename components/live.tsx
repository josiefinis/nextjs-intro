import Button from "@/components/button";
import data from "@/data/events.json";

const longDate = Intl.DateTimeFormat("sv-SE", {
  weekday: "short",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
});

function isDate(variable: Date | undefined): variable is Date {
  try {
    variable?.toISOString();
    return true;
  } catch {
    return false;
  }
}

function cleanTitle(title: string, venue: string): string {
  const regex = new RegExp(` ((on)|(at)) ${venue}`);
  return title.replace(regex, "");
}

const events = data.results;

interface EventProps {
  title: string;
  venue: string;
  date: Date | undefined;
}

function Event({ title, venue, date }: EventProps) {
  return (
    <article className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-4 md:gap-8 items-center text-fluid-lg uppercase text-center font-display text-gray-300">
      <header>
        <h3 className="text-xl md:text-fluid-xl text-white">{title}</h3>
        <p>{venue}</p>
      </header>
      {isDate(date) ? (
        <time dateTime={date.toISOString()} className="order-first">
          {longDate.format(date)}
        </time>
      ) : (
        <p className="order-first">TBD</p>
      )}
      <Button href="#" children="More info" classes="mx-auto font-normal" />
    </article>
  );
}

export default function Live() {
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
          let i = 0;
          let arr = [];
          // Some events are scheduled on more than one date. Create a separate card for each date.
          do {
            arr.push(
              <Event
                key={`${event.id}${i}`}
                title={cleanTitle(event.title.en, event.venue_name)}
                venue={event.venue_name}
                date={
                  new Date(
                    `${event.schedule.dates[i]?.date} ${event.schedule.dates[i]?.start_time}`,
                  )
                }
              />,
            );
          } while (++i < event.schedule.dates.length);
          return arr;
        })}
      </div>
    </section>
  );
}
