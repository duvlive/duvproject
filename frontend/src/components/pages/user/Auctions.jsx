import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import TopMessage from 'components/common/layout/TopMessage';
import Avatars from 'components/common/utils/Avatars';
import AlertMessage from 'components/common/utils/AlertMessage';
import { Link, Match } from '@reach/router';
import { getItems, twoDigitNumber } from 'utils/helpers';
import djLists from 'data/entertainers/djs';
import BackEndPage from 'components/common/layout/BackEndPage';
import { getTokenFromStore } from 'utils/localStorage';
import Humanize from 'humanize-plus';
import { getShortDate } from 'utils/date-helpers';
import NoContent from 'components/common/utils/NoContent';
import LoadItems from 'components/common/utils/LoadItems';

const Auctions = () => {
  const [auctions, setAuctions] = React.useState(null);
  React.useEffect(() => {
    axios
      .get('/api/v1/auctions', {
        headers: {
          'x-access-token': getTokenFromStore(),
        },
      })
      .then(function (response) {
        const { status, data } = response;
        // handle success
        if (status === 200) {
          setAuctions(data.auctions);
        }
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        setAuctions([]);
        // navigate to all events
      });
  }, []);

  return (
    <BackEndPage title="Auctions">
      <div className="main-app">
        <TopMessage message="Auctions" />

        <section className="app-content">
          <Match path="/user/auctions/status/success">
            {(props) =>
              // eslint-disable-next-line react/prop-types
              props.match && (
                <AlertMessage
                  message="Your Auction has been successfully approved"
                  type="success"
                />
              )
            }
          </Match>
          <Match path="/user/auctions/status/error">
            {(props) =>
              // eslint-disable-next-line react/prop-types
              props.match && (
                <AlertMessage
                  message="The selected auction cannot be found or has already been approved."
                  type="error"
                />
              )
            }
          </Match>
          <LoadItems
            items={auctions}
            loadingText="Loading your Auctions"
            noContent={
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
            }
          >
            <AuctionsTable auctions={auctions || []} />
          </LoadItems>
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
            auctionEndDate={auction.auctionEndDate}
            city={auction.event.city}
            entertainerType={auction.entertainerType}
            eventType={auction.event.eventType}
            id={auction.id}
            key={index}
            number={index + 1}
            state={auction.event.state}
            totalApplications={auction.applications.length || 0}
          />
        ))}
      </tbody>
    </table>
  </div>
);

AuctionsTable.propTypes = {
  auctions: PropTypes.array.isRequired,
};

const AuctionsRow = ({
  number,
  eventType,
  city,
  id,
  state,
  totalApplications,
  auctionEndDate,
  entertainerType,
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
      {totalApplications !== 0 && (
        <Link
          className="btn btn-info btn-transparent"
          to={`/user/auction/bids/${id}`}
        >
          View Bids
        </Link>
      )}
    </td>
  </tr>
);

AuctionsRow.propTypes = {
  auctionEndDate: PropTypes.any,
  city: PropTypes.string,
  entertainerType: PropTypes.string,
  entertainers: PropTypes.string,
  eventType: PropTypes.string,
  id: PropTypes.any,
  number: PropTypes.number,
  state: PropTypes.string,
  totalApplications: PropTypes.number,
};

Auctions.defaultProps = {
  auctionEndDate: '',
  city: '',
  entertainerType: '',
  entertainers: '',
  eventType: '',
  id: '',
  number: 0,
  state: '',
  totalApplications: 0,
};

export default Auctions;
