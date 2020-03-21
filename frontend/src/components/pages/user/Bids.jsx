import React from 'react';
import PropTypes from 'prop-types';
import TopMessage from 'components/common/layout/TopMessage';
import axios from 'axios';
import BackEndPage from 'components/common/layout/BackEndPage';
import { navigate } from '@reach/router';
import { getTokenFromStore } from 'utils/localStorage';
import { remainingDays } from 'utils/date-helpers';
import { eventIsVoid, eventHasExpired } from 'utils/event-helpers';
import AlertMessage from 'components/common/utils/AlertMessage';
import Image from 'components/common/utils/Image';
import DuvLiveModal from 'components/custom/Modal';
import { moneyFormat, twoDigitNumber } from 'utils/helpers';
import Stars from 'components/common/utils/Stars';

const Bids = ({ eventEntertainerId }) => {
  const [eventEntertainer, setEventEntertainer] = React.useState({});
  React.useEffect(() => {
    eventEntertainerId &&
      axios
        .get(`/api/v1/auctions/bids/${eventEntertainerId}`, {
          headers: {
            'x-access-token': getTokenFromStore()
          }
        })
        .then(function(response) {
          const { status, data } = response;
          // handle success
          if (status === 200) {
            setEventEntertainer(data.eventEntertainer);
          }
        })
        .catch(function(error) {
          // console.log(error.response.data.message);
          // navigate to all events: TODO
          // navigate('/user/auctions');
        });
  }, [eventEntertainerId]);

  if (!eventEntertainer.event) {
    console.log('eventEntertainer.eventDate', eventEntertainer.eventDate);
    return <h1>nothing is here</h1>;
  }

  return (
    <BackEndPage title="All Bids">
      <div className="main-app">
        <TopMessage />
        <section className="app-content">
          {/* Event Name and Event Status */}
          <section className="row">
            <div className="col-sm-12">
              <h3 className="main-app__title">
                {eventEntertainer.event.eventType} <br />{' '}
                <small className="main-app__small remaining-time">
                  <i className="icon icon-hourglass"></i>
                  {!eventHasExpired(eventEntertainer.event.eventDate) && (
                    <>{remainingDays(eventEntertainer.event.eventDate)}</>
                  )}
                </small>
              </h3>
            </div>
          </section>

          {/* Event Details and Entertainers */}
          <aside className="row">
            <div className="col-md-12">
              {/* TODO: DAY AUCTION WILL EXPIRE, NO MORE BIDS, TIPS ON SELECTING YOUR BEST PRICE  */}
              {eventHasExpired(eventEntertainer.event.eventDate) && (
                <AlertMessage message="Event Date has passed" type="error" />
              )}
              {!eventHasExpired(eventEntertainer.event.eventDate) &&
                eventIsVoid(eventEntertainer.event.eventDate) && (
                  <AlertMessage
                    message="Event can no longer be edited."
                    type="info"
                  />
                )}

              <BidsApplicationsTable
                applications={eventEntertainer.applications || []}
              />
            </div>
            {/* <div className="col-md-4">
              <ViewEvent.EventDetailsCard event={eventEntertainer.event} />
              {!eventHasExpired(eventEntertainer.event.eventDate) && (
                <div className="text-right cancel-event__text mt-3 mb-5">
                  <i className="icon icon-cancel"></i> Cancel Event
                </div>
              )}
            </div> */}
          </aside>
        </section>
      </div>
    </BackEndPage>
  );
};

Bids.propTypes = {
  eventEntertainerId: PropTypes.string
};

Bids.defaultProps = {
  eventEntertainerId: null
};

const BidsApplicationsTable = ({ applications }) => {
  const [allApplications, setAllApplications] = React.useState(applications);
  const [currentSort, setSort] = React.useState('oldest');
  const sortBids = type => {
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
                {/* {sortButton('Ratings', 'ratings')} */}
              </nav>
            </td>
          </tr>
        </thead>

        <tbody>
          {allApplications.map((application, index) => (
            <Bids.ApplicationsTableRow
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
  applications: PropTypes.array.isRequired
};

Bids.ApplicationsTableRow = ({ application, number }) => {
  if (!application && !application.user && !application.user.profile) {
    return null;
  }
  // build entertainer for modal
  const entertainer = {
    stageName: application.user.profile.stageName,
    profileImageURL: application.user.profileImageURL,
    about: application.user.profile.about
  };

  const approveApplication = () => {
    axios
      .post(
        `/api/v1/applications/approve/${application.id}`,
        {},
        {
          headers: {
            'x-access-token': getTokenFromStore()
          }
        }
      )
      .then(function(response) {
        const { status } = response;
        // handle success
        if (status === 200) {
          navigate('/user/auctions');
        }
      })
      .catch(function(error) {
        console.log(error.response.data.message);
        // TODO: ADD ERROR ALERT HERE
      });
  };

  return (
    <tr>
      <th className="table__number" scope="row">
        {twoDigitNumber(number)}
      </th>
      <td className="align-middle">
        {application && (
          <Image
            className="avatar--medium-small"
            name={application.user.profile.stageName || 'No name'}
            responsiveImage={false}
            src={application.user.profileImageURL || 'No src'}
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
        <Stars name={application.user.profile.stageName} rating={4.5} />
      </td>
      <td className="align-middle text-gray">
        <span className="text-muted small--4">Location</span>{' '}
        {application.user.profile.location}
      </td>
      <td className="align-middle text-right td-btn">
        <DuvLiveModal
          actionFn={approveApplication}
          actionText="Approve Bid"
          body={<h1>Approval Body</h1>} // TODO: ADD BODY HERE
          closeModalText="Cancel"
          title="Delete Image"
        >
          <button className="btn btn-success btn-sm btn-transparent">
            Approve
          </button>
        </DuvLiveModal>
      </td>
      <td className="align-middle text-right td-btn">
        {entertainer && (
          <DuvLiveModal.ViewEntertainerProfile entertainer={entertainer} />
        )}
      </td>
    </tr>
  );
};
Bids.ApplicationsTableRow.propTypes = {
  application: PropTypes.object,
  number: PropTypes.number.isRequired
};
Bids.ApplicationsTableRow.defaultProps = {
  application: {}
};

export default Bids;
