import { Event } from '../models';
import { validString } from '../utils';
import { EventEntertainer, User, EntertainerProfile } from '../models';

const EventController = {
  /**
   * create Event
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  updateUserEvent(req, res) {
    const {
      eventType,
      eventDate,
      startTime,
      endTime,
      moreInformation,
      streetLine1,
      streetLine2,
      state,
      lga,
      city,
      landmark,
      description,
      id
    } = req.body;

    const error = {
      ...validString(eventType),
      ...validString(eventDate),
      ...validString(startTime),
      ...validString(endTime),
      ...validString(moreInformation),
      ...validString(streetLine1),
      ...validString(streetLine2),
      ...validString(state),
      ...validString(lga),
      ...validString(city),
      ...validString(landmark),
      ...validString(description)
    };
    if (Object.keys(error).length > 1) {
      return res.status(400).json({ message: error.message.join('') });
    }
    let newEvent = {};
    if (!id) {
      return Event.create({
        eventType,
        eventDate,
        startTime,
        endTime,
        moreInformation,
        streetLine1,
        streetLine2,
        state,
        lga,
        city,
        landmark,
        description,
        userId: req.user.id
      })
        .then(event => {
          newEvent = event;
          return req.user.addEvent(event);
        })
        .then(() => {
          return res.status(200).json({
            message: 'Event created successfully',
            event: newEvent
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
      .getEvents({ where: { id } })
      .then(events => {
        if (events && events.length > 0) {
          return events[0].update({
            eventType,
            eventDate,
            startTime,
            endTime,
            moreInformation,
            streetLine1,
            streetLine2,
            state,
            lga,
            city,
            landmark,
            description
          });
        }
        throw `No Event with id ${id}`;
      })
      .then(event => {
        return res.status(200).json({
          message: 'Event updated successfully',
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
   * event one details
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getOneEvent(req, res) {
    const eventId = req.params.id;
    if (!eventId) {
      return res.status(400).json({ message: 'Kindly provide an event id' });
    }
    Event.findOne({
      where: { id: eventId },
      include: [
        {
          model: EventEntertainer,
          as: 'entertainers',
          include: [
            {
              model: EntertainerProfile,
              as: 'entertainer',
              attributes: [
                'id',
                'stageName',
                'entertainerType',
                'location',
                'about'
              ],
              include: [
                {
                  model: User,
                  as: 'personalDetails',
                  attributes: ['id', 'firstName', 'lastName', 'profileImageURL']
                }
              ]
            }
          ]
        },
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'firstName', 'lastName']
        }
      ]
    })
      .then(event => {
        if (!event) {
          return res.status(404).json({ message: 'Event not found' });
        }

        return res.json({ event });
      })
      .catch(error => {
        return res.status(500).json({ message: error.message });
      });
  },

  /**
   * get Event
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getUserEvent(req, res) {
    req.user.getEvents().then(events => {
      if (!events || events.length === 0) {
        return res.status(404).json({ message: 'Event not found' });
      }
      return res.status(200).json({ events });
    });
  }
};

export default EventController;
