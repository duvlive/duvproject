import React from 'react';
import TimeAgo from 'react-timeago';
import { format, parse } from 'date-fns';

/**
 * Date and Time
 * @param {*} date
 */
export const getShortDate = date => format(parse(date), 'ddd, MMM D YYYY');
export const getLongDate = date => format(parse(date), 'dddd, Do MMMM YYYY');
export const getTime = date => format(parse(date), 'h:mm A');
export const remainingDays = date => <TimeAgo date={date} />;
