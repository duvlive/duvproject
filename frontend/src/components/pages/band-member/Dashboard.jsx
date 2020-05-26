import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import DashboardCard from 'components/common/utils/DashboardCard';
import { UserContext } from 'context/UserContext';
import { getTokenFromStore } from 'utils/localStorage';
import {
  twoDigitNumber,
  getItems,
  moneyFormatInNaira,
  priceCalculatorHelper,
} from 'utils/helpers';
import { Link } from '@reach/router';
import Timeago from 'react-timeago';
import { getEventDate, getTime, getTimeOfDay } from 'utils/date-helpers';
import { InviteFriendsForm } from 'components/common/pages/InviteFriends';
import NoContent from 'components/common/utils/NoContent';
import LoadItems from 'components/common/utils/LoadItems';
import Humanize from 'humanize-plus';

const Dashboard = () => {
  return (
    <BackEndPage title="Dashboard">
      <div className="main-app">
        <DashboardItems />
      </div>
    </BackEndPage>
  );
};

const DashboardItems = () => {
  const { userState } = React.useContext(UserContext);
  const [applications, setApplications] = React.useState({
    auctions: null,
    bids: null,
    requests: null,
    upcomingEvents: null,
  });
  React.useEffect(() => {
    axios
      .get(`/api/v1/applications/dashboard/bandMember`, {
        headers: {
          'x-access-token': getTokenFromStore(),
        },
      })
      .then(function (response) {
        const { status, data } = response;
        // handle success
        if (status === 200) {
          setApplications(data.results);
          console.log('results', data.results);
        }
      })
      .catch(function (error) {
        setApplications([]);
      });
  }, []);

  const firstName = Humanize.capitalize(userState.firstName);

  return (
    <>
      <TopMessage message={`Welcome back ${firstName},`} />
      <section className="app-content">
        <div className="row">
          <DashboardCard
            color="green"
            icon="calendar"
            number={
              applications.upcomingEvents == null
                ? null
                : twoDigitNumber(applications.upcomingEvents.length)
            }
            summary="Upcoming Events"
            title="Events"
            to="/band-member/events"
          />
          <DashboardCard
            color="yellow"
            icon="credit-card"
            number={
              applications.allPayments == null
                ? null
                : twoDigitNumber(applications.allPayments)
            }
            summary="Received Payments"
            title="Payments"
            to="/band-member/payments"
          />
          <DashboardCard
            color="blue"
            icon="users"
            number={
              applications.bandMembers == null
                ? null
                : twoDigitNumber(applications.bandMembers)
            }
            summary="Verified Band Members"
            title="Band Members"
            to="/band-member/team-members"
          />
        </div>
        <div className="row">
          <div className="col-sm-8">
            {applications.upcomingEvents &&
              applications.upcomingEvents.length > 0 && (
                <Dashboard.UpcomingEvents
                  events={getItems(applications.upcomingEvents, 2) || []}
                />
              )}
            {applications.upcomingEvents &&
              applications.upcomingEvents.length === 0 && (
                <div className="card card-custom">
                  <div className="card-body">
                    <NoContent text="You have no Upcoming Events" />
                  </div>
                </div>
              )}
          </div>
          <div className="col-sm-4">
            <Dashboard.PendingPayments
              pendingPayments={applications.pendingPayments}
            />
            <Dashboard.InviteFriends />
          </div>
        </div>
      </section>
    </>
  );
};

Dashboard.InviteFriends = () => (
  <div className="card card-custom">
    <div className="card-body">
      <h5 className="card-title text-red header__with-border">
        Recommend a Friend
      </h5>
      <InviteFriendsForm widget />
    </div>
  </div>
);

