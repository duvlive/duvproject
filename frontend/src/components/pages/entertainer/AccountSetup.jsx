import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import {
  EntertainerDetailsForm,
  IdentificationForm,
  YoutubeChannelForm
} from 'components/pages/entertainer/EditProfile';
import { ProfessionalContactForm } from 'components/pages/entertainer/EmergencyContacts';
import { BankDetailsForm } from 'components/pages/entertainer/BankDetails';
import { UserContext } from 'context/UserContext';
import { ONBOARDING_STEPS } from 'utils/constants';

const MIN_STEP = 1;
const MAX_STEP = 5;

const AccountSetup = ({ stepFromURL }) => {
  const initialStep =
    stepFromURL > MAX_STEP
      ? MAX_STEP
      : stepFromURL < MIN_STEP
      ? MIN_STEP
      : stepFromURL;
  const [currentStep, setCurrentStep] = React.useState(
    parseInt(initialStep, 10)
  );

  const ALL_STEPS = [
    null,
    <EntertainerDetailsForm />,
    <BankDetailsForm />,
    <ProfessionalContactForm />,
    <YoutubeChannelForm />,
    <IdentificationForm />
  ];

  const handleCurrentStep = step => setCurrentStep(step);
  const moveToPreviousStep = () =>
    currentStep <= MIN_STEP
      ? setCurrentStep(1)
      : setCurrentStep(currentStep - 1);
  const moveToNextStep = () =>
    currentStep >= MAX_STEP
      ? setCurrentStep(MAX_STEP)
      : setCurrentStep(currentStep + 1);

  return (
    <BackEndPage title="Account Setup">
      <div className="main-app">
        <TopMessage message="Account Setup" />
        <section className="app-content">
          <StepperList
            currentStep={currentStep}
            setCurrentStep={handleCurrentStep}
          />
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

AccountSetup.defaultProps = {
  stepFromURL: '1'
};

AccountSetup.propTypes = {
  stepFromURL: PropTypes.string
};

const StepperList = ({ currentStep, setCurrentStep }) => {
  let { userState } = React.useContext(UserContext);
  const steps = Object.keys(ONBOARDING_STEPS);
  const done = [
    !!userState.entertainerProfile.stageName && !!userState.profileImg,
    !!userState.bankDetail.bankName,
    !!userState.contacts[0].firstName || !!userState.contacts[1].firstName,
    !!userState.entertainerProfile.youTubeChannel,
    !!userState.identification.idType
  ];
  const status = steps.map((_, index) => ({
    active: currentStep === index + 1,
    approved: userState.approvalComment[steps[index]] === 'YES',
    done: done[index],
    rejected:
      userState.approvalComment[steps[index]] !== null &&
      userState.approvalComment[steps[index]] !== 'YES'
  }));

  console.log('status', status);

  return (
    <div className="stepper">
      <ul role="tablist">
        {Object.keys(ONBOARDING_STEPS).map((step, index) => (
          <Stepper
            currentStep={currentStep}
            key={index}
            number={index + 1}
            onClick={() => setCurrentStep(index + 1)}
            status={status[index]}
            title={ONBOARDING_STEPS[step].title}
          />
        ))}
      </ul>
    </div>
  );
};
StepperList.propTypes = {
  currentStep: PropTypes.number.isRequired,
  setCurrentStep: PropTypes.func.isRequired
};

const Stepper = ({ number, onClick, status, title }) => {
  console.log('Stpper status', status);
  return (
    <li
      className={classNames({
        active: status.active,
        approved: status.approved,
        done: status.done,
        rejected: status.rejected
      })}
      onClick={onClick}
      role="tab"
    >
      <button>
        <div className="title">
          <span className="step-inner-circle">
            {status.approved && <span className="icon icon-ok" />}
            {status.rejected && <span className="icon icon-cancel" />}
            {!status.approved && !status.rejected && <span>{number}</span>}
          </span>
          <span className="step-text">{title}</span>
        </div>
      </button>
    </li>
  );
};

Stepper.propTypes = {
  number: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  status: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
};

const StepperNavigation = ({
  moveToPreviousStep,
  moveToNextStep,
  currentStep
}) => (
  <section className="row mt-3">
    <div className="col-6">
      {currentStep > MIN_STEP && (
        <button
          className="btn btn-info btn-circle btn-transparent"
          onClick={moveToPreviousStep}
        >
          <span className="icon icon-angle-left"></span> Previous Step
        </button>
      )}
    </div>
    <div className="col-6 text-right">
      {currentStep < MAX_STEP && (
        <button
          className="btn btn-info btn-circle btn-transparent"
          onClick={moveToNextStep}
        >
          Next Step <span className="icon icon-angle-right"></span>
        </button>
      )}
    </div>
  </section>
);

StepperNavigation.propTypes = {
  currentStep: PropTypes.number.isRequired,
  moveToNextStep: PropTypes.func.isRequired,
  moveToPreviousStep: PropTypes.func.isRequired
};

export default AccountSetup;
