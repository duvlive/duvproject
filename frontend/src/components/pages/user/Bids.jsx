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
import ViewEvent from './ViewEvent';
import Image from 'components/common/utils/Image';
import DuvLiveModal from 'components/custom/Modal';

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
          // navigate to all events
          navigate('/user/auctions');
        });
  }, [eventEntertainerId]);

  console.log('eventEntertainer', eventEntertainer);

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
            <div className="col-md-8">
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

              <Bids.ApplicationsTable
                applications={eventEntertainer.applications || []}
              />
            </div>
            <div className="col-md-4">
              <ViewEvent.EventDetailsCard event={eventEntertainer.event} />
              {!eventHasExpired(eventEntertainer.event.eventDate) && (
                <div className="text-right cancel-event__text mt-3 mb-5">
                  <i className="icon icon-cancel"></i> Cancel Event
                </div>
              )}
            </div>
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

Bids.ApplicationsTable = ({ applications }) => {
  return applications.length > 0 ? (
    <div className="table-responsive">
      <table className="table table-dark  table__no-border table__with-bg">
        <thead>
          <tr className="transparent">
            <td colSpan="5">
              <h3 className="event-title text-blue">Current Applications</h3>
            </td>
          </tr>
        </thead>

        <tbody>
          {applications.map((application, index) => (
            <Bids.ApplicationsTableRow application={application} key={index} />
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

Bids.ApplicationsTable.propTypes = {
  applications: PropTypes.array.isRequired
};

Bids.ApplicationsTableRow = ({ application }) => {
  if (!application && !application.user && !application.user.profile) {
    return null;
  }
  // build entertainer for modal
  const entertainer = {
    stageName: application.user.profile.stageName,
    profileImageURL: application.user.profileImageURL,
    about: application.user.profile.about
  };

  return (
    <tr>
      <td className="align-middle">
        {application && (
          <Image
            className="avatar--medium"
            name={application.user.profile.stageName || 'No name'}
            responsiveImage={false}
            src={application.user.profileImageURL || 'No src'}
          />
        )}
      </td>
      <td className="align-middle text-right">
        {application.user.profile.stageName}
      </td>
      <td className="align-middle text-yellow">{application.askingPrice}</td>
      <td className="align-middle text-right td-btn">
        <button className="btn btn-danger btn-sm btn-transparent">
          Approve Bid
        </button>
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
  application: PropTypes.object
};
Bids.ApplicationsTableRow.defaultProps = {
  application: {}
};

export default Bids;
