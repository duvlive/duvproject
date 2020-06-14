import React from 'react';
import PropTypes from 'prop-types';
import BackEndPage from 'components/common/layout/BackEndPage';
import Image from 'components/common/utils/Image';
import ProfileAvatar from 'assets/img/avatar/profile.png';
import { Link } from '@reach/router';
import AdminList from 'components/common/pages/AdminList';
import { twoDigitNumber } from 'utils/helpers';

const Entertainers = () => {
  return (
    <BackEndPage title="Entertainers">
      <AdminList
        apiData="entertainers"
        apiUrl="/api/v1/entertainers-all"
        pageName="Entertainer"
        tableRow={EntertainersRow}
      />
    </BackEndPage>
  );
};

const EntertainersRow = ({
  id,
  number,
  stageName,
  entertainerType,
  profileImageURL,
  location,
  willingToTravel,
}) => (
  <tr>
    <th className="table__number align-middle" scope="row">
      {twoDigitNumber(number)}
    </th>
    <td className=" align-middle">
      <Image
        className="avatar--medium--small"
        name={`${number}-entertainer`}
        responsiveImage={false}
        src={profileImageURL || ProfileAvatar}
      />
    </td>
    <td className="align-middle">
      <span className="table__title">{stageName}</span>
    </td>

    <td className="align-middle text-left">
      <span className="text-muted-light-2">{entertainerType}</span>
    </td>

    <td className="align-middle text-left">
      <span className="text-muted-light-2">{location}</span>
    </td>

    <td className="align-middle">
      {willingToTravel ? (
        <span className="text-muted-light text-uppercase">
          <i className="icon icon-ok-circled"></i> Yes{' '}
        </span>
      ) : (
        <span className="text-red text-uppercase">
          <i className="icon icon-help"></i> No{' '}
        </span>
      )}
    </td>

    <td className="align-middle">
      <Link to={`/admin/entertainers/${id}`}>Manage</Link>
    </td>
  </tr>
);

EntertainersRow.defaultProps = {
  entertainerType: null,
  location: null,
  profileImageURL: null,
  stageName: null,
  willingToTravel: false,
};

EntertainersRow.propTypes = {
  entertainerType: PropTypes.string,
  id: PropTypes.any.isRequired,
  location: PropTypes.string,
  number: PropTypes.any.isRequired,
  profileImageURL: PropTypes.string,
  stageName: PropTypes.string,
  willingToTravel: PropTypes.bool,
};

export default Entertainers;
