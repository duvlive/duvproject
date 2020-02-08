import React from 'react';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import {
  EntertainerDetailsForm,
  IdentificationForm,
  YoutubeChannelForm
} from 'components/pages/entertainer/EditProfile';
import { ProfessionalContactForm } from 'components/pages/entertainer/EmergencyContacts';
import { BankDetailsForm } from 'components/pages/entertainer/BankDetails';

const AccountSetup = () => {
  return (
    <BackEndPage title="Account Setup">
      <div className="main-app">
        <TopMessage message="Account Setup" />
        <section className="app-content">
          <EntertainerDetailsForm />
          <BankDetailsForm />
          <ProfessionalContactForm />
          <YoutubeChannelForm />
          <IdentificationForm />
        </section>
      </div>
    </BackEndPage>
  );
};

export default AccountSetup;
