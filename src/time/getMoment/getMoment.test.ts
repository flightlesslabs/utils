// getMoment.test.ts
import { describe, it, expect } from 'vitest';
import getMoment from './getMoment';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetweenPlugin from 'dayjs/plugin/isBetween.js';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.extend(isBetweenPlugin);

describe('getMoment', () => {
  it('should return local time by default', () => {
    const result = getMoment('2025-01-01T12:00:00Z');
    expect(result.isUTC()).toBe(false);
    expect(result.format()).toBe(dayjs('2025-01-01T12:00:00Z').format());
  });

  it('should return UTC time when utc setting is true', () => {
    const result = getMoment('2025-01-01T12:00:00Z', undefined, { utc: true });
    expect(result.isUTC()).toBe(true);
    expect(result.format()).toBe(dayjs.utc('2025-01-01T12:00:00Z').format());
  });

  it('should return time in specified timezone', () => {
    const result = getMoment('2025-01-01T12:00:00Z', undefined, { timezone: 'Asia/Kolkata' });
    expect(result.format()).toBe(dayjs.tz('2025-01-01T12:00:00Z', 'Asia/Kolkata').format());
  });

  it('should parse using custom format', () => {
    const dateStr = '01-01-2025';
    const format = 'DD-MM-YYYY';
    const result = getMoment(dateStr, format);
    expect(result.format('YYYY-MM-DD')).toBe('2025-01-01');
  });

  it('should use current date/time when no date is provided', () => {
    const before = dayjs();
    const result = getMoment();
    const after = dayjs();
    expect(result.isBetween(before, after, 'second', '[]')).toBe(true);
  });
});
