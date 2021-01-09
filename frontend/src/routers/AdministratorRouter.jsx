import React from 'react';
import { Router } from '@reach/router';
import Dashboard from 'components/pages/administrator/Dashboard';
import Entertainers from 'components/pages/administrator/Entertainers';
import SingleUser from 'components/pages/administrator/SingleUser';
import SingleEntertainer from 'components/pages/administrator/SingleEntertainer';
import SingleBadge from 'components/pages/administrator/SingleBadge';
import SingleEvent from 'components/pages/administrator/SingleEvent';
import SingleEventBids from 'components/pages/administrator/SingleEventBids';
import SingleEventRequest from 'components/pages/administrator/SingleEventRequest';
import EntertainersPayment from 'components/pages/administrator/EntertainersPayment';
import RegisteredUsers from 'components/pages/administrator/RegisteredUsers';
import Auctions from 'components/pages/administrator/Auctions';
import Requests from 'components/pages/administrator/Requests';
import UsersPayment from 'components/pages/administrator/UsersPayment';
import UpcomingEvents from 'components/pages/administrator/UpcomingEvents';
import EditProfile from 'components/pages/administrator/EditProfile';
import Gallery from 'components/pages/administrator/Gallery';
import Commission from 'components/pages/administrator/Commission';
import Videos from 'components/pages/administrator/Videos';
import Badges from 'components/pages/administrator/Badges';
import BandMembers from 'components/pages/administrator/BandMembers';
import Events from 'components/pages/administrator/Events';
import Help from 'components/pages/user/Help';
import Logout from 'components/pages/auth/Logout';
import InviteFriends from 'components/common/pages/InviteFriends';
import Notifications from 'components/common/pages/Notifications';
import ChangePassword from 'components/common/pages/ChangePassword';
import UserPaymentDetails from 'components/pages/administrator/UserPaymentDetails';
import PendingPayments from 'components/pages/administrator/PendingPayments';
import PayPendingEntertainer from 'components/pages/administrator/PayPendingEntertainer';
import PublicEvent from 'components/pages/administrator/PublicEvent';
import SinglePublicEvent from 'components/pages/administrator/SinglePublicEvent';
import GlobalNotifications from 'components/pages/administrator/GlobalNotifications';
import CronJobNotifications from 'components/pages/administrator/CronJobNotifications';
import UnresolvedEvents from 'components/pages/administrator/UnresolvedEvents';
import ResolvedEvents from 'components/pages/administrator/ResolvedEvents';
import SingleUnresolvedEvent from 'components/pages/administrator/SingleUnresolvedEvent';
import SMSReports from 'components/pages/administrator/SMSReports';

const AdministratorRouter = () => (
  <Router>
    <Dashboard path="/dashboard" />
    <Entertainers path="/entertainers" />
    <EntertainersPayment path="/entertainers-payment" />
    <RegisteredUsers path="/registered-users" />
    <Auctions path="/auctions" />
    <Auctions path="/auctions/:id" />
    <Requests path="/requests" />
    <Requests path="/requests/:id" />
    <SingleUser path="/users/:id" />
    <SingleEntertainer path="/entertainers/:id" />
    <UsersPayment path="/users-payment" />
    <PublicEvent path="/public-events" />
    <SinglePublicEvent path="/public-events/:id" />
    <UserPaymentDetails path="/user-payments/:applicationId" />
    <PayPendingEntertainer path="/pay-entertainer/:applicationId" />
    <PendingPayments path="/pending-payments" />
    <Notifications path="/notifications" />
    <UpcomingEvents path="/upcoming-events" />
    <GlobalNotifications path="/global-notifications" />
    <GlobalNotifications path="/global-notifications/:showAll" />
    <CronJobNotifications path="/cron" />
    <SingleEvent path="/events/:id" />
    <SingleEventBids path="/auction/bids/:eventEntertainerId" />
    <SingleEventRequest path="/request/view/:applicationId" />
    <EditProfile path="/edit-profile" />
    <Gallery path="/gallery" />
    <Videos path="/videos" />
    <Badges path="/badges" />
    <SingleBadge path="/badges/:id" />
    <BandMembers path="/band-members" />
    <Commission path="/commission" />
    <Events path="/events" />
    <InviteFriends path="/invite-friends" />
    <ChangePassword path="/change-password" />
    <ResolvedEvents path="/resolved-events" />
    <UnresolvedEvents path="/unresolved-events" />
    <SingleUnresolvedEvent path="/unresolved-event/:id" />
    <SMSReports path="/sms-reports" />
    <Help path="/help" />
    <Logout path="/logout" />
  </Router>
);

export default AdministratorRouter;
