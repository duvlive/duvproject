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
          <Stepper />
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

const Stepper = () => (
  <div className="stepper">
    <ul role="tablist">
      <li className="active done" role="tab">
        <button>
          <div className="title">
            <span className="step-inner-circle">
              <span className="icon icon-ok" />
            </span>
            <span className="step-text">Profile</span>
          </div>
        </button>
      </li>

      <li className="active" role="tab">
        <button>
          <div className="title">
            <span className="step-inner-circle">
              <span>1</span>
            </span>
            <span className="step-text">Bank Details</span>
          </div>
        </button>
      </li>

      <li role="tab">
        <button>
          <div className="title">
            <span className="step-inner-circle">
              <span>1</span>
            </span>
            <span className="step-text">Personal Information</span>
          </div>
        </button>
      </li>
    </ul>
  </div>
);

export default AccountSetup;
