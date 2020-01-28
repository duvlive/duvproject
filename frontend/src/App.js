import React from 'react';
import { Router } from '@reach/router';
import { Helmet } from 'react-helmet';
import 'assets/sass/App.scss';
import { ScrollToTop } from 'components/custom/ScrollToTop';
import FrontPageRouter from 'routers/FrontPageRouter';
import UserRouter from 'routers/UserRouter';
import EntertainerRouter from 'routers/EntertainerRouter';
import AdministratorRouter from 'routers/AdministratorRouter';
import BandMemberRouter from 'routers/BandMemberRouter';
import FormikForm from 'components/forms/FormikForm';
import { UserContextProvider } from 'context/UserContext';

// get user info at this level
function App() {
  return (
    <UserContextProvider>
      <Helmet>
        <title>D.U.V LIVE | HOME OF LIVE ENTERTAINMENT</title>
      </Helmet>
      <Router primary={false}>
        <ScrollToTop path="/">
          <FrontPageRouter path="/*" />
          <UserRouter path="user/*" />
          <EntertainerRouter path="entertainer/*" />
          <BandMemberRouter path="band-member/*" />
          <AdministratorRouter path="administrator/*" />

          {/* To remove */}
          <FormikForm path="formik" />
        </ScrollToTop>
      </Router>
    </UserContextProvider>
  );
}

export default App;
