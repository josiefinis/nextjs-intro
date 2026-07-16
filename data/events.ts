import { ApiError, ensureError, Result } from "@/lib/errors";
import type {
  EventResponse,
  EventsResponse,
  Event,
  fetchEventsProps,
  ScheduleItem,
  EventsPage,
} from "@/lib/types";
import { replaceHtmlEntities } from "@/lib/util";

async function apiFetch(url: string): Promise<EventResponse | EventsResponse> {
  const res = await fetch(url);
  if (!res.ok) {
    const context = { status: res.status, url: res.url };
    throw new ApiError("Fetch failed", { context: context });
  }
  const data = await res.json();
  return data;
}

export async function fetchEvents({
  page = 1,
  size = 16,
  subcategories = [],
}: fetchEventsProps): Promise<Result<EventsPage>> {
  const filter = subcategories
    .map((subcategory) => `&subcategory=${subcategory}`)
    .join("");
  const url = `https://api.visitstockholm.com/api/public-v1/events/?format=json&page=${page}&size=${size}&categories=music${filter}`;

  try {
    const data: EventsResponse = (await apiFetch(url)) as EventsResponse;
    const eventsPage: EventsPage = toEventsPage(data);
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
  const url = `https://api.visitstockholm.com/api/public-v1/events/${id}/`;

  try {
    let data: EventResponse = (await apiFetch(url)) as EventResponse;
    data = initEventResponse(data);
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

function toEventsPage(data: EventsResponse): EventsPage {
  return {
    count: data.count,
    next: data.next,
    previous: data.previous,
    totalPages: data.total_pages,
    currentPage: data.current_page,
    events: data.results
      .map((d) => initEventResponse(d))
      .map((d) => toEvent(d)),
  };
}

function toEvent(data: EventResponse): Event {
  return {
    id: data.id,
    title: data.title.en,
    description: replaceHtmlEntities(data.description.en),
    externalWebsiteUrl: data.external_website_url,
    url: data.url,
    address: data.address,
    venueName: data.venue_name,
    zipCode: data.zip_code,
    city: data.city,
    schedule: getSchedule(data.schedule.dates),
    closestStation: data.closest_station,
  };
}

function initEventResponse(options?: Partial<EventResponse>): EventResponse {
  const defaults = {
    id: "",
    title: { en: "", sv: "" },
    description: { en: "", sv: "" },
    external_website_url: "",
    url: "",
    address: "",
    venue_name: "",
    zip_code: "",
    city: "",
    location: {
      latitude: 0,
      longitude: 0,
    },
    created_at: "",
    modified_at: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    categories: [
      {
        title: "",
        slug: "",
        subcategories: "",
      },
    ],
    schedule: {
      range: null,
      dates: [
        {
          date: "",
          start_time: "",
          end_time: "",
        },
      ],
    },
    closest_station: "",
  };
  return {
    ...defaults,
    ...options,
  };
}

export function getSchedule(
  dates: { date: string; start_time: string; end_time: string }[],
): ScheduleItem[] {
  return (
    dates.map((date) => {
      const startTime = new Date(`${date.date} ${date.start_time}`);
      const endTime = new Date(`${date.date} ${date.end_time}`);
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
