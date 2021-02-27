import React from 'react';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import { UserProfileForm } from '../user/EditProfile';
import { ChangePasswordForm } from 'components/pages/user/ChangePassword';
import { Link } from '@reach/router';

const EditProfile = () => {
  return (
    <BackEndPage title="Edit Profile">
      <div className="main-app">
        <TopMessage message="Edit Profile" />
        <section className="app-content">
          <UserProfileForm />
          <ChangePasswordForm />
        </section>
        <section className="text-right mt-3">
          <Link
            className="btn btn-warning btn-wide btn-transparent"
            to="/entertainer/account-setup"
          >
            Account Setup
          </Link>
        </section>
      </div>
    </BackEndPage>
  );
};

export default EditProfile;
