import { Auction } from '../models';
import { validString } from '../utils';

const EventEntertainerController = {
  /**
   * create Event Auction
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  updateEventAuction(req, res) {
    const { startTime, eventDuration, minimumAmount, eventId, id } = req.body;

    const error = {
      ...validString(minimumAmount),
    };
    if (Object.keys(error).length > 1) {
      return res.status(400).json({ message: error.message.join('') });
    }
    if (!id) {
      return Auction.create({
        startTime,
        eventDuration,
        minimumAmount,
        eventId,
        userId: req.user.id,
      })
        .then(() => {
          return req.user.getEvents({
            where: { id: eventId },
            include: {
              model: Auction,
              as: 'auction',
            },
          });
        })
        .then((event) => {
          return res.status(200).json({
            message: 'Auction created successfully',
            event: event[0],
          });
        })
        .catch((error) => {
          const status = error.status || 500;
          const errorMessage =
            (error.parent && error.parent.detail) || error.message || error;
          return res.status(status).json({ message: errorMessage });
        });
    }
    return req.user
      .getEvents({
        where: { id: eventId },
        include: {
          model: Auction,
          as: 'auction',
        },
      })
      .then((event) => {
        if (event && event.length > 0) {
          return event[0].auction.update({
            startTime,
            eventDuration,
            minimumAmount,
          });
        }
        throw `No Event with id ${id}`;
      })
      .then((event) => {
        return res.status(200).json({
          message: 'Auction updated successfully',
          event,
        });
      })
      .catch((error) => {
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      });
  },

  /**
   * get EventAuctions
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getEventAuctions(req, res) {
    req.user
      .getEvents({
        include: {
          model: Auction,
          as: 'auction',
        },
      })
      .then((events) => {
        if (!events || events.length === 0) {
          return res.status(404).json({ message: 'Event Auctions not found' });
        }
        return res.status(200).json({ events });
      });
  },
};

export default EventEntertainerController;
