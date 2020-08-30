import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import NoContent from 'components/common/utils/NoContent';
import { getShortDate } from 'utils/date-helpers';
import { getTokenFromStore } from 'utils/localStorage';
import LoadItems from 'components/common/utils/LoadItems';
import { UserContext } from 'context/UserContext';
import Image from 'components/common/utils/Image';
import { twoDigitNumber, moneyFormat, getNairaSymbol } from 'utils/helpers';
import { Link } from '@reach/router';
import AlertMessage from 'components/common/utils/AlertMessage';

const PendingPayments = () => {
  const [pendingPayments, setPendingPayments] = React.useState(null);
  const [message, setMessage] = React.useState({ msg: null, type: null });
  const { userState, userDispatch } = React.useContext(UserContext);

  React.useEffect(() => {
    axios
      .get('/api/v1/admin/pending-payments', {
        headers: {
          'x-access-token': getTokenFromStore(),
        },
      })
      .then(function (response) {
        const { status, data } = response;
        console.log('status,data', status, data);
        // handle success
        if (status === 200) {
          setPendingPayments(data.pendingPayments);
        }
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        setPendingPayments([]);
      });
  }, [userDispatch]);

  if (userState && userState.alert === 'payment-success') {
    !message.msg &&
      setMessage({
        msg: 'Your payment has been successfully saved',
        type: 'success',
      });
    userDispatch({
      type: 'remove-alert',
    });
  }
  return (
    <BackEndPage title="PendingPayments">
      <div className="main-app">
        <TopMessage />

        <section className="app-content">
          <h4 className="font-weight-normal">Pending Payments</h4>

          <div className="mt-4">
            <AlertMessage message={message.msg} type={message.type} />
          </div>
          <LoadItems
            items={pendingPayments}
            loadingText="Loading Pending Payments"
            noContent={<NoContent isButton text="No Pending Payments found" />}
          >
            <PendingPaymentsRowList pendingPayments={pendingPayments || []} />
          </LoadItems>
        </section>
      </div>
    </BackEndPage>
  );
};

const PendingPaymentsRowList = ({ pendingPayments }) => (
  <div className="table-responsive">
    <table className="table table-dark table__no-border table__with-bg">
      <tbody>
        {pendingPayments.map((pendingpayment, index) => (
          <PendingPaymentsRow
            key={index}
            number={index + 1}
            pendingpayment={pendingpayment}
          />
        ))}
      </tbody>
    </table>
    <br />
    <br />
  </div>
);

PendingPaymentsRowList.propTypes = {
  pendingPayments: PropTypes.array.isRequired,
};

const PendingPaymentsRow = ({ pendingpayment, number }) => (
  <>
    <tr>
      <th className="table__number" scope="row">
        {twoDigitNumber(number)}
      </th>
      <td className="align-middle">
        <Image
          className="avatar--medium--small"
          name={pendingpayment.applications[0].user.profile.stageName}
          responsiveImage={false}
          src={pendingpayment.applications[0].user.profileImageURL}
        />
      </td>
      <td>
        <span className="text-muted small--4">Entertainer</span>
        {pendingpayment.applications[0].user.profile.stageName}
      </td>
      <td className="align-middle">
        <span className="text-muted small--4">
          {pendingpayment.event.eventType}
        </span>
        {getShortDate(pendingpayment.event.eventDate)}
      </td>
      <td className="text-muted-light-2">
        <span className="text-muted small--4">Take Home</span>
        {getNairaSymbol()}{' '}
        {moneyFormat(pendingpayment.applications[0].takeHome)}
      </td>
      <td className="align-middle">
        <Link
          className="btn btn-info btn-sm btn-transparent"
          to={`/admin/user-payments/${pendingpayment.applications[0].id}`}
        >
          View Details
        </Link>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Link
          className="btn btn-danger btn-sm btn-transparent"
          to={`/admin/pay-entertainer/${pendingpayment.applications[0].id}`}
        >
          Pay Entertainer
        </Link>
      </td>
    </tr>
  </>
);

PendingPaymentsRow.propTypes = {
  number: PropTypes.any.isRequired,
  pendingpayment: PropTypes.object.isRequired,
};

export default PendingPayments;
