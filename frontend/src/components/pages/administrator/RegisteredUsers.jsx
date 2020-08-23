import React from 'react';
import PropTypes from 'prop-types';
import BackEndPage from 'components/common/layout/BackEndPage';
import Image from 'components/common/utils/Image';
import ProfileAvatar from 'assets/img/avatar/profile.png';
import { USER_TYPES } from 'utils/constants';
import { Link } from '@reach/router';
import AdminList from 'components/common/pages/AdminList';

const userTypes = Object.keys(USER_TYPES);

const RegisteredUsers = () => {
  return (
    <BackEndPage title="Registered Users">
      <AdminList
        apiData="users"
        apiUrl="/api/v1/admin/users"
        pageName="User"
        tableRow={UsersRow}
      />
    </BackEndPage>
  );
};

// only thing needed
const UsersRow = ({
  id,
  number,
  firstName,
  lastName,
  profileImageURL,
  type,
  isActive,
  accountStatus,
}) => (
  <tr>
    <th className="table__number align-middle" scope="row">
      {number}
    </th>
    <td className=" align-middle">
      <Image
        className="avatar--medium--small"
        name={firstName + number}
        responsiveImage={false}
        src={profileImageURL || ProfileAvatar}
      />
    </td>
    <td className="align-middle">
      <span className="table__title">
        {firstName} {lastName}
      </span>
    </td>

    <td className="align-middle text-left">
      <span className="text-muted-light-2">
        {type > USER_TYPES.bandMember
          ? 'UNKNOWN'
          : userTypes[type].toUpperCase()}
      </span>
    </td>

    <td className="align-middle">
      {isActive ? (
        <span className="text-muted small text-uppercase">
          <i className="icon icon-ok-circled"></i> Verified{' '}
        </span>
      ) : (
        <span className="text-red small text-uppercase">
          <i className="icon icon-help"></i> Not Verified{' '}
        </span>
      )}
    </td>

    <td className="align-middle">
      {accountStatus === 'ACTIVE' ? (
        <span className="text-muted text-uppercase">
          <i className="icon icon-help"></i> Active{' '}
        </span>
      ) : (
        <span className="text-warning text-uppercase">
          <i className="icon icon-help"></i> {accountStatus}{' '}
        </span>
      )}
    </td>

    <td className="align-middle">
      <Link
        className="btn btn-info btn-sm btn-transparent"
        to={`/admin/users/${id}`}
      >
        Manage
      </Link>
    </td>
  </tr>
);

UsersRow.defaultProps = {
  profileImageURL: '',
};

UsersRow.propTypes = {
  accountStatus: PropTypes.any.isRequired,
  firstName: PropTypes.string.isRequired,
  id: PropTypes.any.isRequired,
  isActive: PropTypes.bool.isRequired,
  lastName: PropTypes.string.isRequired,
  number: PropTypes.any.isRequired,
  profileImageURL: PropTypes.string,
  type: PropTypes.any.isRequired,
};

export default RegisteredUsers;
