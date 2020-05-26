import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import { getShortDate } from 'utils/date-helpers';
import { getTokenFromStore } from 'utils/localStorage';
import LoadingScreen from 'components/common/layout/LoadingScreen';
import NoContent from 'components/common/utils/NoContent';
import AwardCard from 'components/common/utils/AwardCard';

const Badges = () => {
  const [badges, setBadges] = React.useState(null);
  React.useEffect(() => {
    axios
      .get('/api/v1/badges/bandMember', {
        headers: {
          'x-access-token': getTokenFromStore(),
        },
      })
      .then(function (response) {
        const { status, data } = response;
        console.log('status,data', status, data);
        // handle success
        if (status === 200) {
          console.log('data', data);
          setBadges(data.badges);
        }
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        setBadges([]);
      });
  }, []);

  return (
    <BackEndPage title="Badges">
      <div className="main-app">
        <TopMessage message="Team Badges" />

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
  return badges.map(({ badge }, index) => (
    <AwardCard
      color={badge.color}
      date={getShortDate(badge.createdAt)}
      key={index}
      title={badge.title}
    />
  ));
};

Badges.CardLists.propTypes = {
  badges: PropTypes.array.isRequired,
};

export default Badges;
