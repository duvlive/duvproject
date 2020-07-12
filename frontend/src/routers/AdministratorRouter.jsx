import React from 'react';
import { Router } from '@reach/router';
import Dashboard from 'components/pages/administrator/Dashboard';
import Entertainers from 'components/pages/administrator/Entertainers';
import SingleUser from 'components/pages/administrator/SingleUser';
import SingleEntertainer from 'components/pages/administrator/SingleEntertainer';
import SingleBadge from 'components/pages/administrator/SingleBadge';
import SingleEvent from 'components/pages/administrator/SingleEvent';
import EntertainersPayment from 'components/pages/administrator/EntertainersPayment';
import RegisteredUsers from 'components/pages/administrator/RegisteredUsers';
import Auctions from 'components/pages/administrator/Auctions';
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

const AdministratorRouter = () => (
  <Router>
    <Dashboard path="/dashboard" />
    <Entertainers path="/entertainers" />
    <EntertainersPayment path="/entertainers-payment" />
    <RegisteredUsers path="/registered-users" />
    <Auctions path="/auctions" />
    <SingleUser path="/users/:id" />
    <SingleEntertainer path="/entertainers/:id" />
    <UsersPayment path="/users-payment" />
    <Notifications path="/notifications" />
    <UpcomingEvents path="/upcoming-events" />
    <SingleEvent path="/events/:id" />
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
    <Help path="/help" />
    <Logout path="/logout" />
  </Router>
);

export default AdministratorRouter;
