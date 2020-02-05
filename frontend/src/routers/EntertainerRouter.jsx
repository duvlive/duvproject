import React from 'react';
import { Router } from '@reach/router';
import Dashboard from 'components/pages/entertainer/Dashboard';
import Bids from 'components/pages/entertainer/Bids';
import Notifications from 'components/pages/entertainer/Notifications';
import UpcomingEvents from 'components/pages/entertainer/UpcomingEvents';
import Payments from 'components/pages/entertainer/Payments';
import EditProfile from 'components/pages/entertainer/EditProfile';
import Gallery from 'components/pages/entertainer/Gallery';
import Video from 'components/pages/entertainer/Video';
import Badges from 'components/pages/entertainer/Badges';
import BandMembers from 'components/pages/entertainer/BandMembers';
import EmergencyContacts from 'components/pages/entertainer/EmergencyContacts';
import InviteFriends from 'components/pages/entertainer/InviteFriends';
import Help from 'components/pages/user/Help';
import Logout from 'components/pages/auth/Logout';
import AccountSetup from 'components/pages/entertainer/AccountSetup';

const EntertainerRouter = () => (
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
    <AccountSetup path="/account-setup" />
    <InviteFriends path="/invite-friends" />
    <Help path="/help" />
    <Logout path="/logout" />
  </Router>
);

export default EntertainerRouter;
