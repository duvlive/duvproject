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
import BackEndPage from 'components/common/BackEndPage';
import Dashboard from 'components/pages/user/Dashboard';
import Auctions from 'components/pages/user/Auctions';
import Events from 'components/pages/user/Events';

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

          <BackEndPage path="/user">
            <Dashboard path="/dashboard" />
            <Auctions path="/auctions" />
            <Events path="/events" />
            {/*
          <Notifications path="/notifications" />
          <Payments path="/payments-history" />
          <Approval path="/approval" />
          <HireEntertainers path="/hire-entertainers" />
          <NewEventAuction path="/auction/new" />
          <Bids path="/auction/bids" />
          <NewEventSearch path="/search/entertainers" />
          <NewEventRecommend path="/recommend/entertainers" /> */}
            {/* <Dashboard default /> */}
          </BackEndPage>
        </ScrollToTop>
      </Router>
    </div>
  );
}

export default App;
