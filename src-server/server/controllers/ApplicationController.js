import { Op } from 'sequelize';
import {
  Application,
  Event,
  EventEntertainer,
  User,
  EntertainerProfile,
  Commission
} from '../models';
import sendMail from '../MailSender';
import { validString, moneyFormat } from '../utils';
import { USER_TYPES } from '../constant';
import EMAIL_CONTENT from '../email-template/content';

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
      .then(bids => {
        if (!bids || bids.length === 0) {
          return res.status(404).json({ message: 'Event not found' });
        }
        return res.status(200).json({ bids });
      });
  },

  /**
   * Get application for valid entertainer only
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */

  getOneApplication(req, res) {
    const id = req.params.id;
    const userId = req.user.id;

    if (!id) {
      return res.status(404).json({
        message: 'Application Id needed to approve application'
      });
    }

    Application.findOne({
      where: { id, userId },
      include: [
        {
          model: EventEntertainer,
          as: 'eventEntertainerInfo',
          include: {
            model: Event,
            as: 'event',
            include: [
              {
                model: User,
                as: 'owner',
                attributes: ['id', 'firstName', 'lastName']
              }
            ]
          }
        },
        {
          model: Commission,
          as: 'commission'
        }
      ]
    })
      .then(application => {
        if (!application) {
          return res.status(404).json({ message: 'Application not found' });
        }
        return res.json({ application });
      })
      .catch(error => {
        const errorMessage = error.message || error;
        return res.status(412).json({ message: errorMessage });
      });
  },

  /**
   * Approve Application
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  approveAuctionsApplication(req, res) {
    // const currentDate = Date.now();
    const id = req.params.applicationId;

    if (!id) {
      return res.status(404).json({
        message: 'Application Id needed to approve application'
      });
    }

    Application.findOne({
      where: { id },
      include: [
        {
          model: EventEntertainer,
          as: 'eventEntertainerInfo',
          include: {
            model: Event,
            as: 'event'
          }
        },
        {
          model: User,
          as: 'user',
          attributes: ['email'],
          include: [
            {
              model: EntertainerProfile,
              as: 'profile',
              attributes: ['id', 'stageName']
            }
          ]
        }
      ]
    })
      .then(application => {
        const currentDate = Date.now();
        const eventEntertainerId = application.eventEntertainerId;
        // for email
        const EMAIL_PARAMS = {
          askingPrice: moneyFormat(application.askingPrice),
          entertainerName: application.user.profile.stageName,
          entertainerEmail: application.user.email,
          eventType: application.eventEntertainerInfo.event.eventType,
          eventPlace: application.eventEntertainerInfo.placeOfEvent,
          eventDate: application.eventEntertainerInfo.event.eventDate,
          eventStart: application.eventEntertainerInfo.event.startTime,
          eventDuration: application.eventEntertainerInfo.event.eventDuration,
          eventStreetLine1: application.eventEntertainerInfo.event.streetLine1,
          eventStreetLine2: application.eventEntertainerInfo.event.streetLine2,
          eventState: application.eventEntertainerInfo.event.state,
          eventLga: application.eventEntertainerInfo.event.lga,
          eventCity: application.eventEntertainerInfo.event.city
        };

        if (!application) {
          return res.status(404).json({ message: 'Application not found' });
        }

        // application has previously been approved
        if (application.status === 'Approved') {
          return res.status(400).json({
            message: 'This application has already been approved'
          });
        }

        // can only approve applications without hiredEntertainer
        if (application.eventEntertainerInfo.hiredEntertainer) {
          return res.status(400).json({
            message: 'You have hired an entertainer for this request.'
          });
        }

        // for Auctions, only owners of events can approve an application
        if (
          application.eventEntertainerInfo.hireType === 'Auction' &&
          application.eventEntertainerInfo.userId !== req.user.id
        ) {
          return res.status(400).json({
            message: 'Only event owners can approve a bid application'
          });
        }

        // updated approved application
        return Application.update(
          { status: 'Approved', approvedDate: currentDate },
          {
            where: {
              id
            }
          }
        ).then(() => {
          // add approved entertainer to evententertainer
          EventEntertainer.update(
            {
              hiredEntertainer: application.user.profile.id,
              hiredDate: currentDate
            },
            {
              where: {
                id: eventEntertainerId
              }
            }
          ).then(() =>
            Application.update(
              // reject other bids
              {
                status: 'Rejected',
                rejectionDate: currentDate,
                rejectionReason: 'Application not selected'
              },
              {
                where: {
                  id: { [Op.ne]: id },
                  eventEntertainerId: application.eventEntertainerInfo.id
                }
              }
            ).then(() => {
              // Send Email to approved entertainer
              sendAuctionMail(EMAIL_PARAMS);
              res.json({
                message:
                  'Entertainer Application has been successfully approved'
              });
            })
          );
        });
      })
      .catch(error => {
        const errorMessage = error.message || error;
        return res.status(412).json({ message: errorMessage });
      });
  }
};

const sendAuctionMail = params => {
  // Build Email
  const contentTop = `Congratulations!!! Your bid of  NGN ${params.askingPrice} has been approved. Once payment has been made, then your application has been confirmed. You can find the details of the event below.`;
  const contentBottom = `
    <strong>Event:</strong> ${params.eventType} <br>
    <strong>Place:</strong> ${params.eventPlace} <br>
    <strong>Date:</strong> ${params.eventDate} <br>
    <strong>Start Time:</strong> ${params.eventStart} <br>
    <strong>Duration:</strong> ${params.eventDuration} <br>
    <strong>Street Line 1:</strong> ${params.eventStreetLine1} <br>
    <strong>Street Line 2:</strong> ${params.eventStreetLine2} <br>
    <strong>State:</strong> ${params.eventState} <br>
    <strong>LGA:</strong> ${params.eventLga} <br>
    <strong>City:</strong> ${params.eventCity} <br>
  `;
  sendMail(
    EMAIL_CONTENT.APPROVED_BID,
    { email: params.entertainerEmail },
    {
      firstName: params.entertainerName,
      title: `Your Bid of NGN ${params.askingPrice} has been approved`,
      link: '#',
      contentTop,
      contentBottom
    }
  );
};

export default ApplicationController;