Dashboard.UpcomingEvents = ({ events }) => (
  <div className="card card-custom">
    <div className="card-body">
      <h5 className="font-weight-normal text-green">Upcoming Events</h5>
      <div className="table-responsive">
        <table className="table table-dark table__no-border table__with-bg">
          <tbody>
            <Dashboard.EventsCardList events={events} />
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

Dashboard.UpcomingEvents.propTypes = {
  events: PropTypes.array.isRequired,
};

Dashboard.EventsCardList = ({ events, title }) => {
  if (events.length === 0) return null;

  const eventCard = events.map((event, index) => (
    <Dashboard.EventCard
      eventDate={event.event.eventDate}
      eventDuration={event.event.eventDuration}
      eventEntertainerId={event.id}
      eventType={event.event.eventType}
      key={index}
      lga={event.event.lga}
      owner={event.event.owner}
      startTime={event.startTime}
      state={event.event.state}
    />
  ));
  return (
    <>
      {title && (
        <tr className="transparent">
          <td colSpan="5">
            <h3 className={`event-title`}>{title}</h3>
          </td>
        </tr>
      )}
      {eventCard}
      <tr className="transparent">
        <td colSpan="5">
          <div className={`event-spacer`} />
        </td>
      </tr>
    </>
  );
};

Dashboard.EventsCardList.propTypes = {
  events: PropTypes.array,
  title: PropTypes.string,
};

Dashboard.EventsCardList.defaultProps = {
  title: null,
  events: [],
};

Dashboard.EventCard = ({
  eventEntertainerId,
  eventType,
  eventDate,
  startTime,
  eventDuration,
  lga,
  state,
  owner,
}) => {
  return (
    <>
      <tr className="transparent">
        <td colSpan="5">
          <h4 className="main-app__subtitle">
            <Timeago date={eventDate} />
          </h4>
        </td>
      </tr>
      <tr>
        <td className="pl-4">
          <span className="subtitle--2 text-red text-uppercase">
            {getEventDate(eventDate)}
          </span>
          <span className="small--3 text-gray">
            {getTime(startTime)} ({getTimeOfDay(startTime)})
          </span>
        </td>
        <td>
          <div className="table__title text-white">{eventType}</div>
          <span className="small--2">Duration: {eventDuration} &nbsp;</span>
        </td>
        <td>
          <span className="text-yellow">
            <i className="icon icon-user-circle text-color" /> &nbsp;
            {owner.firstName + ' ' + owner.lastName} &nbsp;
          </span>
          <span>
            <i className="icon icon-location" /> &nbsp;
            {lga}, {state} State
          </span>
        </td>
        <td className="text-right">
          <Link
            className="btn btn-info btn-transparent"
            to={`/entertainer/events/view/${eventEntertainerId}`}
          >
            View Event
          </Link>
        </td>
      </tr>
    </>
  );
};

Dashboard.EventCard.propTypes = {
  eventDate: PropTypes.string,
  eventDuration: PropTypes.string,
  eventEntertainerId: PropTypes.any,
  eventType: PropTypes.string,
  lga: PropTypes.string,
  owner: PropTypes.object.isRequired,
  startTime: PropTypes.string,
  state: PropTypes.string,
};

Dashboard.EventCard.defaultProps = {
  eventEntertainerId: '0',
  eventDuration: null,
  eventDate: null,
  eventType: null,
  lga: null,
  startTime: null,
  state: null,
};

Dashboard.PendingPayments = ({ pendingPayments }) => (
  <div className="card card-custom">
    <div className="card-body">
      <h5 className="font-weight-normal text-green">Pending Payments</h5>
      <small className="text-muted d-block  mb-3">
        {pendingPayments && pendingPayments.length > 0 && (
          <>
            You have {pendingPayments.length} pending{' '}
            {Humanize.pluralize(pendingPayments.length, 'payment')}
          </>
        )}
      </small>

      <div className="table-responsive">
        <LoadItems
          items={pendingPayments}
          noContent={<NoContent text="You have no pending payments" />}
        >
          <table className="table table-dark table-border--x">
            <tbody>
              {pendingPayments &&
                pendingPayments.length > 0 &&
                pendingPayments.map((payment, index) => {
                  const price = payment.applications[0].proposedPrice
                    ? payment.applications[0].proposedPrice
                    : payment.applications[0].askingPrice;
                  const calculatedPrice = priceCalculatorHelper(
                    price,
                    payment.applications[0].commission,
                    payment.hireType
                  );
                  return (
                    <Dashboard.PendingPaymentRow
                      event={payment.event.eventType}
                      key={index}
                      payment={calculatedPrice.entertainerFee}
                    />
                  );
                })}
            </tbody>
          </table>
        </LoadItems>
      </div>
    </div>
  </div>
);

Dashboard.PendingPayments.propTypes = {
  pendingPayments: PropTypes.array,
};

Dashboard.PendingPayments.defaultProps = {
  pendingPayments: [],
};

Dashboard.PendingPaymentRow = ({ event, payment }) => (
  <tr>
    <td className="pt-3">{event}</td>
    <td className="text-muted-light-2">{moneyFormatInNaira(payment)}</td>
  </tr>
);

Dashboard.PendingPaymentRow.propTypes = {
  event: PropTypes.string.isRequired,
  payment: PropTypes.any.isRequired,
};

export default Dashboard;
