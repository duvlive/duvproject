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
import { getShortDate } from 'utils/date-helpers';
import NoContent from 'components/common/utils/NoContent';
import { Link } from '@reach/router';
import { UserContext } from 'context/UserContext';
import AlertMessage from 'components/common/utils/AlertMessage';
import { eventHasExpired } from 'utils/event-helpers';
import { REQUEST_ACTION } from 'utils/constants';

const Bids = () => {
  const [message, setMessage] = React.useState({ msg: null, type: null });
  const [bids, setBids] = React.useState([]);
  const { userState, userDispatch } = React.useContext(UserContext);

  React.useEffect(() => {
    axios
      .get('/api/v1/entertainer/bids', {
        headers: {
          'x-access-token': getTokenFromStore(),
        },
      })
      .then(function (response) {
        const { status, data } = response;
        // handle success
        if (status === 200) {
          setBids(data.bids);
        }
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        // navigate to all events
      });
  }, []);

  if (userState && userState.alert === 'place-bid-success') {
    !message.msg &&
      setMessage({
        msg: 'Your bid has been successfully placed',
        type: 'success',
      });
    userDispatch({
      type: 'remove-alert',
    });
  }

  return (
    <BackEndPage title="Bids">
      <div className="main-app">
        <TopMessage message="Placed Bids" />

        <section className="app-content">
          <div className="mt-4">
            <AlertMessage message={message.msg} type={message.type} />
          </div>
          <div className="table-responsive">
            {bids.length > 0 ? (
              <table className="table table-dark table__no-border table__with-bg">
                <tbody>
                  {bids.map((bid, index) => (
                    <BidsRow
                      askingPrice={bid.askingPrice}
                      auctionEndDate={bid.eventEntertainerInfo.auctionEndDate}
                      city={bid.event.city}
                      eventType={bid.event.eventType}
                      id={bid.id}
                      key={index}
                      number={index + 1}
                      state={bid.event.state}
                      status={bid.status}
                    />
                  ))}
                </tbody>
              </table>
            ) : (
              <NoContent
                isButton
                linkText="Available Auctions"
                linkTo="/entertainer/available-auctions"
                text="No Bid Found. You can check available auctions here"
              />
            )}
            <br />
            <br />
          </div>
        </section>
      </div>
    </BackEndPage>
  );
};

export const BidsRow = ({
  id,
  askingPrice,
  auctionEndDate,
  city,
  eventType,
  number,
  state,
  status,
}) => {
  const updatedStatus =
    eventHasExpired(auctionEndDate) && status === REQUEST_ACTION.PENDING
      ? REQUEST_ACTION.EXPIRED
      : status;
  return (
    <tr>
      <th className="table__number" scope="row">
        {twoDigitNumber(number)}
      </th>
      <td>
        <div className="table__title text-muted-light-2">{eventType}</div>
        <span>
          <i className="icon icon-location" />
          {city}, {state} state
        </span>
      </td>
      <td>
        <span className="text-muted-light-2">Bidding closes on </span>
        <span>
          <i className="icon icon-clock" /> {getShortDate(auctionEndDate)}
        </span>
      </td>
      <td>
        <span className="text-muted-light-2">Asking Price</span>
        <span className="text-yellow">
          {getNairaSymbol()}
          {commaNumber(askingPrice)}
        </span>
      </td>
      <td>
        <span className="text-muted-light-2 small--2">Status</span>
        <span>{getRequestStatusIcon(updatedStatus, 'Closed')}</span>
      </td>
      <td className="text-right">
        <Link
          className="btn btn-info btn-transparent"
          to={`/entertainer/bid/view/${id}`}
        >
          View Bid
        </Link>
      </td>
    </tr>
  );
};

BidsRow.propTypes = {
  askingPrice: PropTypes.string,
  auctionEndDate: PropTypes.any,
  city: PropTypes.string,
  eventType: PropTypes.string,
  id: PropTypes.any,
  number: PropTypes.any,
  state: PropTypes.string,
  status: PropTypes.string,
};

Bids.defaultProps = {
  askingPrice: '',
  auctionEndDate: '',
  city: '',
  eventType: '',
  id: '',
  number: 0,
  state: '',
  status: 'Pending',
};

export default Bids;
