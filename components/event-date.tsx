const shortDateTime = Intl.DateTimeFormat("en-UK", {
  weekday: "short",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
});

function isDate(variable: Date | undefined): variable is Date {
  if (!variable) return false;
  try {
    variable.toISOString();
    return true;
  } catch {
    return false;
  }
}

interface DateProps {
  date: Date | undefined;
  format?: Intl.DateTimeFormat;
  className?: string;
}

export default function EventDate({
  date,
  format = shortDateTime,
  className,
}: DateProps) {
  return isDate(date) ? (
    <time dateTime={date.toISOString()} className={className}>
      {format.format(date)}
    </time>
  ) : (
    <p className={className}>TBD</p>
  );
}
