import React from 'react';
import PropTypes from 'prop-types';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import { getShortDate } from 'utils/date-helpers';
import LoadingScreen from 'components/common/layout/LoadingScreen';
import { UserContext } from 'context/UserContext';
import NoContent from 'components/common/utils/NoContent';
import AwardCard from 'components/common/utils/AwardCard';

const Badges = () => {
  const { userState } = React.useContext(UserContext);
  const badges = userState.badges;

  return (
    <BackEndPage title="Badges">
      <div className="main-app">
        <TopMessage message="Awarded Badges" />

        <section className="app-content">
          <section className="badges">
            <div className="row">
              {badges == null ? (
                <LoadingScreen loading={true} text="Loading Your Badges" />
              ) : badges.length > 0 ? (
                <Badges.CardLists badges={badges} />
              ) : (
                <>
                  <div className="col-sm-12">
                    <NoContent text="You have no Badges" />
                  </div>
                </>
              )}
            </div>
          </section>
        </section>
      </div>
    </BackEndPage>
  );
};

Badges.CardLists = ({ badges }) => {
  return badges.map(
    ({ badge, createdAt }, index) =>
      badge &&
      badge.color && (
        <AwardCard
          color={badge.color}
          date={getShortDate(createdAt)}
          key={index}
          title={badge.title}
        />
      )
  );
};

Badges.CardLists.propTypes = {
  badges: PropTypes.array.isRequired,
};

export default Badges;
