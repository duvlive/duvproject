import React from 'react';
import { Router } from '@reach/router';
import Dashboard from 'components/pages/administrator/Dashboard';
import Bids from 'components/pages/administrator/Bids';
import Notifications from 'components/pages/administrator/Notifications';
import UpcomingEvents from 'components/pages/administrator/UpcomingEvents';
import Payments from 'components/pages/administrator/Payments';
import EditProfile from 'components/pages/administrator/EditProfile';
import Gallery from 'components/pages/administrator/Gallery';
import Video from 'components/pages/administrator/Video';
import Badges from 'components/pages/administrator/Badges';
import BandMembers from 'components/pages/administrator/BandMembers';
import EmergencyContacts from 'components/pages/administrator/EmergencyContacts';
import InviteFriends from 'components/pages/administrator/InviteFriends';
import Help from 'components/pages/user/Help';
import Logout from 'components/pages/auth/Logout';

const AdministratorRouter = () => (
  <Router>
    <Dashboard path="/dashboard" />
    <Bids path="/bids" />
    <Notifications path="/notifications" />
    <UpcomingEvents path="/events" />
    <Payments path="/payments" />
    <EditProfile path="/edit-profile" />
    <Gallery path="/gallery" />
    <Video path="/videos" />
    <Badges path="/badges" />
    <BandMembers path="/band-members" />
    <EmergencyContacts path="/emergency-contacts" />
    <InviteFriends path="/invite-friends" />
    <Help path="/help" />
    <Logout path="/logout" />
  </Router>
);

export default AdministratorRouter;
