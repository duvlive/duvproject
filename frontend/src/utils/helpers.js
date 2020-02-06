import React from 'react';
import TimeAgo from 'react-timeago';
import { format, parse } from 'date-fns';
import { ENTERTAINER_TYPE } from './constants';

/**
 * Carousel Chunk
 * @param {*} array
 * @param {*} size
 */
export const chunk = (array, size) => {
  const chunked_arr = [];
  let index = 0;
  while (index < array.length) {
    chunked_arr.push(array.slice(index, size + index));
    index += size;
  }
  return chunked_arr;
};

/**
 * Item Selection
 * @param {*} items
 */
export const randomItem = items =>
  items[Math.floor(Math.random() * items.length)];

export const getItems = (items, end) => {
  // The slice() method returns a shallow copy of a portion of an array into a new array object selected from begin to end (end not included). The original array will not be modified.
  return items.slice(0, end);
};

export const shuffleItems = items => {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
};

/**
 * Slugs
 * @param {*} items
 * @param {*} slug
 */

export const getSlug = (items, slug) =>
  items.filter(item => item.slug === slug)[0];

export const getOtherSlugs = (items, slug) =>
  items.filter(item => item.slug !== slug);

export const getRelatedEntertainers = (items, slug, type) =>
  items.filter(item => item.slug !== slug && item.type === type);

/**
 * Date and Time
 * @param {*} date
 */
export const getShortDate = date => format(parse(date), 'ddd, MMM D YYYY');
export const getLongDate = date => format(parse(date), 'dddd, Do MMMM YYYY');
export const remainingDays = date => <TimeAgo date={date} />;
export const range = (start, stop, step = 1) => {
  const len = Math.floor((stop - start) / step) + 1;
  return Array(len)
    .fill()
    .map((_, idx) => start + idx * step);
};
/**
 * Create HTML Markup
 * @param {*} text
 */
export const createMarkup = text => ({ __html: text });

export const dashedLowerCase = text =>
  text &&
  text
    .toString()
    .replace(/\s+/g, '-')
    .toLowerCase();

export const selectEntertainerType = () => {
  const select = [];
  for (const property in ENTERTAINER_TYPE) {
    select.push({ value: property, label: ENTERTAINER_TYPE[property] });
  }
  return select;
};
