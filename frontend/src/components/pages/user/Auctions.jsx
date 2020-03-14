import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import TopMessage from 'components/common/layout/TopMessage';
import Avatars from 'components/common/utils/Avatars';
import { Link } from '@reach/router';
import { getItems, twoDigitNumber } from 'utils/helpers';
import djLists from 'data/entertainers/djs';
import BackEndPage from 'components/common/layout/BackEndPage';
import { getTokenFromStore } from 'utils/localStorage';
import Humanize from 'humanize-plus';
import { getShortDate } from 'utils/date-helpers';
import NoContent from 'components/common/utils/NoContent';

const Auctions = () => {
  const [auctions, setAuctions] = React.useState([]);
  React.useEffect(() => {
    axios
      .get('/api/v1/auctions', {
        headers: {
          'x-access-token': getTokenFromStore()
        }
      })
      .then(function(response) {
        const { status, data } = response;
        console.log('status,data', status, data);
        // handle success
        if (status === 200) {
          setAuctions(data.events);
          console.log('Auctions: ', data.events);
        }
      })
      .catch(function(error) {
        console.log(error.response.data.message);
        // navigate to all events
      });
  }, []);
  console.log('auctions', auctions);
  return (
    <BackEndPage title="Auctions">
      <div className="main-app">
        <TopMessage message="Auctions" />

        <section className="app-content">
          {auctions.length > 0 ? (
            <AuctionsTable auctions={auctions} />
          ) : (
            <NoContent
              isButton
              linkText="Add a New Event"
              linkTo="/user/events/new"
              text={
                <>
                  No Auction Found.
                  <div className="small  mt-3">
                    You can create a new Auction after adding a new Event
                  </div>
                </>
              }
            />
          )}
        </section>
      </div>
    </BackEndPage>
  );
};

const AuctionsTable = ({ auctions }) => (
  <div className="table-responsive">
    <table className="table table-dark table__no-border table__with-bg">
      <tbody>
        {auctions.map((auction, index) => (
          <AuctionsRow
            auctionEndDate={auction.entertainers[0].auctionEndDate}
            city={auction.city}
            entertainerType={auction.entertainers[0].entertainerType}
            eventType={auction.eventType}
            key={index}
            number={index + 1}
            state={auction.state}
            totalApplications={auction.applications.length || 0}
          />
        ))}
      </tbody>
    </table>
  </div>
);

AuctionsTable.propTypes = {
  auctions: PropTypes.array.isRequired
};

const AuctionsRow = ({
  number,
  eventType,
  city,
  state,
  totalApplications,
  auctionEndDate,
  entertainerType
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
      <span className="text-red">
        {totalApplications}{' '}
        {Humanize.pluralize(totalApplications, 'application')}
      </span>
      <span>{entertainerType}</span>
    </td>
    <td>
      {false && <Avatars entertainers={getItems(djLists, 3)} others={14} />}
    </td>
    <td>
      <span className="text-yellow">Bidding closes on </span>
      <span>
        <i className="icon icon-clock" /> {getShortDate(auctionEndDate)}
      </span>
    </td>
    <td className="text-right">
      <Link className="btn btn-info btn-transparent" to="/user/auction/bids">
        View Bids
      </Link>
    </td>
  </tr>
);

AuctionsRow.propTypes = {
  auctionEndDate: PropTypes.any,
  city: PropTypes.string,
  entertainers: PropTypes.string,
  eventType: PropTypes.string,
  number: PropTypes.number,
  state: PropTypes.string,
  totalApplications: PropTypes.number
};

Auctions.defaultProps = {
  auctionEndDate: '',
  city: '',
  entertainers: '',
  eventType: '',
  number: 0,
  state: '',
  totalApplications: 0
};

export default Auctions;
