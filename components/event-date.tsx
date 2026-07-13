const longDate = Intl.DateTimeFormat("en-UK", {
  weekday: "short",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
});

function isDate(variable: Date | undefined): variable is Date {
  try {
    variable?.toISOString();
    return true;
  } catch {
    return false;
  }
}

interface DateProps {
  date: Date | undefined;
  className?: string;
}

export default function EventDate({ date, className }: DateProps) {
  return isDate(date) ? (
    <time dateTime={date.toISOString()} className={className}>
      {longDate.format(date)}
    </time>
  ) : (
    <p className={className}>TBD</p>
  );
}
