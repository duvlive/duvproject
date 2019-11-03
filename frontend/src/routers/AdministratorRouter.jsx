import React from 'react';
import { Router } from '@reach/router';
import Dashboard from 'components/pages/administrator/Dashboard';
import Entertainers from 'components/pages/administrator/Entertainers';
import EntertainersPayment from 'components/pages/administrator/EntertainersPayment';
import RegisteredUsers from 'components/pages/administrator/RegisteredUsers';
import Auctions from 'components/pages/administrator/Auctions';
import UsersPayment from 'components/pages/administrator/UsersPayment';
import Notifications from 'components/pages/administrator/Notifications';
import UpcomingEvents from 'components/pages/administrator/UpcomingEvents';
import EditProfile from 'components/pages/administrator/EditProfile';
import Gallery from 'components/pages/administrator/Gallery';
import Video from 'components/pages/administrator/Video';
import Badges from 'components/pages/administrator/Badges';
import BandMembers from 'components/pages/administrator/BandMembers';
import Events from 'components/pages/administrator/Events';
import InviteFriends from 'components/pages/administrator/InviteFriends';
import Help from 'components/pages/user/Help';
import Logout from 'components/pages/auth/Logout';

const AdministratorRouter = () => (
  <Router>
    <Dashboard path="/dashboard" />
    <Entertainers path="/entertainers" />
    <EntertainersPayment path="/entertainers-payment" />
    <RegisteredUsers path="/registered-users" />
    <Auctions path="/auctions" />
    <UsersPayment path="/users-payment" />
    <Notifications path="/notifications" />
    <UpcomingEvents path="/upcoming-events" />
    <EditProfile path="/edit-profile" />
    <Gallery path="/gallery" />
    <Video path="/videos" />
    <Badges path="/badges" />
    <BandMembers path="/band-members" />
    <Events path="/events" />
    <InviteFriends path="/invite-friends" />
    <Help path="/help" />
    <Logout path="/logout" />
  </Router>
);

export default AdministratorRouter;
