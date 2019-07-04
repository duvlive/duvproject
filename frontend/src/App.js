import React from 'react';
import { Router } from '@reach/router';
import Home from 'components/pages/Home';
import HowItWorks from 'components/pages/HowItWorks';
import 'assets/sass/App.scss';

function App() {
  return (
    <div className="App">
      <Router>
        <Home path="/" />
        <HowItWorks path="how-it-works" />
      </Router>
    </div>
  );
}

export default App;
