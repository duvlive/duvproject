import React from 'react';
import PropTypes from 'prop-types';
import TopMessage from 'components/common/layout/TopMessage';
import axios from 'axios';
import BackEndPage from 'components/common/layout/BackEndPage';
import { navigate } from '@reach/router';
import { getTokenFromStore } from 'utils/localStorage';
import {
  getNumberOfDaysToEvent,
  getLongDate,
  subtractDays,
} from 'utils/date-helpers';
import {
  userCanAddEntertainer,
  eventHasExpired,
  eventIsVoid,
  auctionIsVoid,
} from 'utils/event-helpers';
import AlertMessage from 'components/common/utils/AlertMessage';
import Image from 'components/common/utils/Image';
import {
  moneyFormat,
  twoDigitNumber,
  getBudgetRange,
  getAverageRatings,
} from 'utils/helpers';
import Stars from 'components/common/utils/Stars';
import LoadingScreen from 'components/common/layout/LoadingScreen';
import ProfileAvatar from 'assets/img/avatar/profile.png';

const SingleEventBids = ({ eventEntertainerId }) => {
  const [eventEntertainer, setEventEntertainer] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    eventEntertainerId &&
      axios
        .get(`/api/v1/auctions/bids/${eventEntertainerId}`, {
          headers: {
            'x-access-token': getTokenFromStore(),
          },
        })
        .then(function (response) {
          const { status, data } = response;
          // handle success
          if (status === 200) {
            setEventEntertainer(data.eventEntertainer);
            setLoading(false);
          }
        })
        .catch(function (error) {
          navigate('/admin/dashboard');
          setLoading(false);
        });
  }, [eventEntertainerId]);

  if (!eventEntertainer.event) {
    return null;
    // TODO
  }

  console.log('eventEntertainer', eventEntertainer);

  const eventDate = eventEntertainer.event.eventDate;
  return (
    <BackEndPage title="All Bids">
      <div className="main-app">
        <TopMessage />
        {loading ? (
          <LoadingScreen loading={loading} text="Loading Entertainers" />
        ) : (
          <>
            <section className="app-content">
              {/* Event Name and Event Status */}
              <section className="row mb-3">
                <div className="col-sm-12">
                  <h3 className="main-app__title">
                    {eventEntertainer.event.eventType} <br />{' '}
                  </h3>

                  <h6 className="text-white small">
                    Budget:{' '}
                    {getBudgetRange(
                      eventEntertainer.lowestBudget,
                      eventEntertainer.highestBudget
                    )}{' '}
                  </h6>

                  <small className="main-app__small remaining-time">
                    <i className="icon icon-calendar"></i>
                    {getLongDate(eventDate)}
                  </small>
                </div>
              </section>

              {/* Event Details and Entertainers */}
              <aside className="row">
                <div className="col-md-12">
                  {eventHasExpired(eventDate) && (
                    <AlertMessage
                      message="Event has expired. Bids can no longer be approved."
                      type="error"
                    />
                  )}

                  {!eventHasExpired(eventDate) && eventIsVoid(eventDate) && (
                    <AlertMessage
                      message="Bids can no longer be approved 48 hours before event"
                      type="error"
                    />
                  )}

                  {userCanAddEntertainer(eventDate) &&
                    auctionIsVoid(eventDate) && (
                      <AlertMessage
                        message="Your event is closing soon within 1 day, select your entertainer now"
                        type="warning"
                      />
                    )}

                  {!auctionIsVoid(eventDate) && (
                    <AlertMessage
                      message={
                        <>
                          This auction will close on{' '}
                          {getLongDate(subtractDays(eventDate, 4))} - &nbsp;
                          <span className="text-white">
                            {getNumberOfDaysToEvent(eventDate)} remaining
                          </span>
                        </>
                      }
                      type="info"
                    />
                  )}

                  {userCanAddEntertainer(eventDate) && (
                    <BidsApplicationsTable
                      applications={eventEntertainer.applications || []}
                    />
                  )}
                </div>
              </aside>
            </section>
          </>
        )}
      </div>
    </BackEndPage>
  );
};

SingleEventBids.propTypes = {
  eventEntertainerId: PropTypes.string,
};

