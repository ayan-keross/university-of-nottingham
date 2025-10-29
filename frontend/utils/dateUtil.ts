import moment from "moment";

/**
 * Formats a given date into a readable string.
 * @param date - Date, string, or number (timestamp)
 * @param format - Desired format (default: 'YYYY-MM-DD HH:mm:ss')
 */
export const formatDate = (
  date: Date | string | number,
  format: string = "YYYY-MM-DD HH:mm:ss"
): string => {
  return moment(date).format(format);
};

/**
 * Returns the current date/time in a specific format.
 * @param format - Desired format (default: 'YYYY-MM-DD HH:mm:ss')
 */
export const getCurrentDateTime = (format: string = "YYYY-MM-DD HH:mm:ss"): string => {
  return moment().format(format);
};

/**
 * Calculates the difference between two dates in the given unit.
 * @param start - Start date
 * @param end - End date
 * @param unit - Unit of difference ('days', 'hours', 'minutes', etc.)
 */
export const dateDiff = (
  start: Date | string | number,
  end: Date | string | number,
  unit: moment.unitOfTime.Diff = "days"
): number => {
  return moment(end).diff(moment(start), unit);
};

/**
 * Adds or subtracts time from a date.
 * @param date - Base date
 * @param amount - Amount to add (negative to subtract)
 * @param unit - Unit of time ('days', 'hours', etc.)
 */
export const addToDate = (
  date: Date | string | number,
  amount: number,
  unit: moment.unitOfTime.DurationConstructor = "days"
): string => {
  return moment(date).add(amount, unit).format("YYYY-MM-DD HH:mm:ss");
};

/**
 * Checks if a given date is today.
 * @param date - Date to check
 */
export const isToday = (date: Date | string | number): boolean => {
  return moment(date).isSame(moment(), "day");
};
