import { Application, Event, EventEntertainer, User } from '../models';
import { validString } from '../utils';
import { USER_TYPES } from '../constant';

const ApplicationController = {
  /**
   * create Application
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  entertainerApplication(req, res) {
    const { status, askingPrice, eventId, eventEntertainerId, id } = req.body;

    const error = {
      ...validString(status),
      ...validString(askingPrice)
    };
    if (Object.keys(error).length > 1) {
      return res.status(400).json({ message: error.message.join('') });
    }
    let newApplication = {};
    if (!id) {
      return Application.create({
        status,
        askingPrice,
        eventId,
        eventEntertainerId,
        userId: req.user.id
      })
        .then(application => {
          newApplication = application;
          return req.user.addApplication(application);
        })
        .then(() => {
          return res.status(200).json({
            message: 'Application created successfully',
            application: newApplication
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
      .getApplications({ where: { id } })
      .then(applications => {
        if (applications && applications.length > 0) {
          if (req.user.type === USER_TYPES.ADMINISTRATOR) {
            return applications[0].update({
              status
            });
          }
          return applications[0].update({
            askingPrice
          });
        }
        throw `No Application with id ${id}`;
      })
      .then(event => {
        return res.status(200).json({
          message: 'Application updated successfully',
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
   * get Application
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getEntertainerApplications(req, res) {
    req.user.getEvents().then(applications => {
      if (!applications || applications.length === 0) {
        return res.status(404).json({ message: 'Application not found' });
      }
      return res.status(200).json({ applications });
    });
  },

  /**
   * get Entertainers Bids
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getEntertainerBids(req, res) {
    return req.user
      .getApplications({
        where: {
          applicationType: 'Bid'
        },
        include: [
          {
            model: Event,
            as: 'event',
            include: [
              {
                model: User,
                as: 'owner',
                attributes: ['id', 'firstName', 'lastName', 'profileImageURL']
              }
            ]
          },
          {
            model: EventEntertainer,
            as: 'eventEntertainerInfo'
          }
        ]
      })
      .then(events => {
        if (!events || events.length === 0) {
          return res.status(404).json({ message: 'Event not found' });
        }
        return res.status(200).json({ events });
      });
  }
};

export default ApplicationController;
