import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import YoutubeChannelForm from 'components/pages/entertainer/accountSetup/YoutubeChannelForm';
import IdentificationForm from 'components/pages/entertainer/accountSetup/IdentificationForm';
import EntertainerDetailsForm from 'components/pages/entertainer/accountSetup/EntertainerDetailsForm';
import {
  ProfessionalContactForm,
  NextOfKinForm
} from 'components/pages/entertainer/accountSetup/EmergencyContacts';
import { BankDetailsForm } from 'components/pages/entertainer/accountSetup/BankDetails';
import { UserContext } from 'context/UserContext';
import { ONBOARDING_STEPS, STEPS_REQUIREMENT } from 'utils/constants';
import AlertMessage from 'components/common/utils/AlertMessage';

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

  React.useEffect(() => {
    setCurrentStep(parseInt(stepFromURL, 10));
  }, [stepFromURL]);

  const ALL_STEPS = [
    null,
    <EntertainerDetailsForm />,
    <BankDetailsForm />,
    <>
      <NextOfKinForm />
      <ProfessionalContactForm />
    </>,
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
        <TopMessage message={`Account Setup (Step ${currentStep}/5)`} />
        <section className="app-content">
          <StepperList
            currentStep={currentStep}
            setCurrentStep={handleCurrentStep}
          />
          {<ToComplete currentStep={currentStep} />}
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
    (userState.contacts.length > 0 &&
      !!(userState.contacts[0] && userState.contacts[0].firstName)) ||
      !!(userState.contacts[1] && userState.contacts[1].firstName),
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

const ToComplete = ({ currentStep }) => {
  let { userState } = React.useContext(UserContext);
  const steps = Object.keys(STEPS_REQUIREMENT);
  const stepName = steps[currentStep - 1];
  const message =
    userState.approvalComment[stepName] !== 'YES' &&
    userState.approvalComment[stepName];
  return (
    <section className="things-to-complete">
      <AlertMessage message={message} />
      <h6 className="text-white font-weight-normal">
        Information needed to complete this step
      </h6>
      <ul>
        {STEPS_REQUIREMENT[stepName].map((requirement, index) => (
          <li key={index}>{requirement}</li>
        ))}
      </ul>
    </section>
  );
};

ToComplete.propTypes = {
  currentStep: PropTypes.number.isRequired
};

export default AccountSetup;

// TODO:
// 2. Update backend to handle updates after approval. [Needs review instead of yes]
// 8. Recommend a friend, api, facebook, twitter and linkedin
// 12. Add a get started button that will create entertainer profile for user

// 0. Add message to hire-entertainers that you need to add new event b4 you can add entertaineras
// 1. Remove hire as entertaner selection page
// 2. Create a better event view page
// 3. Load all auctions
// 4. Think of showing recommendation on user homepage and entertainer dashboard
// 5. Finalize Load all events
// 6. Validations for date events
// a. Max auction date is 72 hours before,
// b. paid event can only be cancelled 48 hours before
// c. No entertainer after 48 hours, event is voided
// d. User can change hire type mid way
// e. User application for search and recommendation must be approved in 24 hours
// f. Create a proper search page for user
// g. create a proper recommendation page for user
// h. think about payment integration
