import React from 'react';
import TopMessage from 'components/common/layout/TopMessage';
import PropTypes from 'prop-types';
import Card from 'components/custom/Card';
import classNames from 'classnames';

const STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed'
};

const Onboarding = () => {
  return (
    <>
      <TopMessage message="Welcome back DJ Cuppy," />
      <Card className="dashboard__card offset-md-2 col-md-8 mt-5 mb-0 rounded-0">
        <div className="card-header">
          <h4 className="subtitle--2 pt-3 gray text-center">
            You are just a few steps away
            <br /> from activating your accounts.
          </h4>
        </div>
      </Card>
      <Card
        className="dashboard__card offset-md-2 col-md-8 mb-0 rounded-0"
        color="black"
      >
        Follow the 5 steps below to complete your account whenever you are
        ready. <br />
        Once completed, your account would be approved within 24 hours.
      </Card>
      <Onboarding.Card status={STATUS.COMPLETED} title="Entertainers Profile" />
      <Onboarding.Card status={STATUS.PENDING} title="Bank Account Details" />
      <Onboarding.Card status={STATUS.PENDING} title="Emergency Contact" />
      <Onboarding.Card status={STATUS.PENDING} title="Youtube Video" />
      <Onboarding.Card status={STATUS.PENDING} title="Valid Identification " />
    </>
  );
};

Onboarding.Card = ({ title, status }) => (
  <Card
    className="dashboard__card offset-md-2 col-md-8 mb-0 rounded-0"
    color={status === STATUS.COMPLETED ? 'green' : 'black'}
    hover
  >
    <h3>
      <span
        className={classNames(
          'icon',
          {
            'icon-circle': STATUS.PENDING
          },
          {
            'icon-ok-circles': STATUS.COMPLETED
          }
        )}
      />
      {title}
    </h3>
  </Card>
);

Onboarding.Card.propTypes = {
  status: PropTypes.oneOf(Object.values(STATUS)).isRequired,
  title: PropTypes.string.isRequired
};

export default Onboarding;
