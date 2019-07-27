import React from 'react';
import { Router } from '@reach/router';
import { Helmet } from 'react-helmet';
import Home from 'components/pages/frontend/Home';
import HowItWorks from 'components/pages/frontend/HowItWorks';
import 'assets/sass/App.scss';
import UpcomingEvents from 'components/pages/frontend/UpcomingEvents';
import HireEntertainers from 'components/pages/frontend/HireEntertainers';
import Help from 'components/pages/frontend/Help';
import TermsOfUse from 'components/pages/frontend/TermsOfUse';
import PrivacyPolicy from 'components/pages/frontend/PrivacyPolicy';
import Login from 'components/pages/auth/Login';
import Register from 'components/pages/auth/Register';
import SingleEntertainer from 'components/pages/frontend/SingleEntertainer';
import SingleEvent from 'components/pages/frontend/SingleEvent';
import { ScrollToTop } from 'components/custom/ScrollToTop';
import ForgotPassword from 'components/pages/auth/ForgotPassword';
import UserPage from 'components/pages/user/Index';
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
import Approval from 'components/pages/user/Approval';

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>D.U.V LIVE | HOME OF LIVE ENTERTAINMENT</title>
      </Helmet>
      <Router primary={false}>
        <ScrollToTop path="/">
          <Home path="/" />
          <HowItWorks path="how-it-works" />
          <UpcomingEvents path="upcoming-events" />
          <HireEntertainers path="hire-entertainers" />
          <Help path="help" />
          <TermsOfUse path="terms-of-use" />
          <PrivacyPolicy path="privacy-policy" />
          <Login path="login" />
          <ForgotPassword path="forgot-password" />
          <Register path="register" />
          <Register path="register/:type" />
          <SingleEntertainer path="entertainer/:slug" />
          <SingleEvent path="event/:slug" />

          <UserPage path="/user">
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
            <EmptyDashboard default />
          </UserPage>
        </ScrollToTop>
      </Router>
    </div>
  );
}

export default App;
