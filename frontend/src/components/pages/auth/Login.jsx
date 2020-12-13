import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import * as queryString from 'query-string';
import Header from 'components/common/layout/Header';
import Footer from 'components/common/layout/Footer';
import { Formik, Form } from 'formik';
import Input from 'components/forms/Input';
import { Link } from '@reach/router';
import { Col, Row } from 'reactstrap';
import Quotes from 'components/common/utils/Quotes';
import { feedback } from 'components/forms/form-helper';
import Button from 'components/forms/Button';
import { loginSchema } from 'components/forms/schema/userSchema';
import { navigate } from '@reach/router';
import { DASHBOARD_PAGE, USER_TYPES } from 'utils/constants';
import {
  getHiredEntertainerFromStore,
  getTokenFromStore,
  storeToken,
  storeUserType,
} from 'utils/localStorage';
import AlertMessage from 'components/common/utils/AlertMessage';
import { UserContext } from 'context/UserContext';
import { getProxy } from 'utils/helpers';

const Login = ({ token, sid, location }) => {
  const queryParams = queryString.parse(location.search);
  const { url } = queryParams;

  return (
    <>
      <section className="auth">
        <Header showRedLogo />
        <Content redirectTo={url || ''} sid={sid} token={token} />
      </section>
      <Footer className="mt-0" />
    </>
  );
};

Login.propTypes = {
  location: PropTypes.object,
  sid: PropTypes.string,
  token: PropTypes.string,
};

Login.defaultProps = {
  sid: '',
  token: '',
  location: { search: {} },
};

const Content = ({ redirectTo, sid, token }) => {
  const { userState, userDispatch } = React.useContext(UserContext);
  const [message, setMessage] = React.useState({ msg: null, type: null });

  if (userState && userState.alert === 'account-deactivation') {
    !message.msg &&
      setMessage({
        msg:
          'Your account has been DEACTIVATED. Kindly contact us if you would like to activate your account.',
        type: 'error',
      });
    userDispatch({
      type: 'remove-alert',
    });
  }

  if (redirectTo === '/user/events/new' && !message.msg) {
    setMessage({
      msg: `You need to sign in to hire ${
        (getHiredEntertainerFromStore() &&
          getHiredEntertainerFromStore().stageName) ||
        'entertainer'
      }`,
      type: 'info',
    });
  }

  return (
    <section>
      <div className="container-fluid">
        <Row>
          <Col className="d-none d-sm-block" sm={{ size: 6, offset: 1 }}>
            <Quotes />
          </Col>
          <Col sm={{ size: 5 }}>
            <div className="auth__container">
              <section>
                <AlertMessage message={message.msg} type={message.type} />
                <h5 className="header font-weight-normal mb-4">Login</h5>
                <LoginForm redirectTo={redirectTo} sid={sid} token={token} />

                <p className="auth__social-media--text text-center">OR:</p>
                <div className="mt-4 text-center auth__social-media">
                  <a
                    className="auth__social-media--icons"
                    href={`${getProxy()}/api/v1/auth/google`}
                  >
                    <span className="icon-google" /> <br />
                    <small className="small--2">Login with Google</small>
                  </a>
                  {/* <a
                  className="auth__social-media--icons"
                  href={`${getProxy()}/api/v1/auth/facebook`}
                >
                  <span className="icon-facebook-official" />
                </a> */}
                </div>
              </section>

              <section className="auth__footer">
                <div className="register text-center">
                  Not Registered?{' '}
                  <Link className="auth__link" to="/register">
                    {' '}
                    Create Account
                  </Link>
                </div>
              </section>
            </div>
          </Col>
        </Row>
        <p />
      </div>
    </section>
  );
};

