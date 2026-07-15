import { ensureError } from "@/lib/util";

// From (Roger, 2023).
export type Result<T, E extends Error = Error> =
  | { success: true; result: T }
  | { success: false; error: E };

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

export interface EventResponse {
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

export interface ScheduleItem {
  startTime: Date;
  endTime: Date;
}

interface fetchEventsProps {
  page?: number;
  size?: number;
  subcategories?: Subcategory[];
}

export async function fetchEvents({
  page = 1,
  size = 16,
  subcategories = [],
}: fetchEventsProps): Promise<Result<EventResponse[]>> {
  const filter = subcategories
    .map((subcategory) => `&subcategory=${subcategory}`)
    .join("");
  const url = `https://api.visitstockholm.com/api/public-v1/events/?format=json&page=${page}&size=${size}&categories=music${filter}`;

  try {
    const fetched = await fetch(url);
    const data = await fetched.json();
    const events = await data.results;
    mapIds(events);
    return { success: true, result: events };
  } catch (err) {
    const error = ensureError(err);
    return { success: false, error };
  }
}

export async function fetchEventById(
  id: string,
): Promise<Result<EventResponse>> {
  const url = `https://api.visitstockholm.com/api/public-v1/events/${id}/`;
  try {
    const fetched = await fetch(url);
    const data = await fetched.json();
    return { success: true, result: data };
  } catch (err) {
    const error = ensureError(err);
    return { success: false, error };
  }
}

export function getSchedule(event: EventResponse): ScheduleItem[] {
  return (
    event?.schedule.dates.map((date) => {
      const startTime = new Date(`${date.date} ${date.start_time}`);
      const endTime = new Date(`${date.date} ${date.end_time}`);
      return { startTime, endTime };
    }) ?? []
  );
}

export function getIdByUrl(url: string): string | undefined {
  return ids.get(url);
}

function mapIds(events: EventResponse[]): void {
  events.forEach((event) => ids.set(event.url, event.id));
}

const ids = new Map<string, string>();
