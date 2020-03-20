import { subtractDays } from './date-helpers';
import { parse, distanceInWordsToNow, isPast } from 'date-fns';

/**
 * Event Helpers
 * @param {*} date
 */
export const auctionIsVoid = eventDate =>
  Date.now() > subtractDays(eventDate, 4);

export const userCanAddEntertainer = eventDate =>
  Date.now() < subtractDays(eventDate, 3);

export const eventIsVoid = eventDate =>
  Date.now() >= subtractDays(eventDate, 2);

export const eventHasExpired = eventDate => isPast(eventDate);
export const maxAuctionDate = eventDate => subtractDays(eventDate, 4);
export const minAuctionDate = eventDate => subtractDays(eventDate, 5);

export const dateDistance = eventDate => distanceInWordsToNow(eventDate);

export const groupEvents = events =>
  events.reduce(
    (result, event) => {
      if (parse(event.eventDate).toDateString() === new Date().toDateString()) {
        result.today.push(event);
      } else if (parse(event.eventDate) > Date.now()) {
        result.upcoming.push(event);
      } else {
        result.past.push(event);
      }
      return result;
    },
    { today: [], upcoming: [], past: [] }
  );
