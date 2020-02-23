import { EventEntertainer } from '../models';
import { validString } from '../utils';

const EventEntertainerController = {
  /**
   * create Event Entertainer
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  updateEventEntertainer(req, res) {
    const {
      entertainerType,
      placeOfEvent,
      genre,
      language,
      expectedAudienceSize,
      ageGroup,
      lowestBudget,
      highestBudget,
      specialRequest,
      eventId,
      id,
      auctionStartDate,
      auctionEndDate
    } = req.body;

    const error = {
      ...validString(entertainerType),
      ...validString(placeOfEvent),
      ...validString(genre),
      ...validString(language),
      ...validString(expectedAudienceSize),
      ...validString(ageGroup),
      ...validString(lowestBudget),
      ...validString(highestBudget),
      ...validString(specialRequest)
    };
    if (Object.keys(error).length > 1) {
      return res.status(400).json({ message: error.message.join('') });
    }
    if (!id) {
      return EventEntertainer.create({
        entertainerType,
        placeOfEvent,
        genre,
        language,
        expectedAudienceSize,
        ageGroup,
        lowestBudget,
        highestBudget,
        specialRequest,
        eventId,
        auctionStartDate,
        auctionEndDate,
        userId: req.user.id
      })
        .then(() => {
          return req.user.getEvents({
            where: { id: eventId },
            include: {
              model: EventEntertainer,
              as: 'entertainers'
            }
          });
        })
        .then(event => {
          return res.status(200).json({
            message: 'Event Entertainer created successfully',
            event: event[0]
          });
        })
        .catch(error => {
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
          model: EventEntertainer,
          as: 'entertainers',
          where: { id }
        }
      })
      .then(event => {
        if (event && event.length > 0) {
          return event[0].entertainers[0].update({
            entertainerType,
            placeOfEvent,
            genre,
            language,
            expectedAudienceSize,
            ageGroup,
            lowestBudget,
            highestBudget,
            specialRequest
          });
        }
        throw `No Event with id ${id}`;
      })
      .then(event => {
        return res.status(200).json({
          message: 'Event Entertainer updated successfully',
          event
        });
      })
      .catch(error => {
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      });
  },

  /**
   * get EventEntertainers
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getEventEntertainers(req, res) {
    req.user
      .getEvents({
        include: {
          model: EventEntertainer,
          as: 'entertainers'
        }
      })
      .then(events => {
        if (!events || events.length === 0) {
          return res
            .status(404)
            .json({ message: 'Event Entertainers not found' });
        }
        return res.status(200).json({ events });
      });
  }
};

export default EventEntertainerController;
