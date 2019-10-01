import React from 'react';
import { Router } from '@reach/router';
import Dashboard from 'components/pages/user/Dashboard';
import EmptyDashboard from 'components/pages/user/EmptyDashboard';
import Auctions from 'components/pages/user/Auctions';
import Events from 'components/pages/user/Events';
import Notifications from 'components/pages/user/Notifications';
import UserHelp from 'components/pages/user/Help';
import Payments from 'components/pages/user/Payments';
import SelectEntertainer from 'components/pages/user/HireEntertainers';
import NewEvent from 'components/pages/user/NewEvent';
import ViewEvent from 'components/pages/user/ViewEvent';
import Bids from 'components/pages/user/Bids';
import EditProfile from 'components/pages/user/EditProfile';
import ChangePassword from 'components/pages/user/ChangePassword';
import RegisterAsEntertainer from 'components/pages/user/RegisterAsEntertainer';
import Approval from 'components/pages/user/Approval';

const UserRouter = () => (
  <Router>
    <Dashboard path="/dashboard" />
    <Auctions path="/auctions" />
    <Events path="/events" />
    <Notifications path="/notifications" />
    <UserHelp path="/help" />
    <Payments path="/payments-history" />
    <SelectEntertainer path="/hire-entertainer" />
    <SelectEntertainer path="/hire-entertainer/:event_id" />
    <NewEvent path="events/new" />
    <NewEvent path="events/new/:hire_type" />
    <ViewEvent path="events/:id" />
    {/* <AddEntertainerToEvent path="events/:id/add-entertainer/:type" /> */}
    <Bids path="/auction/bids" />
    <Approval path="/approval" />
    <EditProfile path="/edit-profile" />
    <ChangePassword path="/change-password" />
    <RegisterAsEntertainer path="/register-as-entertainer" />
    <EmptyDashboard default />
  </Router>
);

export default UserRouter;
