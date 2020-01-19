import React from 'react';
import { clearStorage } from 'utils/localStorage';
import { Redirect } from '@reach/router';

const Logout = () => {
  clearStorage();
  return <Redirect to="login" />;
};

export default Logout;
