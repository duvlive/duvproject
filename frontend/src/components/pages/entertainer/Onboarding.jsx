import React from 'react';
import TopMessage from 'components/common/layout/TopMessage';
import PropTypes from 'prop-types';
import Card from 'components/custom/Card';
import classNames from 'classnames';
import { Link } from '@reach/router';
import { UserContext } from 'context/UserContext';
import { ONBOARDING_STEPS } from 'utils/constants';

const STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};

const getOnboardingStatus = status => {
  /* == is used to check for null
   * null -> pending
   * true -> approved
   * false -> rejected
   */
  if (null == status) {
    return STATUS.PENDING;
  }
  return status === 'YES' ? STATUS.APPROVED : STATUS.REJECTED;
};

const Onboarding = () => {
  let { userState } = React.useContext(UserContext);
  return (
    <>
      <TopMessage message={`Welcome back ${userState.firstName},`} />
      <Card
        className="dashboard__card offset-md-2 col-md-8 mt-5 mb-0 rounded-0"
        color="blue"
      >
        <h4 className="onboarding__title">
          You are just a few steps away
          <br /> from activating your account.
        </h4>
        <p className="onboarding__instruction">
          Follow the 5 steps below to complete your account whenever you are
          ready. Once completed, your account would be approved within 24 hours.
        </p>
      </Card>

      <OnboardingList />
      <div className="text-center">
        <Link
          className="btn btn-danger btn-lg btn-wide btn-transparent mt-5"
          to="/entertainer/account-setup"
        >
          Continue Setup
        </Link>
      </div>
    </>
  );
};

const OnboardingList = () => {
  const { userState } = React.useContext(UserContext);

  return Object.keys(ONBOARDING_STEPS).map((step, index) => (
    <Onboarding.Card
      key={index}
      link="/entertainer/account-setup"
      number={index + 1}
      status={getOnboardingStatus(userState.approvalComment[step])}
      title={ONBOARDING_STEPS[step].title}
    />
  ));
};

Onboarding.Card = ({ title, status, number, link }) => {
  const approvedStep = status === STATUS.APPROVED;
  const pendingStep = status === STATUS.PENDING;
  const rejectedStep = status === STATUS.REJECTED;
  return (
    <Link to={`${link}/${number}`}>
      <Card
        className="onboarding__card offset-md-2 col-md-8 mb-0 rounded-0"
        color={approvedStep ? 'green' : rejectedStep ? 'red' : 'black'}
        hover={!approvedStep}
      >
        <h5 className="onboarding__text">
          <span
            className={classNames(
              'icon account-setup-icon',
              {
                pending: pendingStep
              },
              {
                'icon-cancel rejected': rejectedStep
              },
              {
                'icon-ok completed': approvedStep
              }
            )}
          />
          {`${number}. `}
          {title}
        </h5>
      </Card>
    </Link>
  );
};

Onboarding.Card.propTypes = {
  link: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  status: PropTypes.oneOf(Object.values(STATUS)).isRequired,
  title: PropTypes.string.isRequired
};

export default Onboarding;
