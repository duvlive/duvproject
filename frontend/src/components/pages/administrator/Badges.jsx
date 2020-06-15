import React from 'react';
import PropTypes from 'prop-types';
import BackEndPage from 'components/common/layout/BackEndPage';
import Image from 'components/common/utils/Image';
import ProfileAvatar from 'assets/img/avatar/profile.png';
import { Link } from '@reach/router';
import Humanize from 'humanize-plus';
import AdminList from 'components/common/pages/AdminList';
import { twoDigitNumber } from 'utils/helpers';
import { getShortDate } from 'utils/date-helpers';

const Badges = () => {
  return (
    <BackEndPage title="Badges">
      <AdminList
        apiData="badges"
        apiUrl="/api/v1/badges-all"
        pageName="Badge"
        tableRow={BadgesRow}
      />
    </BackEndPage>
  );
};

const BadgesRow = ({
  color,
  creator,
  id,
  title,
  number,
  createdAt,
  userBadges,
}) => (
  <tr>
    <th className="table__number align-middle" scope="row">
      {twoDigitNumber(number)}
    </th>
    <td className="align-middle">
      <small className="small--4 text-muted">Title</small>
      <span className={`table__title text-${color}-100`}>{title}</span>
    </td>

    <td className="align-middle text-left">
      <small className="small--4 text-muted">Assigned to </small>
      <span className="text-muted-light-2">
        {userBadges.length}{' '}
        {Humanize.pluralize(userBadges.length, 'Entertainer')}
      </span>
    </td>

    <td className="align-middle text-left">
      <small className="small--4 text-muted">Created On</small>
      <span className="text-muted-light-2">{getShortDate(createdAt)}</span>
    </td>

    <td className=" align-middle">
      <Image
        className="avatar--small"
        name={`${number}-badge`}
        responsiveImage={false}
        src={creator.profileImageURL || ProfileAvatar}
      />
    </td>

    <td className="align-middle text-left">
      <small className="small--4 text-muted">Added By</small>
      <span className="text-muted-light-2">
        {creator.firstName} {creator.lastName}
      </span>
    </td>

    <td className="align-middle">
      <Link
        className="btn btn-sm btn-transparent btn-danger"
        to={`/admin/badges/${id}`}
      >
        Manage
      </Link>
    </td>
  </tr>
);

BadgesRow.defaultProps = {
  color: null,
  title: null,
  createdAt: null,
  userBadges: [],
  creator: { firstName: null, lastName: null },
};

BadgesRow.propTypes = {
  color: PropTypes.string,
  createdAt: PropTypes.string,
  creator: PropTypes.object,
  id: PropTypes.any.isRequired,
  number: PropTypes.any.isRequired,
  title: PropTypes.string,
  userBadges: PropTypes.array,
};

export default Badges;
