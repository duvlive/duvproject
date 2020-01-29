import React, { useEffect } from 'react';
import store from 'store2';
import { UserContext } from 'context/UserContext';
import BackEndPage from 'components/common/layout/BackEndPage';

const Logout = () => {
  const { userDispatch } = React.useContext(UserContext);

  useEffect(() => {
    store(false);
    userDispatch({ type: 'user-logout' });
  });

  return (
    <BackEndPage title="Edit Profile">
      <div className="main-app">
        <section className="app-content">Logging out</section>
      </div>
    </BackEndPage>
  );
};

export default Logout;
