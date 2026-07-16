export type MusicSubcategory =
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

export interface Category {
  slug: string;
  title: string;
  icon: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  slug: string;
  title: string;
  has_events: boolean;
}

export interface EventsResponse {
  count: number;
  meta: { categories: Category[]; subcategories: Subcategory[] };
  next: number | null;
  previous: number | null;
  total_pages: number;
  current_page: number;
  results: EventResponse[];
}

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
  categories: {
    title: string;
    slug: string;
    subcategories: string;
  }[];
  schedule: {
    range: unknown;
    dates: {
      date: string;
      start_time: string;
      end_time: string;
    }[];
  };
  closest_station: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  externalWebsiteUrl: string;
  url: string;
  address: string;
  venueName: string;
  zipCode: string;
  city: string;
  schedule: ScheduleItem[];
  closestStation: string;
}

export interface EventsPage {
  count: number;
  next: number | null;
  previous: number | null;
  totalPages: number;
  currentPage: number;
  events: Event[];
}

export interface ScheduleItem {
  startTime: Date;
  endTime: Date;
}

export interface fetchEventsProps {
  page?: number;
  size?: number;
  subcategories?: MusicSubcategory[];
}
