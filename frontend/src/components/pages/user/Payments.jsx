import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import { getTokenFromStore } from 'utils/localStorage';
import { getShortDate } from 'utils/date-helpers';
import { moneyFormat } from 'utils/helpers';
import { Link } from '@reach/router';
import LoadingScreen from 'components/common/layout/LoadingScreen';
import NoContent from 'components/common/utils/NoContent';

const Payments = () => {
  const [loading, setLoading] = React.useState(true);
  const [payments, setPayments] = React.useState([]);
  React.useEffect(() => {
    setLoading(true);
    axios
      .get('/api/v1/user/payments', {
        headers: {
          'x-access-token': getTokenFromStore(),
        },
      })
      .then(function (response) {
        const { status, data } = response;
        // handle success
        if (status === 200) {
          setPayments(data.payments);
        }
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        // navigate to all events
        setLoading(false);
      });
  }, []);

  return (
    <BackEndPage title="Payments History">
      <div className="main-app">
        <TopMessage message="Payments History" />

        <section className="app-content">
          <section className="payments">
            <div className="row">
              {loading ? (
                <LoadingScreen
                  loading={loading}
                  text="Loading Payments History"
                />
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
    <Link to={`/user/payments/view?reference=${payment.reference}`}>
      <div
        className={`card card-custom card-tiles card-${color} card__no-hover`}
      >
        <div className="card-body">
          <h4 className="subtitle--2 white mb-0">
            {payment.currency} {moneyFormat(payment.amount / 100)}
          </h4>
          <div className="small--1 text-gray">
            Paid on {getShortDate(payment.paid_at)}
          </div>
        </div>
        <div className="spacer--tiles--3" />
        <div className="card-footer">
          <div className="row">
            <div className="col-8">
              <h5 className="subtitle--3 mt-2 mb-0 gray">
                {payment.authorization.bank}
              </h5>
              <div className="small--3 text-gray">
                {payment.authorization.card_type}
              </div>
            </div>
            <div className="col-4">
              <div className="text-muted text-right h1">
                <span className="icon icon-credit-card"></span>
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
