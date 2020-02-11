import React from 'react';
import PropTypes from 'prop-types';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import {
  EntertainerDetailsForm,
  IdentificationForm,
  YoutubeChannelForm
} from 'components/pages/entertainer/EditProfile';
import { ProfessionalContactForm } from 'components/pages/entertainer/EmergencyContacts';
import { BankDetailsForm } from 'components/pages/entertainer/BankDetails';
import { ONBOARDING_STEPS } from 'utils/constants';

const AccountSetup = () => {
  // get step from url
  const [currentStep, setCurrentStep] = React.useState(1);

  const ALL_STEPS = [
    '',
    <EntertainerDetailsForm />,
    <BankDetailsForm />,
    <ProfessionalContactForm />,
    <YoutubeChannelForm />,
    <IdentificationForm />
  ];

  const handleCurrentStep = step => setCurrentStep(step);
  const moveToPreviousStep = () =>
    currentStep <= 1 ? setCurrentStep(1) : setCurrentStep(currentStep - 1);
  const moveToNextStep = () =>
    currentStep >= 5 ? setCurrentStep(5) : setCurrentStep(currentStep + 1);

  return (
    // change all account setup title to constant
    <BackEndPage title="Account Setup">
      <div className="main-app">
        <TopMessage message="Account Setup" />
        <section className="app-content">
          <StepperList setCurrentStep={handleCurrentStep} />
          {ALL_STEPS[currentStep]}
        </section>
        <StepperNavigation
          currentStep={currentStep}
          moveToNextStep={moveToNextStep}
          moveToPreviousStep={moveToPreviousStep}
        />
      </div>
    </BackEndPage>
  );
};

const StepperList = ({ setCurrentStep }) => {
  return (
    <div className="stepper">
      <ul role="tablist">
        {Object.keys(ONBOARDING_STEPS).map((step, index) => (
          <Stepper
            key={index}
            number={index + 1}
            onClick={() => setCurrentStep(index + 1)}
            title={ONBOARDING_STEPS[step].title}
          />
        ))}
      </ul>
    </div>
  );
};
StepperList.propTypes = {
  setCurrentStep: PropTypes.func.isRequired
};

const Stepper = ({ number, onClick, title }) => (
  // active, done, icons -> approved and rejected
  <li className="active done" onClick={onClick} role="tab">
    <button>
      <div className="title">
        <span className="step-inner-circle">
          {/* <span className="icon icon-ok" /> */}
          <span>{number}</span>
        </span>
        <span className="step-text">{title}</span>
      </div>
    </button>
  </li>
);

Stepper.propTypes = {
  number: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

const StepperNavigation = ({
  moveToPreviousStep,
  moveToNextStep,
  currentStep
}) => (
  // use icon as button and make it as circle
  <section className="row">
    <div className="col-6">
      {currentStep > 1 && (
        <button
          className="btn btn-info btn-wide btn-transparent mt-5"
          onClick={moveToPreviousStep}
        >
          Back
        </button>
      )}
    </div>
    <div className="col-6 text-right">
      {currentStep < 5 && (
        <button
          className="btn btn-success btn-wide btn-transparent mt-5"
          onClick={moveToNextStep}
        >
          Next
        </button>
      )}
    </div>
  </section>
);

StepperNavigation.propTypes = {
  moveToNextStep: PropTypes.func.isRequired,
  moveToPreviousStep: PropTypes.func.isRequired
};

export default AccountSetup;
