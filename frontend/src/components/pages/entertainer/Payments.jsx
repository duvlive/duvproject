import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import { Link } from '@reach/router';
import { moneyFormat } from 'utils/helpers';
import { getShortDate } from 'utils/date-helpers';
import LoadingScreen from 'components/common/layout/LoadingScreen';
import { getTokenFromStore } from 'utils/localStorage';
import NoContent from 'components/common/utils/NoContent';

const Payments = () => {
  const [payments, setPayments] = React.useState(null);
  React.useEffect(() => {
    axios
      .get('/api/v1/payments/entertainers', {
        headers: {
          'x-access-token': getTokenFromStore(),
        },
      })
      .then(function (response) {
        const { status, data } = response;
        // handle success
        if (status === 200) {
          console.log('data', data);
          setPayments(data.payments);
        }
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        setPayments([]);
      });
  }, []);

  return (
    <BackEndPage title="Payments History">
      <div className="main-app">
        <TopMessage message="Payments History" />

        <section className="app-content">
          <section className="payments">
            <div className="row">
              {payments == null ? (
                <LoadingScreen loading={true} text="Loading Payments History" />
              ) : payments.length > 0 ? (
                <Payments.CardLists payments={payments} />
              ) : (
                <>
                  <div className="col-sm-12">
                    <NoContent text="No Payments found" />
                  </div>
                </>
              )}
            </div>
          </section>
        </section>
      </div>
    </BackEndPage>
  );
};

Payments.CardLists = ({ payments }) => {
  const colors = ['blue', 'red', 'green', 'black', 'yellow'];
  return payments.map((payment, index) => (
    <Payments.Card color={colors[index % 4]} key={index} payment={payment} />
  ));
};

Payments.CardLists.propTypes = {
  payments: PropTypes.array.isRequired,
};

Payments.Card = ({ color, payment }) => (
  <div className="col-lg-4 col-md-8 offset-md-2 offset-lg-0">
    <Link
      to={`/entertainer/payments/view?reference=${payment.eventEntertainerId}`}
    >
      <div
        className={`card card-custom card-tiles card-${color} card__no-hover`}
      >
        <div className="card-body">
          <h4 className="subtitle--2 white mb-0">
            ₦{moneyFormat(payment.amount)}
          </h4>
          <div className="small--1 text-gray">
            Paid on {getShortDate(payment.createdAt)}
          </div>
        </div>
        <div className="spacer--tiles--3" />
        <div className="card-footer">
          <div className="row">
            <div className="col-8">
              <h5 className="subtitle--3 mt-2 mb-0 gray">
                {payment.eventPaidFor.event.eventType}
              </h5>
              <div className="small--3 text-gray">
                {getShortDate(payment.eventPaidFor.event.eventDate)}
              </div>
            </div>
            <div className="col-4">
              <div className="text-muted text-right h1">
                <span className="icon icon-wallet"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  </div>
);

Payments.Card.propTypes = {
  color: PropTypes.string.isRequired,
  payment: PropTypes.object.isRequired,
};

export default Payments;
