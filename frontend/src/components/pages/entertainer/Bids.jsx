import React from 'react';
import axios from 'axios';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import { getTokenFromStore } from 'utils/localStorage';
import { twoDigitNumber, commaNumber, getNairaSymbol } from 'utils/helpers';
import { getShortDate } from 'utils/date-helpers';
import NoContent from 'components/common/utils/NoContent';
import { Link } from '@reach/router';

const Bids = () => {
  const [bids, setBids] = React.useState([]);
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
  console.log('bids', bids);
  return (
    <BackEndPage title="Bids">
      <div className="main-app">
        <TopMessage message="Placed Bids" />

        <section className="app-content">
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

const BidsRow = ({
  id,
  askingPrice,
  auctionEndDate,
  city,
  eventType,
  number,
  state,
  status,
}) => (
  <tr
    className={classNames({
      'tr-success': status === 'Approved',
      'tr-error': status === 'Rejected',
    })}
  >
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
    <td>
      <span className="text-yellow">Bidding closes on </span>
      <span>
        <i className="icon icon-clock" /> {getShortDate(auctionEndDate)}
      </span>
    </td>
    <td>
      <span className="text-red">Asking Price</span>
      <span>
        {getNairaSymbol()}
        {commaNumber(askingPrice)}
      </span>
    </td>
    <td>
      <span className="text-muted small--2">Status</span>
      <span>{status === 'Rejected' ? 'Closed' : status}</span>
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

BidsRow.propTypes = {
  askingPrice: PropTypes.string,
  auctionEndDate: PropTypes.any,
  city: PropTypes.string,
  eventType: PropTypes.string,
  id: PropTypes.string,
  number: PropTypes.string,
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
