import data from "@/data/events.json";

export function getEventById(id: string) {
  return data.results.find((event) => event.id === id);
}

export function getSchedule(id: string): Date[] {
  const event = data.results.find((event) => event.id === id);
  return (
    event?.schedule.dates.map(
      (date) => new Date(`${date.date} ${date.start_time}`),
    ) ?? []
  );
}

export function getEvents() {
  return data.results;
}

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

interface Event {
  id: string;
  title: { en: string; sv: string };
  description: string;
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
    closest_station: "string";
  };
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
  return await data.results;
}
