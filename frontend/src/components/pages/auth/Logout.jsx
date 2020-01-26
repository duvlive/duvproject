import React, { useEffect } from 'react';
import store from 'store2';
import { navigate } from '@reach/router';

const Logout = () => {
  useEffect(() => {
    store(false);
    navigate('/');
  });

  return (
    <div className="container">
      <div className="content">
        <div className="login-container">Logging you out</div>
      </div>
    </div>
  );
};

export default Logout;