SingleEventBids.defaultProps = {
  eventEntertainerId: null,
};

const BidsApplicationsTable = ({ applications }) => {
  const [allApplications, setAllApplications] = React.useState(applications);
  const [currentSort, setSort] = React.useState('oldest');
  const sortBids = (type) => {
    const sorted = [].concat(allApplications).sort((a, b) => {
      switch (type) {
        case 'oldest':
          return a.id - b.id;
        case 'newest':
          return b.id - a.id;
        case 'lowest':
          return parseInt(a.askingPrice, 10) - parseInt(b.askingPrice, 10);
        case 'highest':
          return parseInt(b.askingPrice, 10) - parseInt(a.askingPrice, 10);
        case 'ratings':
          return (
            getAverageRatings(b.user.profile.ratings) -
            getAverageRatings(a.user.profile.ratings)
          );

        default:
          break;
      }
      return null;
    });
    setAllApplications(sorted);
    setSort(type);
  };

  const sortButton = (name, sort) => (
    <button
      className={`nav-link btn ${currentSort === sort && 'active'}`}
      onClick={() => sortBids(sort)}
    >
      {name}
    </button>
  );

  return allApplications.length > 0 ? (
    <div className="table-responsive">
      <table className="table table-dark  table__no-border table__with-bg">
        <thead>
          <tr className="transparent">
            <td colSpan="7">
              <h3 className="event-title text-blue">Current Bids</h3>
              {/* SORT */}
              <nav className="nav nav-pills nav-sort nav-pull-right">
                <div className="nav-link disabled btn nav-text">Sort By: </div>
                {sortButton('Oldest', 'oldest')}
                {sortButton('Newest', 'newest')}
                {sortButton('Lowest Price', 'lowest')}
                {sortButton('Highest Price', 'highest')}
                {sortButton('Ratings', 'ratings')}
              </nav>
            </td>
          </tr>
        </thead>

        <tbody>
          {allApplications.map((application, index) => (
            <BidsApplicationsTableRow
              application={application}
              key={index}
              number={index + 1}
            />
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <h3 className="text-white event-title ml-0 mt-5">
      You have no Entertainer in Review
    </h3>
  );
};

BidsApplicationsTable.propTypes = {
  applications: PropTypes.array.isRequired,
};

const BidsApplicationsTableRow = ({ application, number }) => {
  if (!application && !application.user && !application.user.profile) {
    return null;
  }

  const avgRating = getAverageRatings(application.user.profile.ratings);
  return (
    <tr>
      <th className="table__number" scope="row">
        {twoDigitNumber(number)}
      </th>
      <td className="align-middle">
        {application && (
          <Image
            className="avatar--medium--small"
            name={application.user.profile.stageName || 'No name'}
            responsiveImage={false}
            src={application.user.profileImageURL || ProfileAvatar}
          />
        )}
      </td>
      <td className="align-middle text-gray">
        <span className="text-muted small--4">Stage name</span>{' '}
        {application.user.profile.stageName}
      </td>
      <td className="align-middle text-yellow">
        <span className="text-muted small--4">Asking Price</span> &#8358;{' '}
        {moneyFormat(application.askingPrice)}
      </td>
      <td className="align-middle text-white td-btn">
        <span className="text-muted small--4">Ratings</span>{' '}
        {avgRating > 0 ? (
          <Stars
            name={application.user.profile.stageName}
            rating={getAverageRatings(application.user.profile.ratings)}
          />
        ) : (
          <span className="text-muted-light-2">No Ratings Yet</span>
        )}
      </td>
      <td className="align-middle text-gray">
        <span className="text-muted small--4">Location</span>{' '}
        {application.user.profile.location}
      </td>
      <td className="align-middle text-right td-btn">
        <a
          className="btn btn-info btn-sm btn-transparent"
          href={`/entertainers/profile/${application.user.profile.slug}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          View Profile
        </a>
      </td>
    </tr>
  );
};
BidsApplicationsTableRow.propTypes = {
  application: PropTypes.object,
  number: PropTypes.number.isRequired,
};
BidsApplicationsTableRow.defaultProps = {
  application: {},
};

export default SingleEventBids;
