import { subtractDays } from './date-helpers';

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

export const eventhasExpired = eventDate => Date.now() > eventDate;

export const maxAuctionDate = eventDate => subtractDays(eventDate, 4);
export const minAuctionDate = eventDate => subtractDays(eventDate, 5);
