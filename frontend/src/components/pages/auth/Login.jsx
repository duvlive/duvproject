import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
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
import { DASHBOARD_PAGE } from 'utils/constants';
import { storeToken } from 'utils/localStorage';
import AlertMessage from 'components/common/utils/AlertMessage';
import { UserContext } from 'context/UserContext';

const Login = ({ token }) => (
  <>
    <section className="auth">
      <Header showRedLogo />
      <Content token={token} />
    </section>
    <Footer className="mt-0" />
  </>
);

Login.propTypes = {
  token: PropTypes.string
};

Login.defaultProps = {
  token: ''
};

const Content = ({ token }) => {
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
                <h5 className="header font-weight-normal mb-4">Login</h5>
                <LoginForm token={token} />
              </section>
              <section className="auth__social-media">
                <p className="auth__social-media--text">or login with:</p>
                <Link
                  className="auth__social-media--icons"
                  to="/api/v1/auth/google"
                >
                  <span className="icon-google" />
                </Link>
                <Link
                  className="auth__social-media--icons"
                  to="/api/v1/auth/facebook"
                >
                  <span className="icon-facebook-official" />
                </Link>
              </section>
              <section className="auth__footer">
                <div className="register mt-4 text-center">
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
  token: PropTypes.string.isRequired
};

const LoginForm = ({ token }) => {
  const [message, setMessage] = useState(null);
  const { userState, userDispatch } = React.useContext(UserContext);

  // CHECK TOKEN ACTIVATION
  useEffect(() => {
    token &&
      axios
        .get('/api/v1/users/activate', { params: { token } })
        .then(function(response) {
          const { status, data } = response;
          // handle success
          if (status === 200) {
            setMessage({
              type: 'success',
              message: data.message
            });
          }
        })
        .catch(function(error) {
          setMessage({
            message: error.response.data.message
          });
        });
  }, [token]);

  // CHECK IF USER HAS PREVIOUSLY SIGNED IN
  useEffect(() => {
    if (userState && userState.isLoggedIn) {
      navigate(`/${DASHBOARD_PAGE[userState.type]}/dashboard`);
    }
  }, [userState]);

  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      onSubmit={(values, actions) => {
        // post to api
        axios
          .post('/api/v1/users/login', values)
          .then(function(response) {
            const { status, data } = response;
            if (status === 200) {
              userDispatch({ type: 'user-login', user: data.user });
              storeToken(data.token);
            }
          })
          .catch(function(error) {
            setMessage({
              message: error.response.data.message
            });
          });
        actions.setSubmitting(false);
      }}
      render={({ isSubmitting, handleSubmit }) => (
        <Form>
          <AlertMessage {...message} />
          <Input
            label="Email"
            name="email"
            placeholder="Email Address"
            showFeedback={feedback.NONE}
          />
          <Input
            label="Password"
            labelClassName="d-block"
            labelLink={{
              to: '/forgot-password',
              text: 'Forgot Password'
            }}
            name="password"
            placeholder="Password"
            showFeedback={feedback.NONE}
            type="password"
          />
          <Button loading={isSubmitting} onClick={handleSubmit}>
            Sign in
          </Button>
        </Form>
      )}
      validationSchema={loginSchema}
    />
  );
};

LoginForm.propTypes = {
  token: PropTypes.string.isRequired
};

export default Login;

// Please verify your email address by clicking the link you received in email.
// Not verifying within 24 hours since registration will disable your account.
// Click here to resend the verification email to duvtest.123@gmail.com.
// If this is not your correct email address, please update it under User Settings.
// If you need any assistance, please contact our support.
