import React, { useEffect } from 'react';
import { UserContext } from 'context/UserContext';
import BackEndPage from 'components/common/layout/BackEndPage';
import { navigate } from '@reach/router';
import { clearStorage } from 'utils/localStorage';

const Logout = () => {
  const { userDispatch } = React.useContext(UserContext);

  useEffect(() => {
    clearStorage();
    userDispatch({ type: 'user-logout' });
    navigate('/');
    // window.location.href = '/';
  }, [userDispatch]);

  return (
    <BackEndPage title="Log Out">
      <div className="main-app">
        <section className="app-content">Logging out</section>
      </div>
    </BackEndPage>
  );
};

export default Logout;
