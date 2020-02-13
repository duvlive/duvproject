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
import EmergencyContacts from 'components/pages/entertainer/accountSetup/EmergencyContacts';
import InviteFriends from 'components/pages/entertainer/InviteFriends';
import Help from 'components/pages/user/Help';
import Logout from 'components/pages/auth/Logout';
import AccountSetup from 'components/pages/entertainer/accountSetup/AccountSetup';
import BankDetails from 'components/pages/entertainer/accountSetup/BankDetails';

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
    <BankDetails path="/bank-details" />
    <AccountSetup path="/account-setup" />
    <AccountSetup path="/account-setup/:stepFromURL" />
    <InviteFriends path="/invite-friends" />
    <Help path="/help" />
    <Logout path="/logout" />
  </Router>
);

export default EntertainerRouter;
