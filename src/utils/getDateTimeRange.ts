/**
 * Splits event response start and end times into separate date and time strings
 * @param start the `starts_at` timestring
 * @param end the `ends_at` timestring
 * @returns An object containing start and end date and times.
 */
export function getDateTimeRange(start: string, end: string): Record<string, unknown> {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const dateOption: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
  const timeOption: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZoneName: 'short',
  };

  const startTime = startDate.toLocaleTimeString('en-US', timeOption);
  const endTime = endDate.toLocaleTimeString('en-US', timeOption);

  return {
    startDate: startDate.toLocaleDateString('en-US', dateOption),
    endDate: endDate.toLocaleDateString('en-US', dateOption),
    startTime: startTime,
    endTime: endTime,
    timeRange: `${startTime} - ${endTime} timezone`,
  };
}
