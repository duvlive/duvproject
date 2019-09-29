import React from 'react';
import { Router } from '@reach/router';
import { Helmet } from 'react-helmet';
import 'assets/sass/App.scss';
import { ScrollToTop } from 'components/custom/ScrollToTop';
import FrontPageRouter from 'routers/FrontPageRouter';
import UserRouter from 'routers/UserRouter';
import FormikForm from 'components/forms/FormikForm';

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>D.U.V LIVE | HOME OF LIVE ENTERTAINMENT</title>
      </Helmet>
      <Router primary={false}>
        <ScrollToTop path="/">
          <FrontPageRouter path="/*" />
          <UserRouter path="user/*" />

          {/* To remove */}
          <FormikForm path="formik" />
        </ScrollToTop>
      </Router>
    </div>
  );
}

export default App;
