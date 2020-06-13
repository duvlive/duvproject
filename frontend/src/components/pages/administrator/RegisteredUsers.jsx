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
import { USER_TYPES } from 'utils/constants';
import ReactPaginate from 'react-paginate';
import { Link } from '@reach/router';

const userTypes = Object.keys(USER_TYPES);

// 1. add url
// 2. name of page -> users
// 3. change all instances of users to result

const RegisteredUsers = () => {
  const inActiveData = { users: null, pagination: {} };
  const [data, setData] = React.useState(inActiveData);
  const [currPage, setCurrPage] = React.useState(0);

  React.useEffect(() => {
    axios
      .get('/api/v1/admin/users', {
        params: { offset: currPage },
        headers: {
          'x-access-token': getTokenFromStore(),
        },
      })
      .then(function (response) {
        const { status, data } = response;
        // handle success
        if (status === 200) {
          setData(data);
        }
      })
      .catch(function (error) {
        setData({ users: [], pagination: {} });
      });
  }, [currPage]);

  const noOfUsers = data.pagination.total || 0;

  return (
    <BackEndPage title="Registered">
      <div className="main-app">
        <section className="app-content">
          <div className="row mt-3 mb-2">
            <div className="col-sm-6">
              <h3 className="main-app__title">
                {`${noOfUsers} ${Humanize.pluralize(noOfUsers, 'User')}`}
              </h3>
            </div>
          </div>
          <LoadItems
            items={data.users}
            loadingText="Loading Registered Users"
            noContent={<NoContent isButton text="No Users found" />}
          >
            <UsersTable
              offset={data.pagination.offset || 0}
              users={data.users || []}
            />
            <div className="text-right">
              <ReactPaginate
                activeClassName={'active'}
                breakClassName={'break-me'}
                breakLabel={'...'}
                containerClassName={'pagination'}
                marginPagesDisplayed={3} // ending point list
                nextLabel={'Next'}
                onPageChange={(data) => setCurrPage(data.selected)}
                pageCount={data.pagination.totalPage} // number of pages
                pageRangeDisplayed={3} // start point
                previousLabel={'Prev'}
                subContainerClassName={'page-item'}
              />
            </div>
          </LoadItems>
        </section>
      </div>
    </BackEndPage>
  );
};

const UsersTable = ({ users, offset }) => (
  <div className="table-responsive">
    <table className="table table-dark table__no-border table__with-bg">
      <tbody>
        {users.map((user, index) => (
          <UsersRow key={index} number={offset + index + 1} {...user} />
        ))}
      </tbody>
    </table>
    <br />
  </div>
);

UsersTable.propTypes = {
  offset: PropTypes.number.isRequired,
  users: PropTypes.array.isRequired,
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
        <span className="text-muted-light text-uppercase">
          <i className="icon icon-ok-circled"></i> Activated{' '}
        </span>
      ) : (
        <span className="text-red text-uppercase">
          <i className="icon icon-help"></i> Not Verified{' '}
        </span>
      )}
    </td>

    <td className="align-middle">
      <Link to={`/admin/users/${id}`}>Manage</Link>
    </td>
  </tr>
);

UsersRow.defaultProps = {
  profileImageURL: '',
};

UsersRow.propTypes = {
  firstName: PropTypes.string.isRequired,
  id: PropTypes.any.isRequired,
  isActive: PropTypes.bool.isRequired,
  lastName: PropTypes.string.isRequired,
  number: PropTypes.any.isRequired,
  profileImageURL: PropTypes.string,
  type: PropTypes.any.isRequired,
};

export default RegisteredUsers;
