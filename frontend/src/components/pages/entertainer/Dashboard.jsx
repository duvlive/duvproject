import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import DashboardCard from 'components/common/utils/DashboardCard';
import Onboarding from 'components/pages/entertainer/Onboarding';
import Events from 'components/pages/entertainer/UpcomingEvents';
import { BidsRow } from 'components/pages/entertainer/Bids';
import { RequestsRow } from 'components/pages/entertainer/Requests';
import { AuctionsRow } from 'components/pages/entertainer/AvailableAuctions';
import { UserContext } from 'context/UserContext';
import { getTokenFromStore } from 'utils/localStorage';
import LoadingScreen from 'components/common/layout/LoadingScreen';
import { twoDigitNumber, getItems, moneyFormatInNaira } from 'utils/helpers';
import { InviteFriendsForm } from 'components/common/pages/InviteFriends';
import NoContent from 'components/common/utils/NoContent';
import { getTinyDate } from 'utils/date-helpers';
import LoadItems from 'components/common/utils/LoadItems';

import Humanize from 'humanize-plus';

const Dashboard = () => {
  const { userState } = React.useContext(UserContext);

  let currentDashboard;

  if (userState.entertainerProfile.approved == null) {
    currentDashboard = <LoadingScreen text="Loading your Dashboard" />;
  } else if (userState.entertainerProfile.approved === false) {
    currentDashboard = <Onboarding />;
  } else {
    currentDashboard = <DashboardItems />;
  }

  return (
    <BackEndPage title="Dashboard">
      <div className="main-app">{currentDashboard}</div>
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
      .get(`/api/v1/applications/dashboard/entertainer`, {
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

  const stageName = Humanize.capitalize(userState.entertainerProfile.stageName);

  return (
    <>
      <TopMessage message={`Welcome back ${stageName},`} />
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
            to="/entertainer/events"
          />
          <DashboardCard
            color="yellow"
            icon="auction"
            number={
              applications.auctions == null
                ? null
                : twoDigitNumber(applications.auctions.length)
            }
            summary="Available Auctions"
            title="Auction"
            to="/entertainer/available-auctions"
          />
          <DashboardCard
            color="blue"
            icon="vcard"
            number={
              applications.requests == null
                ? null
                : twoDigitNumber(applications.requests.length)
            }
            summary="Pending Requests"
            title="Requests"
            to="/entertainer/requests"
          />
        </div>
        <div className="row">
          <div className="col-sm-8">
            {applications.requests && applications.requests.length > 0 && (
              <Dashboard.RecentRequests
                requests={getItems(applications.requests, 2)}
              />
            )}
            {applications.upcomingEvents &&
              applications.upcomingEvents.length > 0 && (
                <Dashboard.UpcomingEvents
                  events={getItems(applications.upcomingEvents, 2) || []}
                />
              )}
            {applications.bids && applications.bids.length > 0 && (
              <Dashboard.RecentBids bids={getItems(applications.bids, 2)} />
            )}
            {applications.auctions && applications.auctions.length > 0 && (
              <Dashboard.RecentAuctions
                auctions={getItems(applications.auctions, 2)}
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
            <Dashboard.PaymentHistory
              payments={userState.entertainerProfile.payments || null}
            />
            <Dashboard.InviteFriends />
            {/* <Dashboard.RecentBadges /> */}
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
            <Events.CardList events={events} />
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

Dashboard.UpcomingEvents.propTypes = {
  events: PropTypes.array.isRequired,
};

Dashboard.PaymentHistory = ({ payments }) => (
  <div className="card card-custom">
    <div className="card-body">
      <h5 className="font-weight-normal mb-3 text-green">Recent Payments</h5>
      <div className="table-responsive">
        <LoadItems
          items={payments}
          noContent={<NoContent text="You have no payment History" />}
        >
          <table className="table table-dark table-border--x">
            <tbody>
              {payments &&
                payments.length > 0 &&
                payments.map((payment, index) => (
                  <Dashboard.PaymentRow key={index} payment={payment} />
                ))}
            </tbody>
          </table>
        </LoadItems>
      </div>
    </div>
  </div>
);

Dashboard.PaymentHistory.propTypes = {
  payments: PropTypes.any,
};

Dashboard.PaymentRow = ({ payment }) => (
  <tr>
    <td className="pt-3">{getTinyDate(payment.createdAt)}</td>
    <td className="text-muted-light-2">{moneyFormatInNaira(payment.amount)}</td>
  </tr>
);

Dashboard.PaymentRow.propTypes = {
  payment: PropTypes.object.isRequired,
};

Dashboard.RecentBids = ({ bids }) => (
  <div className="card card-custom">
    <div className="card-body">
      <h5 className="font-weight-normal text-white">Recent Bids</h5>
      <div className="table-responsive">
        <table className="table table-dark table__no-border table__with-bg">
          <tbody>
            {bids.map((bid, index) => (
              <BidsRow
                askingPrice={bid.applications[0].askingPrice}
                auctionEndDate={bid.auctionEndDate}
                city={bid.event.city}
                eventType={bid.event.eventType}
                id={bid.applications[0].id}
                key={index}
                number={index + 1}
                state={bid.event.state}
                status={bid.applications[0].status}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

Dashboard.RecentBids.propTypes = {
  bids: PropTypes.array.isRequired,
};

Dashboard.RecentRequests = ({ requests }) => (
  <div className="card card-custom">
    <div className="card-body">
      <h5 className="font-weight-normal text-blue">Recent Requests</h5>
      <div className="table-responsive">
        <table className="table table-dark table__no-border table__with-bg">
          <tbody>
            {requests.map((request, index) => (
              <RequestsRow
                askingPrice={request.applications[0].askingPrice}
                city={request.event.city}
                eventType={request.event.eventType}
                expiryDate={request.applications[0].expiryDate}
                id={request.applications[0].id}
                key={index}
                number={index + 1}
                state={request.event.state}
                status={request.applications[0].status}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

Dashboard.RecentRequests.propTypes = {
  requests: PropTypes.array.isRequired,
};

Dashboard.RecentAuctions = ({ auctions }) => (
  <div className="card card-custom">
    <div className="card-body">
      <h5 className="font-weight-normal text-yellow">Recent Auctions</h5>
      <div className="table-responsive">
        <table className="table table-dark table__no-border table__with-bg">
          <tbody>
            {auctions.map((auction, index) => (
              <AuctionsRow
                auctionEndDate={auction.auctionEndDate}
                city={auction.event.city}
                eventType={auction.event.eventType}
                highestBudget={auction.highestBudget}
                id={auction.id}
                key={index}
                lowestBudget={auction.lowestBudget}
                number={index + 1}
                state={auction.event.state}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

Dashboard.RecentAuctions.propTypes = {
  auctions: PropTypes.array.isRequired,
};

Dashboard.RecentBadges = () => (
  <div className="card card-custom">
    <div className="card-body">
      <h5 className="card-title text-blue">Recent Badges</h5>
      <div className="table-responsive">
        <table className="table table-dark">
          <tbody>
            <tr valign="middle">
              <td>
                <i className="icon icon-badge text-yellow icon-sm"></i>{' '}
              </td>
              <td className="text-white pt-4">Certified Duv Entertainer</td>
            </tr>
            <tr>
              <td>
                <i className="icon icon-badge text-red icon-sm d-inline-block"></i>{' '}
              </td>
              <td className="text-white pt-4">Completed 5 events</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default Dashboard;
