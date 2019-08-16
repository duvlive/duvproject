import React from 'react';
import Header from 'components/common/layout/Header';
import Footer from 'components/common/layout/Footer';
import { Formik, Form } from 'formik';
import Input from 'components/forms/Input';
import { Link } from '@reach/router';
import { Col, Row } from 'reactstrap';
import Text from 'components/common/utils/Text';
import Quotes from 'data/quotes';
import { randomItem } from 'utils/helpers';
import { feedback } from 'components/forms/form-helper';
import Button from 'components/forms/Button';
import { loginSchema } from 'components/forms/schema/userSchema';

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
  const quote = randomItem(Quotes);
  return (
    <section>
      <div className="container-fluid">
        <Row>
          <Col className="d-none d-sm-block" sm={{ size: 6, offset: 1 }}>
            <Text.VerticalAlign>
              <div className="auth__quotes">
                <h4 className="auth__quotes--text">{quote.text}</h4>
                <p>- {quote.name}</p>
              </div>
            </Text.VerticalAlign>
          </Col>
          <Col sm={{ size: 5 }}>
            <div className="auth__container">
              <section>
                <h5 className="header font-weight-normal mb-4">Login</h5>
                <Login.Form />
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

Login.Form = () => {
  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      onSubmit={(values, actions) => {
        console.log(values);
        setTimeout(() => {
          actions.setSubmitting(false);
        }, 400);
      }}
      render={({ isSubmitting, handleSubmit, ...props }) => (
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
