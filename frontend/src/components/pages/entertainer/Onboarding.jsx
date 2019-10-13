import React from 'react';
import TopMessage from 'components/common/layout/TopMessage';
import PropTypes from 'prop-types';
import Card from 'components/custom/Card';
import classNames from 'classnames';
import { Link } from '@reach/router';

const STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed'
};

const Onboarding = () => {
  return (
    <>
      <TopMessage message="Hello DJ Cuppy," />
      <Card
        className="dashboard__card offset-md-2 col-md-8 mt-5 mb-0 rounded-0"
        color="blue"
      >
        <h4 className="onboarding__title">
          You are just a few steps away
          <br /> from activating your account.
        </h4>
      </Card>
      <Card
        className="dashboard__card offset-md-2 col-md-8 mb-0 rounded-0"
        color="black"
      >
        <p className="onboarding__instruction">
          Follow the 5 steps below to complete your account whenever you are
          ready. <br />
          Once completed, your account would be approved within 24 hours.
        </p>
      </Card>
      <Onboarding.List status={STATUS.COMPLETED} title="Entertainers Profile" />
      <div className="text-center">
        <button className="btn btn-danger btn-lg btn-wide btn-transparent mt-5">
          Continue Setup
        </button>
      </div>
    </>
  );
};

Onboarding.List = () => {
  const onboardingTasks = [
    {
      title: 'Entertainers Profile',
      status: STATUS.COMPLETED,
      link: '/profile'
    },
    { title: 'Bank Account Details', status: STATUS.PENDING, link: '/profile' },
    { title: 'Emergency Contact', status: STATUS.PENDING, link: '/profile' },
    { title: 'Youtube Video', status: STATUS.PENDING, link: '/profile' },
    { title: 'Valid Identification', status: STATUS.PENDING, link: '/profile' }
  ];

  return onboardingTasks.map((task, index) => (
    <Onboarding.Card key={index} number={index + 1} {...task} />
  ));
};

Onboarding.Card = ({ title, status, number, link }) => {
  const userHasCompletedTask = status === STATUS.COMPLETED;
  return (
    <Link to={link}>
      <Card
        className="dashboard__card offset-md-2 col-md-8 mb-0 rounded-0"
        color={userHasCompletedTask ? 'green' : 'black'}
        hover={!userHasCompletedTask}
      >
        <h5 className="onboarding__text">
          <span
            className={classNames(
              'icon',
              {
                'icon-circle pending': !userHasCompletedTask
              },
              {
                'icon-ok-circled completed': userHasCompletedTask
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
