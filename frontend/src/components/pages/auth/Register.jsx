import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from 'components/common/layout/Header';
import Footer from 'components/common/layout/Footer';
import SelectRegistration from 'components/pages/auth/SelectRegistration';
import { Link } from '@reach/router';
import { Col, Row } from 'reactstrap';
import { Formik, Form } from 'formik';
import Input from 'components/forms/Input';
import Button from 'components/forms/Button';
import {
  registerSchema,
  registerObject
} from 'components/forms/schema/userSchema';
import { setInitialValues } from 'components/forms/form-helper';

const registrationType = {
  'become-an-entertainer': {
    subtitle: 'MC, DJ OR OWN A LIVE BAND?',
    text: 'Become an Entertainer'
  },
  entertainer: {
    subtitle: 'MC, DJ OR OWN A LIVE BAND?',
    text: 'Register as an Entertainer'
  },
  'hire-entertainer': {
    subtitle: 'NO GO SPOIL YOUR PARTY O!!!',
    text: 'Hire an entertainer'
  },
  user: {
    subtitle: 'NO GO SPOIL YOUR PARTY O!!!',
    text: 'Register as a User'
  }
};
const allowedTypes = Object.keys(registrationType);
const showRegistrationPage = type => {
  return allowedTypes.includes(type);
};

const Register = ({ type }) => (
  <Fragment>
    <section className="auth">
      <Header showRedLogo />
      {showRegistrationPage(type) ? (
        <Content type={type} />
      ) : (
        <SelectRegistration />
      )}
    </section>
    <Footer className="mt-0" />
  </Fragment>
);

Register.propTypes = {
  type: PropTypes.oneOf(allowedTypes)
};

Register.defaultProps = {
  type: null
};

Register.Form = ({ type }) => (
  <Formik
    initialValues={setInitialValues(registerObject)}
    onSubmit={(values, actions) => {
      console.log(values);
      setTimeout(() => {
        actions.setSubmitting(false);
      }, 400);
    }}
    render={({ isSubmitting, handleSubmit }) => (
      <Form>
        <h5 className="header font-weight-normal text-uppercase mb-1">
          {registrationType[type].text}
        </h5>
        <div className="text-red-100 small--2 mb-5">
          {registrationType[type].subtitle}
        </div>

        <section className="auth__social-media text-center">
          <p className="auth__social-media--text">Register with:</p>
          <Link className="auth__social-media--icons" to="/">
            <span className="icon-google" />
          </Link>
          <Link className="auth__social-media--icons" to="/">
            <span className="icon-facebook-official" />
          </Link>
          <p className="auth__social-media--text mt-0 mb-5">OR</p>
        </section>
        <div className="form-row">
          <Input
            formGroupClassName="col-md-6"
            isValidMessage="First Name looks good"
            label="First Name"
            name="first_name"
            placeholder="First Name"
          />
          <Input
            formGroupClassName="col-md-6"
            isValidMessage="Last Name looks good"
            label="Last Name"
            name="last_name"
            placeholder="Last Name"
          />
        </div>
        <div className="form-row">
          <Input
            formGroupClassName="col-md-6"
            isValidMessage="Email address seems valid"
            label="Email"
            name="email"
            placeholder="Email Address"
          />
          <Input
            formGroupClassName="col-md-6"
            isValidMessage="Phone number looks good"
            label="Phone"
            name="phone"
            placeholder="Phone"
          />
        </div>
        <div className="form-row">
          <Input
            formGroupClassName="col-md-6"
            isValidMessage="Password seems good"
            label="Password"
            name="password"
            placeholder="Password"
          />
          <Input
            formGroupClassName="col-md-6"
            isValidMessage="Phone matches"
            label="Confirm Password"
            name="confirm_password"
            placeholder="Confirm Password"
          />
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            id="exampleCheck1"
            type="checkbox"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            By checking here and continuing, I agree to the{' '}
            <Link to="/privacy-policy">DUV LIVE Terms of Use</Link>
          </label>
        </div>
        <Button
          className="btn-danger btn-wide btn-transparent mt-4"
          loading={isSubmitting}
          onClick={handleSubmit}
        >
          {registrationType[type].text}
        </Button>
      </Form>
    )}
    validationSchema={registerSchema}
  />
);

Register.Form.propTypes = {
  type: PropTypes.oneOf(allowedTypes)
};

Register.Form.defaultProps = {
  type: null
};

const Content = ({ type }) => (
  <section>
    <div className="container-fluid">
      <Row>
        <Col sm={{ size: 8, offset: 2 }}>
          <div className="auth__container auth__container--lg">
            <Register.Form type={type} />
            <section className="auth__footer">
              <div className="register mt-4 text-center">
                Already have an account with us?
                <Link className="auth__link" to="/login">
                  {' '}
                  SIGN IN
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

Content.propTypes = {
  type: PropTypes.oneOf(allowedTypes)
};

Content.defaultProps = {
  type: null
};

export default Register;
