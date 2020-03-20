import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import { getTokenFromStore } from 'utils/localStorage';
import { twoDigitNumber, commaNumber } from 'utils/helpers';
import { getShortDate } from 'utils/date-helpers';
import NoContent from 'components/common/utils/NoContent';

const Bids = () => {
  const [bids, setBids] = React.useState([]);
  React.useEffect(() => {
    axios
      .get('/api/v1/entertainer/bids', {
        headers: {
          'x-access-token': getTokenFromStore()
        }
      })
      .then(function(response) {
        const { status, data } = response;
        // handle success
        if (status === 200) {
          setBids(data.bids);
        }
      })
      .catch(function(error) {
        console.log(error.response.data.message);
        // navigate to all events
      });
  }, []);
  return (
    <BackEndPage title="Bids">
      <div className="main-app">
        <TopMessage message="Placed Bids" />

        <section className="app-content">
          <div className="table-responsive">
            <table className="table table-dark table__no-border table__with-bg">
              <tbody>
                {bids.length > 0 ? (
                  bids.map((bid, index) => (
                    <BidsRow
                      askingPrice={bid.askingPrice}
                      auctionEndDate={bid.eventEntertainerInfo.auctionEndDate}
                      city={bid.event.city}
                      eventType={bid.event.eventType}
                      key={index}
                      number={index + 1}
                      state={bid.event.state}
                      status={bid.status}
                    />
                  ))
                ) : (
                  <NoContent
                    isButton
                    linkText="Available Auctions"
                    linkTo="/entertainer/available-auctions"
                    text="No Bid Found. You can check available auctions here"
                  />
                )}
              </tbody>
            </table>
            <br />
            <br />
          </div>
        </section>
      </div>
    </BackEndPage>
  );
};

const BidsRow = ({
  askingPrice,
  auctionEndDate,
  city,
  eventType,
  number,
  state,
  status
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
    <td>
      <span className="text-yellow">Bidding closes on </span>
      <span>
        <i className="icon icon-clock" /> {getShortDate(auctionEndDate)}
      </span>
    </td>
    <td>
      <span className="text-red">Asking Price</span>
      <span>NGN {commaNumber(askingPrice)}</span>
    </td>
    <td className="text-right">
      <div className="btn btn-info btn-transparent">{status}</div>
    </td>
  </tr>
);

BidsRow.propTypes = {
  askingPrice: PropTypes.string,
  auctionEndDate: PropTypes.any,
  city: PropTypes.string,
  eventType: PropTypes.string,
  number: PropTypes.number,
  state: PropTypes.string,
  status: PropTypes.string
};

Bids.defaultProps = {
  askingPrice: '',
  auctionEndDate: '',
  city: '',
  eventType: '',
  number: 0,
  state: '',
  status: 'Pending'
};

export default Bids;
