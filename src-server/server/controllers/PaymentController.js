import axios from 'axios';
import crypto from 'crypto';
import {
  Application,
  EventEntertainer,
  Notification,
  Payment,
} from '../models';
import { validString } from '../utils';
import { NOTIFICATIONS, NOTIFICATION_TYPE } from '../constant';
// import EMAIL_CONTENT from '../email-template/content';
// import sendMail from '../MailSender';

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
          message: 'This application has already marked as paid',
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
          description: `A payment of NGN ${amount} was initiated`,
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
        return res
          .status(200)
          .json({ message: 'success', payment: response.data.data });
      })
      .catch(function (error) {
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      });
  },

  // get all transcations
  getSuccessTransactions(req, res) {
    axios
      .get(`${process.env.PAYSTACK_TRANSACT_ALL}?status=success`, {
        headers: {
          authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET}`,
          'content-type': 'application/json',
        },
      })
      .then(function (response) {
        return res
          .status(200)
          .json({ message: 'success', payments: response.data.data });
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
    const { id } = req.query;
    axios
      .get(
        `${process.env.PAYSTACK_TRANSACT_ALL}?status=success&&customer=${id}`,
        {
          headers: {
            authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET}`,
            'content-type': 'application/json',
          },
        }
      )
      .then(function (response) {
        return res
          .status(200)
          .json({ message: 'success', payments: response.data.data });
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
        axios
          .get(
            `${process.env.PAYSTACK_TRANSACT_ALL}?status=success&&customer=${id}`,
            {
              headers: {
                authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET}`,
                'content-type': 'application/json',
              },
            }
          )
          .then(function (response) {
            return res
              .status(200)
              .json({ message: 'success', payments: response.data.data });
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
  PayEnteratainer(req, res) {
    const adminId = req.user.id;
    const { amount, entertainerId, eventEntertainerId, userId } = req.body;
    if (!amount && !entertainerId && !eventEntertainerId && !userId) {
      return Promise.reject({
        message:
          'Payment must contain amount, entertainerId, eventEntertainerId and userId',
      });
    }

    return Payment.create({
      adminId,
      amount,
      entertainerId,
      eventEntertainerId,
    })
      .then(async (payment) => {
        // send mail
        // sendMail(
        //   EMAIL_CONTENT.ENTERTAINER_REQUEST,
        //   { email: email },
        //   {
        //     firstName: stageName,
        //     title: `You have a request of NGN ${offer}`,
        //     link: '#',
        //     contentTop,
        //     contentBottom,
        //   }
        // );

        // Notification
        await Notification.create({
          userId,
          title: NOTIFICATIONS.PAYMENT_RECEIVED,
          description: `You have been paid ${amount}`,
          type: NOTIFICATION_TYPE.SUCCESS,
        });
        return res.json({ message: 'Payment has been made', payment });
      })
      .catch((error) => {
        const status = error.status || 500;
        const errorMessage =
          (error.parent && error.parent.detail) || error.message || error;
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
    const { entertainerId } = req.user.profile.id;
    return Payment.findAll({
      where: { entertainerId },
      order: [['updatedAt', 'DESC']],
    })
      .then((payments) => res.json({ payments }))
      .catch((error) => res.status(412).json({ msg: error.message }));
  },
};

export default PaymentController;
