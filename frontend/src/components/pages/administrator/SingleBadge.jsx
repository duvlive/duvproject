import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import { getTokenFromStore } from 'utils/localStorage';
import AwardCard from 'components/common/utils/AwardCard';
import { getShortDate } from 'utils/date-helpers';
import Humanize from 'humanize-plus';
import Image from 'components/common/utils/Image';
import ProfileAvatar from 'assets/img/avatar/profile.png';

const SingleBadge = ({ id }) => {
  const [badge, setBadge] = React.useState(null);

  React.useEffect(() => {
    axios
      .get('/api/v1/admin/badge', {
        params: { id },
        headers: {
          'x-access-token': getTokenFromStore(),
        },
      })
      .then(function (response) {
        const { status, data } = response;
        console.log('data', data);
        // handle success
        if (status === 200) {
          setBadge(data.badge);
        }
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        setBadge([]);
      });
  }, [id]);

  return (
    <BackEndPage title="Manage Badge">
      <div className="main-app">
        <TopMessage message="Badge" />
        <section className="app-content">
          {badge && <BadgeDetails badge={badge} />}
        </section>
      </div>
    </BackEndPage>
  );
};

SingleBadge.propTypes = {
  id: PropTypes.any,
};
SingleBadge.defaultProps = {
  id: '',
};

const BadgeDetails = ({ badge }) => (
  <section>
    <div className="row">
      <AwardCard
        color={badge.color}
        date={getShortDate(badge.createdAt)}
        title={badge.title}
      />
      <div className="col-lg-9 col-md-8 col-6">
        <h3 className="font-weight-normal mb-1">{badge.title}</h3>
        <small className="small--2">
          Assigned To: {badge.userBadges.length}{' '}
          {Humanize.pluralize(badge.userBadges.length, 'Entertainer')}
        </small>
        <p className="">{badge.description}</p>
      </div>
    </div>

    <div className="row">
      <h4 className="col-sm-12 pt-4 pb-3 font-weight-normal">
        Assigned Entertainers
      </h4>
      {badge.userBadges.map(({ badgeUser }, index) => (
        <div className="col-lg-3 col-md-4 col-6" key={index}>
          <div
            className={`card card-custom card-tiles card-black card__no-hover`}
          >
            <div className="text-center mt-3">
              <Image
                className="avatar--medium"
                name={`${index}-entertainer`}
                responsiveImage={false}
                src={badgeUser.profileImageURL || ProfileAvatar}
              />
              <h6 className="small--2 text-muted-light-2 mt-2">
                {badgeUser.profile.stageName}
              </h6>
            </div>
            <div className="card-body m-0 fh-3 text-center">
              <div className="small--3 text-gray">
                <a
                  className="btn btn-info btn-sm btn-transparent"
                  href={`/entertainers/profile/${badgeUser.profile.slug}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

BadgeDetails.propTypes = {
  badge: PropTypes.object.isRequired,
};

export default SingleBadge;
