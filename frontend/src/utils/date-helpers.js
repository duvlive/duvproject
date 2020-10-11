import React from 'react';
import TimeAgo from 'react-timeago';
import {
  format,
  parse,
  getTime as getElapsedTime,
  subDays,
  getHours,
  differenceInCalendarDays,
} from 'date-fns';

/**
 * Date and Time
 * @param {*} date
 */
export const getDateTime = (date) =>
  format(parse(date), 'ddd, MMM D, YYYY h:mm A');
export const getEventDate = (date) => format(parse(date), 'MMM. D (ddd)');
export const getShortDate = (date) => format(parse(date), 'ddd, MMM D, YYYY');
export const getTinyDate = (date) => format(parse(date), 'MMM D, YYYY');
export const getLongDate = (date) => format(parse(date), 'dddd, Do MMMM YYYY');
export const getYear = (date) => format(parse(date), 'YYYY');
export const getTime = (date) => format(parse(date), 'h:mm A');
export const getDBDate = (date) => format(parse(date), 'YYYY-MM-DD');
export const remainingDays = (date) => <TimeAgo date={date} />;
export const subtractDays = (date, numOfDays) =>
  getElapsedTime(subDays(date, numOfDays));
export const getTimeOfDay = (date) => {
  const hour = getHours(date);
  return (
    (hour < 12 && 'Morning') ||
    (hour < 16 && 'Afternoon') ||
    (hour < 19 && 'Evening') ||
    'Night'
  );
};
export const getNumberOfDaysToEvent = (eventDate) =>
  parse(eventDate) > Date.now() &&
  differenceInCalendarDays(eventDate, Date.now()) + ' days';

export const getPublicEventDate = (startTime, endTime) => {
  const startDate = getShortDate(startTime);
  const endDate = getShortDate(endTime);
  const sameDay = startDate === endDate;

  const sameDayFormat = `${format(parse(startTime), 'ddd, MMM. D')}`;
  const differentDayFormat = `${format(
    parse(startTime),
    'ddd, MMM. D'
  )} - ${format(parse(endTime), 'ddd, MMM. D')}`;

  return sameDay ? sameDayFormat : differentDayFormat;
};
