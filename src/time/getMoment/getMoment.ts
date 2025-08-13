import type { ConfigType } from 'dayjs';
import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc.js';
import timezonePlugin from 'dayjs/plugin/timezone.js';
import customParseFormatPlugin from 'dayjs/plugin/customParseFormat.js';
import isBetweenPlugin from 'dayjs/plugin/isBetween.js';

// Extend dayjs with required plugins once
dayjs.extend(utcPlugin);
dayjs.extend(timezonePlugin);
dayjs.extend(customParseFormatPlugin);
dayjs.extend(isBetweenPlugin);

/**
 * Represents a `dayjs` instance with all configured plugins applied.
 */
export type DayjsInstance = ReturnType<typeof dayjs>;

/**
 * Acceptable input types for the {@link getMoment} function, compatible with `dayjs`.
 */
export type GetMomentDate = ConfigType;

/**
 * Optional formatting string used to parse the date.
 */
export type GetMomentFormat = string | undefined;

/**
 * Settings to control how the date/time is returned.
 */
export interface GetMomentSettings {
  /**
   * Timezone identifier (e.g., `"America/New_York"`).
   */
  timezone?: string;

  /**
   * Whether to return the time in UTC.
   *
   * If `true`, overrides {@link GetMomentSettings.timezone}.
   */
  utc?: boolean;
}

/**
 * Creates a `dayjs` instance with optional format parsing, timezone handling, or UTC output.
 *
 * This is a thin wrapper around [`dayjs`](https://day.js.org/) that adds:
 * - Parsing with custom formats
 * - Timezone conversion
 * - UTC mode
 *
 * @group Time
 *
 * @param date - The input date, timestamp, or string to parse.
 * @param format - Optional format string to assist parsing.
 * @param settings - Optional settings to control timezone or UTC output.
 * @returns A `dayjs` instance in local time, UTC, or the specified timezone.
 *
 * @remarks
 * - Requires the `utc`, `timezone`, and `customParseFormat` plugins (already preconfigured).
 * - If `utc` is `true`, the `timezone` setting is ignored.
 *
 * @example
 * **Import:**
 * ```ts
 * import { getMoment } from "@flightlesslabs/utils";
 * ```
 *
 * @example
 * **Basic output:**
 * ```ts
 * import { getMoment } from "@flightlesslabs/utils";
 *
 * const basicTime = getMoment();
 * console.log(utcTime.format('DD-MM-YYYY)); // "01-02-2025"
 * ```
 *
 * @example
 * **UTC output:**
 * ```ts
 * import { getMoment } from "@flightlesslabs/utils";
 *
 * const utcTime = getMoment("2025-01-01T12:00:00Z", undefined, { utc: true });
 * console.log(utcTime.format()); // "2025-01-01T12:00:00Z"
 * ```
 *
 * @example
 * **Timezone output:**
 * ```ts
 * import { getMoment } from "@flightlesslabs/utils";
 *
 * const kolkataTime = getMoment("01-01-2025", "DD-MM-YYYY", { timezone: "Asia/Kolkata" });
 * console.log(kolkataTime.format()); // "2025-01-01T00:00:00+05:30"
 * ```
 */
export default function getMoment(
  date?: GetMomentDate,
  format?: GetMomentFormat,
  settings?: GetMomentSettings,
): DayjsInstance {
  const { timezone, utc } = settings || {};

  if (utc) {
    return dayjs.utc(date, format);
  }

  if (timezone) {
    return format !== undefined ? dayjs.tz(date, format, timezone) : dayjs.tz(date, timezone);
  }

  return dayjs(date, format);
}
