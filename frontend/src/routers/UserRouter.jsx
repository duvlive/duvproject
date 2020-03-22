import React from 'react';
import { Router } from '@reach/router';
import Dashboard from 'components/pages/user/Dashboard';
import EmptyDashboard from 'components/pages/user/EmptyDashboard';
import Auctions from 'components/pages/user/Auctions';
import Events from 'components/pages/user/Events';
import Notifications from 'components/pages/user/Notifications';
import UserHelp from 'components/pages/user/Help';
import Payments from 'components/pages/user/Payments';
// import SelectEntertainer from 'components/pages/user/HireEntertainers';
import SearchEntertainer from 'components/pages/user/SearchEntertainer';
import RecommendedEntertainers from 'components/pages/user/RecommendedEntertainer';
import NewEvent from 'components/pages/user/NewEvent';
import ViewEvent from 'components/pages/user/ViewEvent';
import Bids from 'components/pages/user/Bids';
import EditProfile from 'components/pages/user/EditProfile';
import ChangePassword from 'components/pages/user/ChangePassword';
import RegisterAsEntertainer from 'components/pages/user/RegisterAsEntertainer';
import Approval from 'components/pages/user/Approval';
// import AddEntertainerToEvent from 'components/pages/user/AddEntertainerToEvent';
import AddEntertainerDetails from 'components/common/entertainers/AddEntertainerDetails';

const UserRouter = () => (
  <Router>
    <Dashboard path="/dashboard" />
    <Auctions path="/auctions" />
    <Auctions path="/auctions/status/:message" />
    <Events path="/events" />
    <Notifications path="/notifications" />
    <UserHelp path="/help" />
    <Payments path="/payments-history" />
    <SearchEntertainer path="/entertainer/search/:event_id" />
    <RecommendedEntertainers path="/entertainer/recommended/:event_id" />
    <NewEvent path="events/new" />
    <NewEvent path="/hire-entertainer" />
    <AddEntertainerDetails path="events/:id/add-entertainer" />
    <AddEntertainerDetails path="events/:id/add-entertainer/new-event" />
    <ViewEvent path="events/view/:id" />
    <Bids path="/auction/bids/:eventEntertainerId" />
    <Approval path="/approval" />
    <EditProfile path="/edit-profile" />
    <ChangePassword path="/change-password" />
    <RegisterAsEntertainer path="/register-as-entertainer" />
    <EmptyDashboard default />
  </Router>
);

export default UserRouter;
