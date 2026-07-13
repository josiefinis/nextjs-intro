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
