import { ApiError, ensureError, Result } from "@/lib/errors";
import type {
  EventResponse,
  EventsResponse,
  fetchEventsProps,
  ScheduleItem,
} from "@/lib/types";

async function apiFetch(url: string): Promise<EventResponse | EventsResponse> {
  const res = await fetch(url);
  if (!res.ok) {
    const context = { status: res.status, url: res.url };
    throw new ApiError("Fetch failed", { context: context });
  }
  const data = await res.json();
  console.log(data);
  return data;
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
    const data = (await apiFetch(url)) as EventsResponse;
    const events = data.results;
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
    const data = (await apiFetch(url)) as EventResponse;
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
