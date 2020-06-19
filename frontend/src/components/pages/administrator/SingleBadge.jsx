import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import { getTokenFromStore } from 'utils/localStorage';
// import Image from 'components/common/utils/Image';
// import classNames from 'classnames';
// import Button from 'components/forms/Button';
import AwardCard from 'components/common/utils/AwardCard';
import { getShortDate } from 'utils/date-helpers';
import Humanize from 'humanize-plus';
import Image from 'components/common/utils/Image';
import ProfileAvatar from 'assets/img/avatar/profile.png';
import { twoDigitNumber } from 'utils/helpers';

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
  <>
    <section className="row">
      <AwardCard
        color={badge.color}
        date={getShortDate(badge.createdAt)}
        title={badge.title}
      />
      <div className="col-lg-9 col-md-8 col-6">
        <h3 className="font-weight-normal">{badge.description}</h3>
        <p>
          Added By:{' '}
          <Image
            className="avatar--small"
            name={`${badge.id}-badge`}
            responsiveImage={false}
            src={badge.creator.profileImageURL || ProfileAvatar}
          />
          {badge.creator.firstName} {badge.creator.lastName}
        </p>
        <p>
          Assigned To: {badge.userBadges.length}{' '}
          {Humanize.pluralize(badge.userBadges.length, 'Entertainer')}
        </p>
        <p>Created On: {getShortDate(badge.createdAt)}</p>
      </div>
    </section>
    <section className="row">
      <table className="table">
        {badge.userBadges.map(({ badgeUser }, index) => (
          <tr>
            <th className="table__number align-middle" scope="row">
              {twoDigitNumber(index + 1)}
            </th>
            <td className=" align-middle">
              <Image
                className="avatar--medium--small"
                name={`${index}-entertainer`}
                responsiveImage={false}
                src={badgeUser.profileImageURL || ProfileAvatar}
              />
            </td>
            <td className="align-middle">
              <small className="small--4 text-muted">Stage Name</small>
              <span className="table__title">
                {badgeUser.profile.stageName || '-'}
              </span>
            </td>

            <td className="align-middle">
              <>
                <a
                  className="btn btn-info btn-sm btn-transparent"
                  href={`/entertainers/${badgeUser.profile.slug}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Profile
                </a>
              </>
            </td>
          </tr>
        ))}
      </table>
    </section>
  </>
);

BadgeDetails.propTypes = {
  badge: PropTypes.object.isRequired,
};

export default SingleBadge;
