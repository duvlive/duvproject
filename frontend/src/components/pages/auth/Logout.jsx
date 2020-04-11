import React, { useEffect } from 'react';
import store from 'store2';
import { UserContext } from 'context/UserContext';
import BackEndPage from 'components/common/layout/BackEndPage';
import { navigate } from '@reach/router';

const Logout = () => {
  const { userDispatch } = React.useContext(UserContext);

  useEffect(() => {
    store(false);
    userDispatch({ type: 'user-logout' });
    navigate('/');
    window.location.href = '/';
  });

  return (
    <BackEndPage title="Log Out">
      <div className="main-app">
        <section className="app-content">Logging out</section>
      </div>
    </BackEndPage>
  );
};

export default Logout;
