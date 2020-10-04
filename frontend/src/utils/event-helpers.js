import { subtractDays } from './date-helpers';
import { parse, distanceInWordsToNow, isPast } from 'date-fns';
import { addHours } from 'date-fns';

/**
 * Event Helpers
 * @param {*} date
 */
export const auctionIsVoid = (eventDate) =>
  Date.now() > subtractDays(eventDate, 4);

export const userCanAddEntertainer = (eventDate) => {
  return Date.now() < subtractDays(eventDate, 3);
};
export const eventIsVoid = (eventDate) =>
  Date.now() >= subtractDays(eventDate, 2);

export const eventHasExpired = (eventDate) => isPast(eventDate);
export const maxAuctionDate = (eventDate) => subtractDays(eventDate, 4);
export const minAuctionDate = (eventDate) => subtractDays(eventDate, 5);

export const eventIsOngoing = (eventDate, eventDuration) => {
  const durationInHours = eventDuration.slice(0, 2);
  const eventEndTime = addHours(eventDate, durationInHours);
  return isPast(eventDate) && eventEndTime > Date.now();
};

export const dateDistance = (eventDate) => distanceInWordsToNow(eventDate);

export const groupEvents = (events) =>
  events.reduce(
    (result, event) => {
      if (event.cancelled) {
        result.cancelled.push(event);
      } else if (
        parse(event.eventDate).toDateString() === new Date().toDateString()
      ) {
        result.today.push(event);
      } else if (parse(event.eventDate) > Date.now()) {
        result.upcoming.push(event);
      } else {
        result.past.push(event);
      }
      return result;
    },
    { today: [], upcoming: [], past: [], cancelled: [] }
  );

export const defaultEvent = {
  userId: 0,
  eventType: null,
  eventDate: Date.now(),
  startTime: Date.now(),
  eventDuration: null,
  moreInformation: null,
  streetLine1: null,
  streetLine2: null,
  state: null,
  lga: null,
  city: null,
  landmark: null,
  description: null,
};

export const defaultEventEntertainer = {
  entertainerType: null,
  placeOfEvent: null,
  genre: null,
  language: null,
  expectedAudienceSize: null,
  ageGroup: null,
  lowestBudget: null,
  highestBudget: null,
  specialRequest: null,
  auctionStartDate: null,
  auctionEndDate: null,
  hireType: 'Auction',
  hiredDate: null,
  hiredEntertainer: null,
};
