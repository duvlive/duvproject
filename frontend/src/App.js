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
          <AdministratorRouter path="administrator/*" />
        </HomeKeeping>
      </Router>
    </UserContextProvider>
  );
};

export default App;
