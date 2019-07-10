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
import Login from 'components/pages/Login';

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>D.U.V LIVE | HOME OF LIVE ENTERTAINMENT</title>
      </Helmet>
      <Router>
        <Home path="/" />
        <HowItWorks path="how-it-works" />
        <UpcomingEvents path="upcoming-events" />
        <HireEntertainers path="hire-entertainers" />
        <Help path="help" />
        <TermsOfUse path="terms-of-use" />
        <PrivacyPolicy path="privacy-policy" />
        <Login path="login" />
      </Router>
    </div>
  );
}

export default App;
