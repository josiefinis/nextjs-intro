import data from "@/data/events.json";

export function getEventById(id: string) {
  return data.results.find((event) => event.id === id);
}