Content.propTypes = {
  redirectTo: PropTypes.string.isRequired,
  sid: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

const LoginForm = ({ redirectTo, sid, token }) => {
  const savedToken = getTokenFromStore();
  const [message, setMessage] = useState(null);
  const { userState, userDispatch } = React.useContext(UserContext);

  // CHECK TOKEN ACTIVATION
  useEffect(() => {
    token &&
      axios
        .get('/api/v1/users/activate', { params: { token } })
        .then(function (response) {
          const { status, data } = response;
          // handle success
          if (status === 200) {
            setMessage({
              type: 'success',
              message: data.message,
            });
          }
        })
        .catch(function (error) {
          setMessage({
            message: error.response.data.message,
          });
        });
  }, [token]);

  // CHECK IF SOCIAL MEDIA LOGIN
  useEffect(() => {
    sid &&
      axios
        .get('/api/v1/who-am-i', {
          headers: {
            'x-access-token': sid,
          },
        })
        .then(function (response) {
          const { status, data } = response;

          // handle success
          if (status === 200) {
            if (data.type === USER_TYPES.unknown) {
              navigate(`/complete-registration/${sid}`);
            } else {
              userDispatch({ type: 'user-social-media-login', user: data });
              storeToken(sid);
              storeUserType(data.type);
            }
          }
        })
        .catch(function (error) {
          console.log('error', error);
          setMessage({
            message: error.response.data.message,
          });
        });
  }, [sid, userDispatch]);

  // Check if User has previously signed in
  useEffect(() => {
    savedToken &&
      axios
        .get('/api/v1/who-am-i', {
          headers: {
            'x-access-token': savedToken,
          },
        })
        .then(function (response) {
          const { status, data } = response;

          // handle success
          if (status === 200) {
            userDispatch({ type: 'user-info', user: data });
          }
        })
        .catch(function (error) {
          setMessage({
            message: error.response.data.message,
          });
        });
  }, [savedToken, userDispatch]);

  // CHECK IF USER HAS SIGNED IN
  useEffect(() => {
    if (
      userState &&
      userState.isLoggedIn &&
      userState.type !== USER_TYPES.unknown
    ) {
      const dashboardUrl = `/${DASHBOARD_PAGE[userState.type]}/dashboard`;
      navigate(redirectTo || dashboardUrl);
    }
  }, [userState, redirectTo]);

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(values, actions) => {
        // post to api
        axios
          .post('/api/v1/users/login', values)
          .then(function (response) {
            const { status, data } = response;
            if (status === 200) {
              userDispatch({ type: 'user-login', user: data.user });
              storeToken(data.token);
              storeUserType(data.user.type);
            }
          })
          .catch(function (error) {
            setMessage({
              message: error.response.data.message,
            });
          });
        actions.setSubmitting(false);
      }}
      render={({ isSubmitting, handleSubmit }) => {
        const submitFormWithEnterKey = (event) => {
          if (event.keyCode === 13) {
            handleSubmit();
          }
        };
        return (
          <Form>
            <AlertMessage {...message} />
            <Input
              label="Email"
              name="email"
              onKeyDown={(e) => submitFormWithEnterKey(e)}
              placeholder="Email Address"
              showFeedback={feedback.NONE}
              tabIndex={1}
            />
            <Input
              label="Password"
              labelClassName="d-block"
              labelLink={{
                to: '/forgot-password',
                text: 'Forgot Password',
              }}
              name="password"
              onKeyDown={(evt) => submitFormWithEnterKey(evt)}
              placeholder="Password"
              showFeedback={feedback.NONE}
              tabIndex={2}
              type="password"
            />
            <Button loading={isSubmitting} onClick={handleSubmit}>
              Sign in
            </Button>
          </Form>
        );
      }}
      validationSchema={loginSchema}
    />
  );
};

LoginForm.propTypes = {
  redirectTo: PropTypes.string,
  sid: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

LoginForm.defaultProps = {
  redirectTo: '',
};
export default Login;

// Please verify your email address by clicking the link you received in email.
// Not verifying within 24 hours since registration will disable your account.
// Click here to resend the verification email to duvtest.123@gmail.com.
// If this is not your correct email address, please update it under User Settings.
// If you need any assistance, please contact our support.
