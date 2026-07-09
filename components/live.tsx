import Button from "@/components/button";
import data from "@/data/events.json";

const longDate = Intl.DateTimeFormat("sv-SE", {
  weekday: "short",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
});

function isString(value: string | undefined): value is string {
  return (value as string).length !== undefined;
}

const events = data.results;

interface EventProps {
  city: string;
  venue: string;
  date: Date;
  ticketPortal: string;
  isAvailable: boolean;
}

function Event({ city, venue, date, ticketPortal, isAvailable }: EventProps) {
  return (
    <article
      className={`grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-4 items-center text-fluid-lg uppercase text-center font-display ${!isAvailable && "opacity-50"}`}
    >
      <header>
        <h3 className="text-xl md:text-fluid-xl">{city}</h3>
        <p>{venue}</p>
      </header>
      <time dateTime={date.toISOString()} className="order-first md:text-right">
        {longDate.format(date)}
      </time>
      <Button
        href={ticketPortal}
        children={isAvailable ? "Get Tickets" : "Sold Out"}
        classes="mx-auto font-normal"
        isDisabled={!isAvailable}
      />
    </article>
  );
}

export default function Live() {
  return (
    <section aria-labelledby="live" className="mx-4">
      <h2 id="live" className="font-display text-fluid-4xl text-center my-8">
        Live
      </h2>
      <div className="grid gap-24 md:gap-12">
        {events.map(
          (event) =>
            isString(event.schedule.dates[0]?.date) && (
              <Event
                key={event.id}
                city={event.city}
                venue={event.venue_name}
                date={
                  new Date(
                    `${event.schedule.dates[0].date} ${event.schedule.dates[0].start_time}`,
                  )
                }
                ticketPortal={"#"}
                isAvailable={event.description.en.length % 5 !== 0} // decide if event is sold out based on length of description.
              />
            ),
        )}
      </div>
    </section>
  );
}
