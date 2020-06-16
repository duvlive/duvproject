import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import { getTokenFromStore } from 'utils/localStorage';
import Image from 'components/common/utils/Image';
import { USER_TYPES } from 'utils/constants';
import classNames from 'classnames';
import Button from 'components/forms/Button';

const userTypes = Object.keys(USER_TYPES);

const SingleUser = ({ id }) => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    axios
      .get('/api/v1/admin/user', {
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
          setUser(data.user);
        }
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        setUser([]);
      });
  }, [id]);

  return (
    <BackEndPage title="Manage User">
      <div className="main-app">
        <TopMessage message="User Profile" />
        <section className="app-content">
          {user && <UserProfile user={user} />}
        </section>
      </div>
    </BackEndPage>
  );
};

const UserProfile = ({ user }) => (
  <div className="col-md-6 offset-md-3 col-sm-8 offset-sm-2">
    <section className="text-center">
      <Image
        className="avatar--large"
        name={(user && user.firstName) || 'No name'}
        responsiveImage={false}
        src={user.profileImageURL || 'No src'}
      />
      <h3 className="font-weight-normal">
        {user.firstName} {user.lastName} <br />
      </h3>
      <span className="text-muted">{userTypes[user.type].toUpperCase()}</span>
    </section>
    <ul className={classNames('list-group  mt-4', { transparent: true })}>
      <li className="list-group-item">
        <small className="small-text__with-icon">
          <i className="icon icon-user-circle"></i>
          Full Name
        </small>
        <h5 className="event-list-label">
          {user.firstName} {user.lastName}
        </h5>
      </li>
      <li className="list-group-item">
        <small className="small-text__with-icon">
          <i className="icon icon-vcard"></i>
          Email
        </small>
        <h5 className="event-list-label">{user.email}</h5>
      </li>
      <li className="list-group-item">
        <small className="small-text__with-icon">
          <i className="icon icon-vcard"></i> Phone Number
        </small>
        <h5 className="event-list-label text-muted-light-2">
          {user.phoneNumber}
        </h5>
      </li>
      {user.phoneNumber2 && (
        <li className="list-group-item">
          <small className="small-text__with-icon">
            <i className="icon icon-vcard"></i>
            Phone Number 2
          </small>
          <h5 className="event-list-label text-muted-light-2">
            {user.phoneNumber2}
          </h5>
        </li>
      )}
    </ul>
    <div className="mt-4">
      <Button className="btn-transparent btn-wide">Ban User</Button>
    </div>
  </div>
);

UserProfile.propTypes = {
  user: PropTypes.object.isRequired,
};

SingleUser.propTypes = {
  id: PropTypes.any,
};
SingleUser.defaultProps = {
  id: '',
};

export default SingleUser;
