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
import ProfileAvatar from 'assets/img/avatar/profile.png';
import DuvLiveModal from 'components/custom/Modal';
import AlertMessage from 'components/common/utils/AlertMessage';
import Input from 'components/forms/Input';
import { Form, Formik } from 'formik';
import { email } from 'components/forms/schema/schema-helpers';
import { DisplayFormikState } from 'components/forms/form-helper';

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

SingleUser.propTypes = {
  id: PropTypes.any,
};
SingleUser.defaultProps = {
  id: '',
};

const UserProfile = ({ user }) => {
  const [message, setMessage] = React.useState(null);

  const performStatusAction = (action) => {
    axios
      .put(
        `/api/v1/user/${action}/${user.id}`,
        {},
        {
          headers: { 'x-access-token': getTokenFromStore() },
        }
      )
      .then(function (response) {
        const { status, data } = response;
        if (status === 200) {
          setMessage({
            type: 'success',
            message: data.message,
          });
        }
      })
      .catch(function (error) {
        setMessage({
          type: 'danger',
          message: error.response.data.message,
        });
      });
  };

  const resendVerificationMail = () => {
    axios
      .post(
        '/api/v1/admin/user/resend-verification-mail',
        { id: user.id },
        {
          headers: { 'x-access-token': getTokenFromStore() },
        }
      )
      .then(function (response) {
        const { status, data } = response;
        if (status === 200) {
          setMessage({
            type: 'success',
            message: data.message,
          });
        }
      })
      .catch(function (error) {
        setMessage({
          type: 'danger',
          message: error.response.data.message,
        });
      });
  };

  const activateUser = () => {
    axios
      .post(
        '/api/v1/admin/user/activate',
        { id: user.id },
        {
          headers: { 'x-access-token': getTokenFromStore() },
        }
      )
      .then(function (response) {
        const { status, data } = response;
        if (status === 200) {
          setMessage({
            type: 'success',
            message: data.message,
          });
        }
      })
      .catch(function (error) {
        setMessage({
          type: 'danger',
          message: error.response.data.message,
        });
      });
  };

  const confirmUserAccountProps = {
    actionFn: activateUser,
    actionText: 'Confirm User account',
    body: (
      <h4 className="text-white">
        Are you sure you want to activate user account.
      </h4>
    ),
    title: 'Confirm User account',
  };

  const verificationProps = {
    actionFn: resendVerificationMail,
    actionText: 'Resend Verification Mail',
    body: (
      <h4 className="text-white">
        Are you sure you want to resend mail to user
      </h4>
    ),
    title: 'Resend Verification Mail',
  };

  const actionStatusProps = (status, name) => ({
    actionFn: () => performStatusAction(status),
    actionText: `${name} User`,
    body: <h4 className="text-white">Are you sure you want to {name} user</h4>,
    title: `${name} User`,
  });

  return (
    <div className="col-md-6 offset-md-3 col-sm-8 offset-sm-2">
      <section className="text-center">
        <Image
          className="avatar--large"
          name={(user && user.firstName) || 'No name'}
          responsiveImage={false}
          src={user.profileImageURL || ProfileAvatar}
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
          <DuvLiveModal
            body={<CorrectEmailAddressForm user={user} />}
            closeModalText="Cancel"
            title="Change Email Address"
          >
            <div className="small--2 text-link text-muted">
              Update Email Address
            </div>
          </DuvLiveModal>
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

        <li className="list-group-item">
          <small className="small-text__with-icon">
            <i className="icon icon-vcard"></i> Account Status
          </small>
          <h5 className="event-list-label text-muted-light-2">
            {user.accountStatus}
          </h5>
        </li>
      </ul>
      <div className="my-3">
        <AlertMessage {...message} />
      </div>
      <div className="mt-4">
        {user.accountStatus === 'ACTIVE' ? (
          <>
            <DuvLiveModal {...actionStatusProps('BANNED', 'Ban')}>
              <Button className="btn-transparent btn-warning btn-wide">
                Ban User
              </Button>
            </DuvLiveModal>
            &nbsp;&nbsp;&nbsp;
            <DuvLiveModal {...actionStatusProps('DEACTIVATED', 'Deactivate')}>
              <Button className="btn-transparent btn-danger btn btn-wide">
                Deactivate Account
              </Button>
            </DuvLiveModal>
          </>
        ) : (
          <DuvLiveModal {...actionStatusProps('ACTIVE', 'Activate')}>
            <Button className="btn-transparent btn-success btn-wide">
              Activate Account
            </Button>
          </DuvLiveModal>
        )}
      </div>

      {!user.isActive && (
        <div className="mt-4">
          <DuvLiveModal {...verificationProps}>
            <Button className="btn-transparent btn-info btn- btn-wide">
              Resend Verification Mail
            </Button>
          </DuvLiveModal>
          &nbsp;&nbsp;&nbsp;
          <DuvLiveModal {...confirmUserAccountProps}>
            <Button className="btn-transparent btn-success btn-wide">
              Confirm User Account
            </Button>
          </DuvLiveModal>
        </div>
      )}
    </div>
  );
};

UserProfile.propTypes = {
  user: PropTypes.object.isRequired,
};

const CorrectEmailAddressForm = ({ user }) => {
  const [message, setMessage] = React.useState({});

  return (
    <Formik
      initialValues={{ email: '' }}
      onSubmit={({ email }, actions) => {
        console.log('email', email);
        axios
          .put(
            `/api/v1/admin/user/update-email`,
            { id: user.id, email },
            {
              headers: { 'x-access-token': getTokenFromStore() },
            }
          )
          .then(function (response) {
            const { status, data } = response;
            console.log('data', data);
            if (status === 200) {
              setMessage({
                msg: data.message,
                type: 'success',
              });
              actions.resetForm();
              actions.setSubmitting(false);
            }
          })
          .catch(function (error) {
            setMessage({ msg: error.response.data.message });
            actions.setSubmitting(false);
          });
      }}
      render={({ isSubmitting, handleSubmit, ...props }) => (
        <>
          <Form>
            <AlertMessage
              message={message && message.msg}
              type={message && message.type}
            />
            <label className="label">Old Email</label>
            <div className="form-control mb-4">{user.email}</div>

            <Input
              isValidMessage="Email address seems valid"
              label="New Email"
              name="email"
              placeholder="New Email Address"
            />
            <DisplayFormikState {...props} showAll />
            <Button
              className="btn-info btn-wide btn-transparent mt-2"
              loading={isSubmitting}
              onClick={handleSubmit}
            >
              Update Email Address
            </Button>
          </Form>
        </>
      )}
      validationSchema={{ email }}
    />
  );
};

CorrectEmailAddressForm.propTypes = {
  user: PropTypes.any,
};

CorrectEmailAddressForm.defaultProps = {
  user: { id: 0, email: null },
};

export default SingleUser;
