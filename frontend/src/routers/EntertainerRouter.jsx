import React from 'react';
import { Router } from '@reach/router';
import Dashboard from 'components/pages/entertainer/Dashboard';

const UserRouter = () => (
  <Router>
    <Dashboard path="/dashboard" />
  </Router>
);

export default UserRouter;
