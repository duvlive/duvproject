import React from 'react';
import TopMessage from 'components/common/layout/TopMessage';
import PropTypes from 'prop-types';
import Card from 'components/custom/Card';
import classNames from 'classnames';
import { Link } from '@reach/router';
import { UserContext } from 'context/UserContext';
import { ONBOARDING_STEPS } from 'utils/constants';
import WelcomeSlides from 'components/common/utils/WelcomeSlides';
import welcomeSlide from 'data/firstTimeEntertainer';
import AlertMessage from 'components/common/utils/AlertMessage';

const Onboarding = () => {
  const { userState } = React.useContext(UserContext);

  const steps = Object.keys(ONBOARDING_STEPS);
  const done = [
    !!userState.entertainerProfile.stageName && !!userState.profileImg,
    !!userState.bankDetail && !!userState.bankDetail.bankName,
    (userState.contacts.length > 0 &&
      !!(userState.contacts[0] && userState.contacts[0].firstName)) ||
      !!(userState.contacts[1] && userState.contacts[1].firstName),
    !!userState.entertainerProfile.youTubeChannel,
    !!userState.identification.idType,
  ];

  const onboardingTasks = steps.map((step, index) => ({
    link: `/entertainer/account-setup/${index + 1}`,
    title: ONBOARDING_STEPS[step].title,
    approved: userState.approvalComment[steps[index]] === 'YES',
    done: done[index],
    rejected:
      userState.approvalComment[steps[index]] !== null &&
      userState.approvalComment[steps[index]] !== 'YES',
  }));

  const entertainerIsDone = done.every((isDone) => isDone);
  const firstUndoneIndex = done.findIndex((isDone) => !isDone);

  return (
    <section className="px-5">
      <TopMessage message={`Hello ${userState.firstName},`} />
      {userState.alert === 'entertainer-upgrade' && (
        <div className="mt-4">
          <AlertMessage
            message="Your upgrade was successful. Welcome to your Entertainer Account"
            type="success"
          />
        </div>
      )}
      {userState.firstTimeLogin && <WelcomeSlides items={welcomeSlide} />}
      <Card
        className="dashboard__card col-md-12 px-5 mt-5 mb-0 rounded-0"
        color={entertainerIsDone ? 'green' : 'blue'}
      >
        <h4 className="onboarding__title">
          {entertainerIsDone ? (
            <>Your account will be approved within 24 hours</>
          ) : (
            <>
              You are just a few steps away
              <br /> from activating your account.
            </>
          )}
        </h4>
      </Card>
      <Card
        className="dashboard__card col-md-12 px-5 mb-0 rounded-0"
        color="black"
      >
        <p className="onboarding__instruction">
          Follow the 5 steps below to complete your account whenever you are
          ready. <br />
          Once completed, your account would be approved within 24 hours.
        </p>
      </Card>
      {onboardingTasks.map((task, index) => (
        <Onboarding.Card key={index} number={index + 1} {...task} />
      ))}

      {!entertainerIsDone && (
        <div className="text-center">
          <Link
            className="btn btn-danger btn-lg btn-wide btn-transparent mt-5"
            to={`/entertainer/account-setup/${firstUndoneIndex + 1}`}
          >
            Continue Setup
          </Link>
        </div>
      )}
    </section>
  );
};

Onboarding.Card = ({ approved, done, link, rejected, title, number }) => {
  return (
    <Link to={link}>
      <Card
        className="dashboard__card col-md-12 px-5 mb-0 rounded-0"
        color={approved ? 'green' : 'black'}
        hover={!approved}
      >
        <h5 className="onboarding__text">
          <span
            className={classNames(
              'icon',
              {
                'icon-circle pending': done && !approved && !rejected,
              },
              {
                'icon-ok completed': approved,
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
  approved: PropTypes.bool.isRequired,
  done: PropTypes.bool.isRequired,
  link: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  rejected: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default Onboarding;
