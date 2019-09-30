import React from 'react';
import { Router } from '@reach/router';
import Dashboard from 'components/pages/entertainer/Dashboard';
import Bids from 'components/pages/entertainer/Bids';
import Notifications from 'components/pages/entertainer/Notifications';
import UpcomingEvents from 'components/pages/entertainer/UpcomingEvents';
import Payments from 'components/pages/entertainer/Payments';
import EditProfile from 'components/pages/entertainer/EditProfile';
import Gallery from 'components/pages/entertainer/Gallery';

const UserRouter = () => (
  <Router>
    <Dashboard path="/dashboard" />
    <Bids path="/bids" />
    <Notifications path="/notifications" />
    <UpcomingEvents path="/events" />
    <Payments path="/payments" />
    <EditProfile path="/edit-profile" />
    <Gallery path="/gallery" />
  </Router>
);

export default UserRouter;
