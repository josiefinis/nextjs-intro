import { ApiError, ensureError, Result } from "@/lib/errors";
import type {
  EventResponse,
  EventsResponse,
  Event,
  fetchEventsProps,
  ScheduleItem,
  Events,
} from "@/lib/types";
import { replaceHtmlEntities } from "@/lib/util";

const URL_API = "https://api.visitstockholm.com/api/public-v1";

async function apiFetch<T>(url: URL): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    const context = { status: res.status, url: res.url };
    throw new ApiError("Fetch failed", { context: context });
  }
  return await res.json();
}

export async function fetchEvents({
  page = 1,
  size = 16,
  subcategories = [],
}: fetchEventsProps): Promise<Result<Events>> {
  const url = new URL(`${URL_API}/events/?categories=music`);
  url.searchParams.append("page", String(page));
  url.searchParams.append("size", String(size));
  subcategories.forEach((subcategory) =>
    url.searchParams.append("subcategory", String(subcategory)),
  );

  try {
    const data: EventsResponse = await apiFetch(url);
    const eventsPage: Events = toEvents(data);
    mapIds(eventsPage.events);
    return { success: true, result: eventsPage };
  } catch (err) {
    const error = ensureError(err);
    if (error instanceof ApiError) {
      return { success: false, error };
    }
    throw error;
  }
}

export async function fetchEventById(id: string): Promise<Result<Event>> {
  const url = new URL(`${URL_API}/events/${id}/`);

  try {
    const data: EventResponse = await apiFetch(url);
    const event: Event = toEvent(data);
    return { success: true, result: event };
  } catch (err) {
    const error = ensureError(err);
    if (error instanceof ApiError) {
      return { success: false, error };
    }
    throw error;
  }
}

function toEvent(data: Partial<EventResponse>): Event {
  const {
    id = "",
    title = { en: "" },
    description = { en: "" },
    external_website_url = "",
    url = "",
    address = "",
    venue_name = "",
    zip_code = "",
    city = "",
    schedule = { dates: [] },
    closest_station = "",
  } = data;

  return {
    title: title.en,
    description: replaceHtmlEntities(description.en),
    externalWebsiteUrl: external_website_url,
    venueName: venue_name,
    zipCode: zip_code,
    closestStation: closest_station,
    schedule: getSchedule(schedule.dates),
    ...{ id, url, address, city },
  };
}

function toEvents(data: Partial<EventsResponse>): Events {
  const {
    count = 0,
    next = null,
    previous = null,
    total_pages = 0,
    current_page = 1,
    results = [],
  } = data;

  return {
    totalPages: total_pages,
    currentPage: current_page,
    events: results.map((d) => toEvent(d)),
    ...{ count, next, previous },
  };
}

export function getSchedule(
  dates: { date: string; start_time: string; end_time: string }[],
): ScheduleItem[] {
  return (
    dates.map((date) => {
      const startTime = new Date(`${date.date} ${date.start_time}`);
      const endTime = new Date(`${date.date} ${date.end_time}`);
      if (endTime < startTime) {
        endTime.setDate(endTime.getDate() + 1);
      }
      return { startTime, endTime };
    }) ?? []
  );
}

export function getIdByUrl(url: string): string | undefined {
  return ids.get(url);
}

function mapIds(events: Event[]): void {
  events.forEach((event) => ids.set(event.url, event.id));
}

const ids = new Map<string, string>();
