import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import { getTokenFromStore } from 'utils/localStorage';
import { twoDigitNumber } from 'utils/helpers';
import { getShortDate } from 'utils/date-helpers';

const Auctions = () => {
  const [auctions, setAuctions] = React.useState([]);
  React.useEffect(() => {
    axios
      .get('/api/v1/available-auctions', {
        headers: {
          'x-access-token': getTokenFromStore()
        }
      })
      .then(function(response) {
        const { status, data } = response;
        // handle success
        if (status === 200) {
          setAuctions(data.events);
        }
      })
      .catch(function(error) {
        console.log(error.response.data.message);
        // navigate to all events
      });
  }, []);
  return (
    <BackEndPage title="Available Auctions">
      <div className="main-app">
        <TopMessage message="Available Auctions" />

        <section className="app-content">
          <div className="table-responsive">
            <table className="table table-dark table__no-border table__with-bg">
              <tbody>
                {auctions.map((auction, index) => (
                  <AuctionsRow
                    auctionEndDate={auction.auctionEndDate}
                    city={auction.event.city}
                    eventType={auction.event.eventType}
                    id={auction.id}
                    key={index}
                    number={index + 1}
                    state={auction.event.state}
                  />
                ))}
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

const AuctionsRow = ({
  auctionEndDate,
  city,
  eventType,
  id,
  number,
  state
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
    <td className="text-right">
      <Link
        className="btn btn-info btn-transparent"
        to={`/entertainer/bid/${id}`}
      >
        Place Bid
      </Link>
    </td>
  </tr>
);

AuctionsRow.propTypes = {
  auctionEndDate: PropTypes.any,
  city: PropTypes.string,
  eventType: PropTypes.string,
  number: PropTypes.number,
  state: PropTypes.string,
  status: PropTypes.string
};

Auctions.defaultProps = {
  auctionEndDate: '',
  city: '',
  eventType: '',
  number: 0,
  state: '',
  status: 'Pending'
};

export default Auctions;
