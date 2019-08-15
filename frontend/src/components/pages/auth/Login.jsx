import React, { Fragment } from 'react';
import Header from 'components/common/layout/Header';
import Footer from 'components/common/layout/Footer';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import Input from 'components/forms/Input';
import { Link } from '@reach/router';
import { Col, Row } from 'reactstrap';
import Text from 'components/common/utils/Text';
import Quotes from 'data/quotes';
import { randomItem } from 'utils/helpers';
import { DisplayFormikState, feedback } from 'components/forms/form-helper';

const Login = () => (
  <Fragment>
    <section className="auth">
      <Header showRedLogo />
      <Content />
    </section>
    <Footer className="mt-0" />
  </Fragment>
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
                <form>
                  <h5 className="header font-weight-normal mb-4">Login</h5>
                  <Login.Form />
                  {/* <div>
                    <div className="form-group">
                      <label htmlFor="inputEmail4">Email</label>
                      <input
                        className="form-control"
                        id="inputEmail4"
                        placeholder="Enter your email address"
                        type="email"
                      />
                    </div>
                    <div className="form-group">
                      <label className="d-block" htmlFor="inputPassword4">
                        Password
                        <Link className="float-right" to="/forgot-password">
                          Forgot Password?
                        </Link>
                      </label>
                      <input
                        className="form-control"
                        id="inputPassword4"
                        placeholder="Enter your password"
                        type="password"
                      />
                    </div>
                  </div>
                   */}
                  <button
                    className="btn btn-danger btn-wide btn-transparent"
                    href="/"
                  >
                    Sign in
                  </button>
                </form>
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

Login.Form = () => (
  <Formik
    initialValues={{
      email: '',
      password: ''
    }}
    onSubmit={(values, actions) => {
      setTimeout(() => {
        actions.setSubmitting(false);
      }, 400);
    }}
    render={props => (
      <Form>
        <Input
          isValidMessage="Name looks good"
          label="Email"
          name="email"
          placeholder="Email Address"
          showFeedback={feedback.SUCCESS}
        />
        <Input
          isValidMessage="Password looks good"
          label="Password"
          name="password"
          placeholder="Password"
          showFeedback={feedback.ERROR}
          type="password"
        />
        <DisplayFormikState {...props} />
      </Form>
    )}
    validationSchema={yup.object().shape({
      email: yup
        .string()
        .email()
        .required(),
      password: yup
        .string()
        .min(6)
        .required(),
      sex: yup.string().required()
    })}
  />
);

export default Login;
