import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import { getTokenFromStore } from 'utils/localStorage';
import { getLongDate } from 'utils/date-helpers';
import { moneyFormat, twoDigitNumber } from 'utils/helpers';
// import { Link } from '@reach/router';
import LoadingScreen from 'components/common/layout/LoadingScreen';
import NoContent from 'components/common/utils/NoContent';

const UserPayments = () => {
  const [loading, setLoading] = React.useState(true);
  const [payments, setPayments] = React.useState([]);
  React.useEffect(() => {
    setLoading(true);
    axios
      .get('/api/v1/payments', {
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
    <BackEndPage title="User Payments">
      <div className="main-app">
        <TopMessage message="User Payments" />

        <section className="app-content">
          <section className="payments">
            <div className="row">
              {loading ? (
                <LoadingScreen loading={loading} text="Loading User Payments" />
              ) : payments.length > 0 ? (
                <UserPayments.CardLists payments={payments} />
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

UserPayments.CardLists = ({ payments }) => {
  return (
    <table className="table table-dark table__no-border table__with-bg">
      <tbody>
        {payments.map((payment, index) => (
          <UserPaymentsRow key={index} number={index + 1} {...payment} />
        ))}
      </tbody>
    </table>
  );
};

const UserPaymentsRow = ({ amount, gateway_response, number, paid_at }) => (
  <tr>
    <th className="table__number align-middle" scope="row">
      {twoDigitNumber(number)}
    </th>
    <td className="align-middle">
      <small className="small--4 text-muted">Amount</small>
      <span className="text-muted-light-2">
        NGN {moneyFormat(amount) || '-'}
      </span>
    </td>

    <td className="align-middle text-left">
      <small className="small--4 text-muted">Response</small>
      <span className="text-muted-light-2">{gateway_response || '-'}</span>
    </td>

    <td className="align-middle text-left">
      <small className="small--4 text-muted">Paid At</small>
      <span className="text-muted-light-2">{getLongDate(paid_at) || '-'}</span>
    </td>
  </tr>
);

UserPaymentsRow.defaultProps = {
  amount: null,
  gateway_response: null,
  paid_at: null,
};

UserPaymentsRow.propTypes = {
  amount: PropTypes.number,
  gateway_response: PropTypes.string,
  number: PropTypes.any.isRequired,
  paid_at: PropTypes.string,
};

export default UserPayments;
