import React from 'react';
import { Router } from '@reach/router';
import { Helmet } from 'react-helmet';
import { HomeKeeping } from 'components/custom/HomeKeeping';
import FrontPageRouter from 'routers/FrontPageRouter';
import UserRouter from 'routers/UserRouter';
import EntertainerRouter from 'routers/EntertainerRouter';
import AdministratorRouter from 'routers/AdministratorRouter';
import BandMemberRouter from 'routers/BandMemberRouter';
import { UserContextProvider } from 'context/UserContext';
import 'assets/sass/App.scss';

// get user info at this level
const App = () => {
  if (process.env.NODE_ENV !== 'development') {
    if (!window.console) window.console = {};
    var methods = ['log', 'debug', 'warn', 'info'];
    for (var i = 0; i < methods.length; i++) {
      console[methods[i]] = function () {};
    }
  }
  return (
    <UserContextProvider>
      <Helmet>
        <title>D.U.V LIVE | HOME OF LIVE ENTERTAINMENT</title>
      </Helmet>
      <Router primary={false}>
        <HomeKeeping path="/">
          <FrontPageRouter path="/*" />
          <UserRouter path="user/*" />
          <EntertainerRouter path="entertainer/*" />
          <BandMemberRouter path="band-member/*" />
          <AdministratorRouter path="admin/*" />
        </HomeKeeping>
      </Router>
    </UserContextProvider>
  );
};

export default App;
