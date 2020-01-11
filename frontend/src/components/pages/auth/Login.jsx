import React, { useState } from 'react';
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
import AlertMessage from 'components/common/utils/AlertMessage';

const Login = () => (
  <>
    <section className="auth">
      <Header showRedLogo />
      <Content />
    </section>
    <Footer className="mt-0" />
  </>
);

const Content = () => {
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
                <LoginForm />
              </section>
              <section className="auth__social-media">
                <p className="auth__social-media--text">or login with:</p>
                <Link className="auth__social-media--icons" to="/">
                  <span className="icon-google" />
                </Link>
                <Link className="auth__social-media--icons" to="/">
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

const LoginForm = () => {
  const [message, setMessage] = useState(null);
  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      onSubmit={(values, actions) => {
        console.log(values);
        // post to api
        axios
          .post('/api/v1/users/login', values)
          .then(function(response) {
            const { status, data } = response;
            // handle success
            console.log(status, data);
            if (status === 200) {
              return navigate(`/${DASHBOARD_PAGE[data.user.type]}/dashboard`);
            }

            // Save some information in the local storage

            // build logged in navbar

            // add navbar to website
          })
          .catch(function(error) {
            console.log('error', error.response.data);
            setMessage({
              message: error.response.data.message,
              lists:
                error.response.data.errors &&
                Object.values(error.response.data.errors)
            });
          });
        actions.setSubmitting(false);
        // setTimeout(() => {
        //   actions.setSubmitting(false);
        //   const { email, password } = values;
        //   if (email === 'user@duvlive.com' && password === 'passworded') {
        //     return navigate('/user/dashboard');
        //   } else if (email === 'uv@duvlive.com' && password === 'passworded') {
        //     return navigate('/administrator/dashboard');
        //   } else if (
        //     email === 'highsoul@member.com' &&
        //     password === 'passworded'
        //   ) {
        //     return navigate('/band-member/dashboard');
        //   } else if (
        //     email === 'djcuppy@duvlive.com' &&
        //     password === 'passworded'
        //   ) {
        //     return navigate('/entertainer/dashboard');
        //   } else {
        //     setMessage('Invalid email or password');
        //   }
        // }, 400);
      }}
      render={({ isSubmitting, handleSubmit }) => (
        <Form>
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
          <AlertMessage {...message} />
          <Button
            className="btn-danger btn-wide btn-transparent"
            loading={isSubmitting}
            onClick={handleSubmit}
          >
            Sign in
          </Button>
        </Form>
      )}
      validationSchema={loginSchema}
    />
  );
};

export default Login;
