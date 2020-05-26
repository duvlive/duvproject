import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import BackEndPage from 'components/common/layout/BackEndPage';
import { getTokenFromStore } from 'utils/localStorage';
import LoadItems from 'components/common/utils/LoadItems';
import NoContent from 'components/common/utils/NoContent';
import Image from 'components/common/utils/Image';
import ProfileAvatar from 'assets/img/avatar/profile.png';
import Humanize from 'humanize-plus';

const BandMembers = () => {
  const [bandMembers, setBandMembers] = React.useState(null);

  React.useEffect(() => {
    axios
      .get('/api/v1/bandMembers/team', {
        headers: {
          'x-access-token': getTokenFromStore(),
        },
      })
      .then(function (response) {
        const { status, data } = response;
        // handle success
        if (status === 200) {
          setBandMembers(data.bandMembers);
        }
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        setBandMembers([]);
      });
  }, []);

  const noOfBandMembers = (bandMembers || []).length;

  return (
    <BackEndPage title="Band Members">
      <div className="main-app">
        <section className="app-content">
          <div className="row mt-3 mb-2">
            <div className="col-sm-6">
              <h3 className="main-app__title">
                {`${noOfBandMembers} Band ${Humanize.pluralize(
                  noOfBandMembers,
                  'Member'
                )}`}
              </h3>
            </div>
          </div>
          <LoadItems
            items={bandMembers}
            loadingText="Loading your Band Members"
            noContent={<NoContent isButton text="No Band Member found" />}
          >
            <BandMembersTable bandMembers={bandMembers || []} />
          </LoadItems>
        </section>
      </div>
    </BackEndPage>
  );
};

const BandMembersTable = ({ bandMembers }) => (
  <div className="table-responsive">
    <table className="table table-dark table__no-border table__with-bg">
      <tbody>
        {bandMembers.map((bandMember, index) => (
          <BandMembersRow key={index} number={index + 1} {...bandMember} />
        ))}
      </tbody>
    </table>
    <br />
    <br />
  </div>
);

BandMembersTable.propTypes = {
  bandMembers: PropTypes.array.isRequired,
};

const BandMembersRow = ({
  number,
  email,
  firstName,
  lastName,
  bandRole,
  profileImageURL,
  isActive,
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

    <td className="align-middle">
      <span className="table__title">{email}</span>
    </td>

    <td className="align-middle text-left">
      <span className="text-white">{bandRole}</span>
    </td>

    <td className="align-middle">
      {isActive ? (
        <span className="text-green text-uppercase">
          <i className="icon icon-ok-circled"></i> Verified{' '}
        </span>
      ) : (
        <span className="text-red text-uppercase">
          <i className="icon icon-help"></i> Not Verified{' '}
        </span>
      )}
    </td>
  </tr>
);

BandMembersRow.defaultProps = {
  profileImageURL: '',
};

BandMembersRow.propTypes = {
  bandRole: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  lastName: PropTypes.string.isRequired,
  number: PropTypes.any.isRequired,
  profileImageURL: PropTypes.string,
};

export default BandMembers;
