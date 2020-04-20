import React from 'react';
import { Router } from '@reach/router';
import Dashboard from 'components/pages/band-member/Dashboard';
import UpcomingEvents from 'components/pages/band-member/UpcomingEvents';
import Payments from 'components/pages/band-member/Payments';
import EditProfile from 'components/pages/band-member/EditProfile';
import Gallery from 'components/pages/band-member/Gallery';
import Video from 'components/pages/band-member/Video';
import Badges from 'components/pages/band-member/Badges';
import BandMembers from 'components/pages/band-member/BandMembers';
import Help from 'components/pages/user/Help';
import Logout from 'components/pages/auth/Logout';
import InviteFriends from 'components/common/pages/InviteFriends';
import Notifications from 'components/common/pages/Notifications';
import ChangePassword from 'components/common/pages/ChangePassword';

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
    <BandMembers path="/team-members" />
    <InviteFriends path="/invite-friends" />
    <ChangePassword path="/change-password" />
    <Help path="/help" />
    <Logout path="/logout" />
  </Router>
);

export default BandMemberRouter;
