import React from 'react';
import { Router } from '@reach/router';
import Dashboard from 'components/pages/entertainer/Dashboard';
import Bids from 'components/pages/entertainer/Bids';
import Notifications from 'components/pages/entertainer/Notifications';
import UpcomingEvents from 'components/pages/entertainer/UpcomingEvents';
import Payments from 'components/pages/entertainer/Payments';

const UserRouter = () => (
  <Router>
    <Dashboard path="/dashboard" />
    <Bids path="/bids" />
    <Notifications path="/notifications" />
    <UpcomingEvents path="/events" />
    <Payments path="/payments" />
  </Router>
);

export default UserRouter;
