import axios from 'axios';
import crypto from 'crypto';
import {
  Application,
  BankDetail,
  EntertainerProfile,
  Event,
  EventEntertainer,
  Notification,
  Payment,
  User,
} from '../models';
import {
  validString,
  getAll,
  getShortDate,
  moneyFormat,
  encodeAccountNumber,
} from '../utils';
import { NOTIFICATIONS, NOTIFICATION_TYPE } from '../constant';
import sendMail from '../MailSender';
import EMAIL_CONTENT from '../email-template/content';
import { Op } from 'sequelize';
import { sendSMS } from '../SMSSender';

const PaymentController = {
  async initializeTransaction(req, res) {
    const { amount, applicationId } = req.body;
    const { email } = req.user;

    if (!amount || !applicationId) {
      return res
        .status(400)
        .json({ message: 'Application ID and Amount needed to process' });
    }

    try {
      // ensure that payment can be made
      const application = await Application.findOne({
        where: { id: applicationId },
        include: [
          {
            model: EventEntertainer,
            as: 'eventEntertainerInfo',
          },
        ],
      });

      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }

      // application has previously been approved
      if (application.status === 'Paid') {
        return res.status(400).json({
          application,
          message: 'This application has already been marked as paid',
        });
      }

      // can only approve applications without hiredEntertainer
      if (application.eventEntertainerInfo.hiredEntertainer) {
        return res.status(400).json({
          message: 'You have hired an entertainer for this request.',
        });
      }
    } catch (error) {
      const status = error.status || 500;
      const errorMessage = error.message || error;
      return res.status(status).json({ message: errorMessage });
    }

    axios
      .post(
        `${process.env.PAYSTACK_TRANSACT_INIT}`,
        {
          amount: amount * 100,
          callback_url: `${process.env.HOST}/payment`,
          email,
          metadata: {
            custom_fields: [
              {
                display_name: 'Application ID',
                variable_name: 'Application ID',
                value: applicationId,
              },
            ],
          },
        },
        {
          headers: {
            authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET}`,
            'content-type': 'application/json',
          },
        }
      )
      .then(async function (response) {
        await Notification.create({
          userId: req.user.id,
          title: NOTIFICATIONS.PAYMENT_INITIATED,
          description: `A payment of ₦${amount} was initiated`,
          type: NOTIFICATION_TYPE.CONTENT,
        });
        return res.status(200).json({
          message: 'success',
          payment: response.data.data,
        });
      })
      .catch(function (error) {
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      });
  },

  paystactEventHook(req, res) {
    const hash = crypto
      .createHmac('sha512', 'secret')
      .update(JSON.stringify(req.body))
      .digest('hex');
    if (hash == req.headers['x-paystack-signature']) {
      // const { event } = req.body;
      // console.log({ event });
      // utilize data TODO
      // Retrieve the request's body
    }
    return res.send(200);
  },

  verifyTransaction(req, res) {
    const { reference } = req.params;

    const error = {
      ...validString(reference),
    };
    if (Object.keys(error).length > 1) {
      return res.status(400).json({ message: error.message.join('') });
    }

    axios
      .get(`${process.env.PAYSTACK_TRANSACT_VERIFY}/${reference}`, {
        headers: {
          authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET}`,
          'content-type': 'application/json',
        },
      })
      .then(function (response) {
        const { data } = response.data;
        return res.status(200).json({ message: 'success', payment: data });
      })
      .catch(function (error) {
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      });
  },

  // get all transcations
  getSuccessTransactions(req, res) {
    const { amount, from, limit, offset, to, status } = req.query;

    const ALL_STATUSES = ['failed', 'success', 'abandoned'];

    // let url = new URL(`${process.env.PAYSTACK_TRANSACT_ALL}?status=success`);
    let params = new URLSearchParams();

    amount && params.append('amount', amount);
    from && params.append('from', from);
    limit ? params.append('perPage', limit) : params.append('perPage', 10);
    offset && params.append('page', parseInt(offset / (limit || 10), 10) + 1);
    to && params.append('to', to);
    ALL_STATUSES.includes(status)
      ? params.append('status', status)
      : params.append('status', ALL_STATUSES[1]);

    // return res.json({ params: params.toString() });

    axios
      .get(`${process.env.PAYSTACK_TRANSACT_ALL}?${params.toString()}`, {
        headers: {
          authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET}`,
          'content-type': 'application/json',
        },
      })
      .then(function (response) {
        const { data, meta } = response.data;

        return res.status(200).json({
          message: 'success',
          payments: data,
          pagination: {
            currentPage: meta.page,
            limit: meta.perPage,
            offset: meta.skipped,
            total: meta.total,
            totalPage: meta.pageCount,
          },
        });
      })
      .catch(function (error) {
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      });
  },

  // get paystack customer
  getPaystackCustomer(req, res) {
    const { email } = req.user;

    const { from, limit, offset, to } = req.query;

    let url = new URL(
      `${process.env.PAYSTACK_CUSTOMER_ALL}?${params.toString()}`
    );
    let params = new URLSearchParams(url.search.slice(1));

    from && params.append('from', from);
    limit ? params.append('perPage', limit) : params.append('perPage', 10);
    offset && params.append('page', offset);
    to && params.append('to', to);

    axios
      .get(`${process.env.PAYSTACK_CUSTOMER_ALL}`, {
        headers: {
          authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET}`,
          'content-type': 'application/json',
        },
      })
      .then(function (response) {
        const customer = response.data.data.filter(
          (customer) => customer.email === email
        );
        if (customer.length === 0) {
          return res.status(404).json({ message: 'User does not exist' });
        }
        // add pagination result
        return res
          .status(200)
          .json({ message: 'Success', customer: customer[0] });
      })
      .catch(function (error) {
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      });
  },

  // get success transactions by user id
  getSuccessTransactionsByUserId(req, res) {
    // from, to are Datetime timestamp from which to start and stop listing transaction e.g. 2016-09-24T00:00:05.000Z, 2016-09-21
    // amount in kobo
    const { amount, from, id, limit, offset, to } = req.query;

    let url = new URL(
      `${process.env.PAYSTACK_TRANSACT_ALL}?status=success&&customer=${id}`
    );
    let params = new URLSearchParams(url.search.slice(1));

    amount && params.append('amount', amount);
    from && params.append('from', from);
    limit ? params.append('perPage', limit) : params.append('perPage', 10);
    offset && params.append('page', offset);
    to && params.append('to', to);

    axios
      .get(`${process.env.PAYSTACK_TRANSACT_ALL}?${params.toString()}`, {
        headers: {
          authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET}`,
          'content-type': 'application/json',
        },
      })
      .then(function (response) {
        const { data, meta } = response.data;
        return res
          .status(200)
          .json({ message: 'success', payments: data, pagination: meta });
      })
      .catch(function (error) {
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      });
  },

  getAllUserPayments(req, res) {
    const { email } = req.user;

    axios
      .get(`${process.env.PAYSTACK_CUSTOMER_ALL}`, {
        headers: {
          authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET}`,
          'content-type': 'application/json',
        },
      })
      .then(function (response) {
        const customer = response.data.data.filter(
          (customer) => customer.email === email
        );
        if (customer.length === 0) {
          return res.status(404).json({ message: 'User does not exist' });
        }

        const id = customer[0].id;

        // from, to are Datetime timestamp from which to start and stop listing transaction e.g. 2016-09-24T00:00:05.000Z, 2016-09-21
        // amount in kobo
        const { amount, from, limit, offset, to } = req.query;

        let url = new URL(
          `${process.env.PAYSTACK_TRANSACT_ALL}?status=success&&customer=${id}`
        );
        let params = new URLSearchParams(url.search.slice(1));

        amount && params.append('amount', amount);
        from && params.append('from', from);
        limit ? params.append('perPage', limit) : params.append('perPage', 10);
        offset && params.append('page', offset);
        to && params.append('to', to);

        axios
          .get(`${process.env.PAYSTACK_TRANSACT_ALL}?${params.toString()}`, {
            headers: {
              authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET}`,
              'content-type': 'application/json',
            },
          })
          .then(function (response) {
            const { data, meta } = response.data;
            return res
              .status(200)
              .json({ message: 'success', payments: data, pagination: meta });
          })
          .catch(function (error) {
            const status = error.status || 500;
            const errorMessage = error.message || error;
            return res.status(status).json({ message: errorMessage });
          });
      })
      .catch(function (error) {
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      });
  },

  /**
   * Pay Entertainers
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  async payEntertainer(req, res) {
    const adminId = req.user.id;
    const { amount, eventEntertainerId } = req.body;
    if (!amount || !eventEntertainerId) {
      return res.status(403).json({
        message: 'Payment must contain amount and eventEntertainerId',
      });
    }

    const eventDetails = await EventEntertainer.findOne({
      where: { id: eventEntertainerId },
      include: [
        {
          model: Event,
          as: 'event',
          include: [
            {
              model: User,
              as: 'owner',
              attributes: ['id', 'firstName', 'lastName', 'profileImageURL'],
            },
          ],
        },
        {
          model: EntertainerProfile,
          as: 'entertainer',
          attributes: ['id', 'entertainerType', 'stageName', 'slug'],
          include: [
            {
              model: User,
              as: 'personalDetails',
              attributes: [
                'id',
                'firstName',
                'lastName',
                'email',
                'profileImageURL',
                'phoneNumber',
              ],
              include: [{ model: BankDetail, as: 'bankDetail' }],
            },
          ],
          required: true,
        },
      ],
    });

    if (!eventDetails) {
      res.status(404).json({
        message: 'Payment cannot be saved. Invalid Event Details',
      });
    }

    const entertainerId = eventDetails.entertainer.id;

    const paymentExists = await Payment.findOne({
      where: {
        entertainerId,
        eventEntertainerId,
      },
    });

    if (paymentExists) {
      return res.status(401).json({
        message: 'The entertainer has already been paid for the event',
      });
    }

    return Payment.create({
      adminId,
      amount,
      entertainerId: eventDetails.entertainer.id,
      eventEntertainerId,
    })
      .then(async (payment) => {
        const contentTop = `We are pleased to inform you that your pay for performing at the event with details below, has been credited to your bank account provided.<br /><br />
                     <strong>Event: </strong><${
                       eventDetails.event.eventType
                     }br />
                     <strong>Place: </strong>${eventDetails.placeOfEvent}<br />
                     <strong>Date: </strong>${getShortDate(
                       eventDetails.event.eventDate
                     )}<br />
                     <strong>Take-Home Pay: </strong>₦${moneyFormat(
                       amount
                     )}<br />
                     <strong>Bank: </strong>${
                       eventDetails.entertainer.personalDetails.bankDetail
                         .bankName
                     }<br />
                     <strong>Account No.: </strong>${encodeAccountNumber(
                       eventDetails.entertainer.personalDetails.bankDetail
                         .accountNumber
                     )}<br />
        `;

        sendMail(
          EMAIL_CONTENT.ENTERTAINER_PAYMENT,
          {
            email: eventDetails.entertainer.personalDetails.email,
            firstName: eventDetails.entertainer.stageName,
          },
          {
            title: `You have been paid ₦${moneyFormat(amount)}`,
            subject: `You have been paid ₦${moneyFormat(amount)}`,
            contentTop,
          }
        );

        // ENTERTAINER PAYMENT SMS
        await sendSMS({
          message: `You have been paid NGN ${amount} for the '${eventDetails.event.eventType}' event. Check your DUV Live account for more info.`,
          phone: eventDetails.entertainer.personalDetails.phoneNumber,
        });

        // Notification
        await Notification.create({
          userId: eventDetails.entertainer.personalDetails.id,
          title: NOTIFICATIONS.PAYMENT_RECEIVED,
          description: `You have been paid ${amount}`,
          type: NOTIFICATION_TYPE.SUCCESS,
        });
        return res.json({
          message: 'Payment to Entertainer was successful.',
          payment,
        });
      })
      .catch((error) => {
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      });
  },

  /**
   * @desc Get all Entertainer Payments
   * @param {object} req - The request sent to the route
   * @param {object} res - The response sent back
   * @return {object} json response
   */
  getPayments(req, res) {
    const entertainerId = req.user.profile.id;
    return Payment.findAll({
      where: { entertainerId },
      order: [['updatedAt', 'DESC']],
      include: [
        {
          attributes: ['id', 'placeOfEvent'],
          model: EventEntertainer,
          as: 'eventPaidFor',
          include: [
            {
              model: Event,
              as: 'event',
              attributes: ['id', 'eventType', 'eventDate'],
            },
          ],
        },
      ],
    })
      .then((payments) => res.json({ payments }))
      .catch((error) => res.status(412).json({ message: error.message }));
  },

  /**
   * get All Payments
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  async getAllPayments(req, res) {
    const { offset, limit } = req.query;
    try {
      let paymentQuery = {};
      const paymentKeys = ['amount', 'entertainerId', 'eventEntertainerId'];

      paymentKeys.forEach((key) => {
        if (req.query[key]) {
          paymentQuery[key] = { [Op.eq]: req.query[key] };
        }
      });

      const options = {
        offset: offset || 0,
        limit: limit || 10,
        where: paymentQuery,
        include: [
          {
            attributes: ['id', 'placeOfEvent'],
            model: EventEntertainer,
            as: 'eventPaidFor',
            include: [
              {
                model: Event,
                as: 'event',
                attributes: ['id', 'eventType', 'eventDate'],
              },
              {
                model: EntertainerProfile,
                as: 'entertainer',
                attributes: [
                  'id',
                  'stageName',
                  'entertainerType',
                  'location',
                  'slug',
                ],
                include: [
                  {
                    model: User,
                    as: 'personalDetails',
                    attributes: [
                      'id',
                      'firstName',
                      'lastName',
                      'profileImageURL',
                    ],
                  },
                ],
              },
            ],
          },
          {
            model: User,
            as: 'paidBy',
            attributes: ['id', 'firstName', 'lastName', 'profileImageURL'],
          },
        ],
      };
      try {
        const { result, pagination } = await getAll(Payment, options);
        return res.status(200).json({ payments: result, pagination });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    } catch (error) {
      const status = error.status || 500;
      const errorMessage = error.message || error;
      return res.status(status).json({ message: errorMessage });
    }
  },
};

export default PaymentController;
