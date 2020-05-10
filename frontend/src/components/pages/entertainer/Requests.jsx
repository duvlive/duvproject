import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import { getTokenFromStore } from 'utils/localStorage';
import {
  twoDigitNumber,
  commaNumber,
  getNairaSymbol,
  getRequestStatusIcon,
} from 'utils/helpers';
import { remainingDays } from 'utils/date-helpers';
import NoContent from 'components/common/utils/NoContent';
import { Link } from '@reach/router';
import { REQUEST_ACTION } from 'utils/constants';
import LoadItems from 'components/common/utils/LoadItems';
import { UserContext } from 'context/UserContext';
import AlertMessage from 'components/common/utils/AlertMessage';

const Requests = () => {
  const [requests, setRequests] = React.useState(null);
  let { userState, userDispatch } = React.useContext(UserContext);
  const [message, setMessage] = React.useState({ msg: null, type: null });

  React.useEffect(() => {
    axios
      .get('/api/v1/entertainer/requests', {
        headers: {
          'x-access-token': getTokenFromStore(),
        },
      })
      .then(function (response) {
        const { status, data } = response;
        // handle success
        if (status === 200) {
          setRequests(data.requests);
        }
      })
      .catch(function (error) {
        // console.log(error.response.data.message);
        // navigate to all events
        setRequests([]);
      });
  }, []);

  if (userState && userState.alert === 'bid-not-found-error') {
    !message.msg &&
      setMessage({
        msg: 'The request is not found',
        type: 'error',
      });
    userDispatch({
      type: 'remove-alert',
    });
  }

  return (
    <BackEndPage title="Requests">
      <div className="main-app">
        <TopMessage message="Placed Requests" />

        <section className="app-content">
          <div className="mt-4">
            <AlertMessage message={message.msg} type={message.type} />
          </div>
          <div className="table-responsive">
            <LoadItems
              items={requests}
              noContent={<NoContent text="No Request Found." />}
            >
              <table className="table table-dark table__no-border table__with-bg">
                <tbody>
                  {requests &&
                    requests.map((request, index) => (
                      <RequestsRow
                        askingPrice={request.askingPrice}
                        city={request.event.city}
                        eventType={request.event.eventType}
                        expiryDate={request.expiryDate}
                        id={request.id}
                        key={index}
                        number={index + 1}
                        proposedPrice={request.proposedPrice}
                        state={request.event.state}
                        status={request.status}
                      />
                    ))}
                </tbody>
              </table>
            </LoadItems>
            <br />
            <br />
          </div>
        </section>
      </div>
    </BackEndPage>
  );
};

export const RequestsRow = ({
  id,
  askingPrice,
  expiryDate,
  city,
  eventType,
  number,
  proposedPrice,
  state,
  status,
}) => (
  <tr>
    <th className="table__number" scope="row">
      {twoDigitNumber(number)}
    </th>
    <td>
      <div className="table__title text-white">{eventType}</div>
      <span>
        <i className="icon icon-location" />
        {city}, {state} state
      </span>
    </td>
    {status === REQUEST_ACTION.PENDING && (
      <>
        <td>
          <span className="text-yellow">Request closes on </span>
          <span>
            <i className="icon icon-clock" /> {remainingDays(expiryDate)}
          </span>
        </td>
        <td>
          <span className="text-red">Asking Price</span>
          <span>
            {getNairaSymbol()}
            {commaNumber(askingPrice)}
          </span>
        </td>
      </>
    )}

    {(status === REQUEST_ACTION.APPROVED || status === REQUEST_ACTION.PAID) && (
      <>
        <td>
          <span className="text-yellow">Approved Price </span>
          <span>
            {getNairaSymbol()}
            {commaNumber(
              proposedPrice && proposedPrice > 0 ? proposedPrice : askingPrice
            )}
          </span>
        </td>
      </>
    )}
    <td>
      <span className="text-muted-light">Status</span>
      <span>{getRequestStatusIcon(status)}</span>
    </td>
    <td className="text-right">
      <Link
        className="btn btn-info btn-transparent"
        to={`/entertainer/request/view/${id}`}
      >
        View Request
      </Link>
    </td>
  </tr>
);

RequestsRow.propTypes = {
  askingPrice: PropTypes.string,
  city: PropTypes.string,
  eventType: PropTypes.string,
  expiryDate: PropTypes.any,
  id: PropTypes.number,
  number: PropTypes.number,
  proposedPrice: PropTypes.string,
  state: PropTypes.string,
  status: PropTypes.string,
};

Requests.defaultProps = {
  askingPrice: '',
  expiryDate: '',
  city: '',
  eventType: '',
  id: 0,
  number: 0,
  state: '',
  proposedPrice: null,
  status: 'Pending',
};

export default Requests;
