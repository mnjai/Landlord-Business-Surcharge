/** Real IANA zones, so daylight saving handles itself. */
export const TRINIDAD_TZ = "America/Port_of_Spain";
export const NEW_YORK_TZ = "America/New_York";
export const LONDON_TZ = "Europe/London";

export function formatZoneTime(date: Date, timeZone: string): string {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch {
    return "—";
  }
}

/** Resolves the visitor's own time zone from the browser. Call client-side only. */
export function getVisitorTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return TRINIDAD_TZ;
  }
}

/** Short, human label for a zone the visitor recognises, e.g. "New York". */
export function zoneShortLabel(timeZone: string): string {
  const city = timeZone.split("/").pop() ?? timeZone;
  return city.replace(/_/g, " ");
}
