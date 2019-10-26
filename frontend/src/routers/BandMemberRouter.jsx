import React from 'react';
import { Router } from '@reach/router';
import Dashboard from 'components/pages/band-member/Dashboard';
import Notifications from 'components/pages/band-member/Notifications';
import UpcomingEvents from 'components/pages/band-member/UpcomingEvents';
import Payments from 'components/pages/band-member/Payments';
import EditProfile from 'components/pages/band-member/EditProfile';
import Gallery from 'components/pages/band-member/Gallery';
import Video from 'components/pages/band-member/Video';
import Badges from 'components/pages/band-member/Badges';
import BandMembers from 'components/pages/band-member/BandMembers';
import InviteFriends from 'components/pages/band-member/InviteFriends';
import Help from 'components/pages/user/Help';
import Logout from 'components/pages/auth/Logout';

const BandMemberRouter = () => (
  <Router>
    <Dashboard path="/dashboard" />
    <Notifications path="/notifications" />
    <UpcomingEvents path="/events" />
    <Payments path="/payments" />
    <EditProfile path="/edit-profile" />
    <Gallery path="/gallery" />
    <Video path="/videos" />
    <Badges path="/badges" />
    <BandMembers path="/band-members" />
    <InviteFriends path="/invite-friends" />
    <Help path="/help" />
    <Logout path="/logout" />
  </Router>
);

export default BandMemberRouter;
