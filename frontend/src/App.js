import React from 'react';
import { Router } from '@reach/router';
import { Helmet } from 'react-helmet';
import Home from 'components/pages/Home';
import HowItWorks from 'components/pages/HowItWorks';
import 'assets/sass/App.scss';
import UpcomingEvents from 'components/pages/UpcomingEvents';
import HireEntertainers from 'components/pages/HireEntertainers';
import Help from 'components/pages/Help';
import TermsOfUse from 'components/pages/TermsOfUse';
import PrivacyPolicy from 'components/pages/PrivacyPolicy';
import Login from 'components/pages/auth/Login';
import Register from 'components/pages/auth/Register';
import SingleEntertainer from 'components/pages/SingleEntertainer';
import SingleEvent from 'components/pages/SingleEvent';
import { ScrollToTop } from 'components/custom/ScrollToTop';
import ForgotPassword from 'components/pages/auth/ForgotPassword';

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
        </ScrollToTop>
      </Router>
    </div>
  );
}

export default App;
