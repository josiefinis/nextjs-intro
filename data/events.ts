type Subcategory =
  | "jazz-blues"
  | "pop"
  | "dance-electronic"
  | "hip-hop-soul-rnb"
  | "hard-rock-metal"
  | "indie-punk"
  | "country-folk"
  | "rock"
  | "reggae"
  | "classical";

export interface Event {
  id: string;
  title: { en: string; sv: string };
  description: { en: string; sv: string };
  external_website_url: string;
  url: string;
  address: string;
  venue_name: string;
  zip_code: string;
  city: string;
  location: {
    latitude: number;
    longitude: number;
  };
  created_at: string;
  modified_at: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  categories: [
    {
      title: "string";
      slug: "string";
      subcategories: "string";
    },
  ];
  schedule: {
    range: unknown;
    dates: [
      {
        date: string;
        start_time: string;
        end_time: string;
      },
    ];
  };
  closest_station: "string";
}

const ids = new Map<string, string>();

function mapIds(events: Event[]): void {
  events.forEach((event) => ids.set(event.url, event.id));
}

export function getIdByUrl(url: string): string | undefined {
  return ids.get(url);
}

export async function fetchEvents(
  subcategories: Subcategory[] = [],
): Promise<Event[]> {
  const filter = subcategories
    .map((subcategory) => `&subcategory=${subcategory}`)
    .join("");
  const url = `https://api.visitstockholm.com/api/public-v1/events/?format=json&categories=music${filter}`;
  const fetched = await fetch(url);
  const data = await fetched.json();
  const events = await data.results;
  mapIds(events);
  return events;
}

export async function fetchEventById(id: string): Promise<Event> {
  const url = `https://api.visitstockholm.com/api/public-v1/events/${id}/`;
  const fetched = await fetch(url);
  const data = await fetched.json();
  return await data;
}

export function getSchedule(event: Event): Date[] {
  return (
    event?.schedule.dates.map(
      (date) => new Date(`${date.date} ${date.start_time}`),
    ) ?? []
  );
}
