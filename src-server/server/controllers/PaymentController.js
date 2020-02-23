import axios from 'axios';
import crypto from 'crypto';
import { validString } from '../utils';

const PaymentController = {
  initializeTransaction(req, res) {
    const { amount } = req.body;
    const { email } = req.user;

    const error = {
      ...validString(amount)
    };
    if (Object.keys(error).length > 1) {
      return res.status(400).json({ message: error.message.join('') });
    }

    axios
      .post(
        `${process.env.PAYSTACK_TRANSACT_INIT}`,
        {
          amount: amount * 100,
          email
        },
        {
          headers: {
            authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET}`,
            'content-type': 'application/json'
          }
        }
      )
      .then(function(response) {
        return res
          .status(200)
          .json({ message: 'success', payment: response.data.data });
      })
      .catch(function(error) {
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      });
  },

  paystactEventHook(req, res) {
    const hash = crypto
      .createHmac('sha512', secret)
      .update(JSON.stringify(req.body))
      .digest('hex');
    if (hash == req.headers['x-paystack-signature']) {
      const { event } = req.body;
      console.log({ event });
      // utilize data TODO

      // Retrieve the request's body
    }
    return res.send(200);
  },

  verifyTransaction(req, res) {
    const { reference } = req.params;

    const error = {
      ...validString(reference)
    };
    if (Object.keys(error).length > 1) {
      return res.status(400).json({ message: error.message.join('') });
    }

    axios
      .get(`${process.env.PAYSTACK_TRANSACT_VERIFY}/${reference}`, {
        headers: {
          authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET}`,
          'content-type': 'application/json'
        }
      })
      .then(function(response) {
        return res
          .status(200)
          .json({ message: 'success', payment: response.data.data });
      })
      .catch(function(error) {
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
          'content-type': 'application/json'
        }
      })
      .then(function(response) {
        return res
          .status(200)
          .json({ message: 'success', payments: response.data.data });
      })
      .catch(function(error) {
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
          'content-type': 'application/json'
        }
      })
      .then(function(response) {
        const customer = response.data.data.filter(
          customer => customer.email === email
        );
        if (customer.length === 0) {
          return res.status(404).json({ message: 'User does not exist' });
        }
        return res.status(200).json({ message: 'Success', customer });
      })
      .catch(function(error) {
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      });
  },

  // get success transactions by user id
  getSuccessTransactionsByUserId(req, res) {
    const { id } = req.params;
    axios
      .get(
        `${process.env.PAYSTACK_TRANSACT_ALL}?status=success&&customer=${id}`,
        {
          headers: {
            authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET}`,
            'content-type': 'application/json'
          }
        }
      )
      .then(function(response) {
        return res
          .status(200)
          .json({ message: 'success', payments: response.data.data });
      })
      .catch(function(error) {
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      });
  }
};

export default PaymentController;
