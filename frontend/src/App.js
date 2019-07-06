import React from 'react';
import { Router } from '@reach/router';
import Home from 'components/pages/Home';
import HowItWorks from 'components/pages/HowItWorks';
import 'assets/sass/App.scss';
import UpcomingEvents from 'components/pages/UpcomingEvents';
import HireEntertainers from 'components/pages/HireEntertainers';
import Help from 'components/pages/Help';
import TermsOfUse from 'components/pages/TermsOfUse';
import PrivacyPolicy from 'components/pages/PrivacyPolicy';

function App() {
  return (
    <div className="App">
      <Router>
        <Home path="/" />
        <HowItWorks path="how-it-works" />
        <UpcomingEvents path="upcoming-events" />
        <HireEntertainers path="hire-entertainers" />
        <Help path="help" />
        <TermsOfUse path="terms-of-use" />
        <PrivacyPolicy path="privacy-policy" />
      </Router>
    </div>
  );
}

export default App;
