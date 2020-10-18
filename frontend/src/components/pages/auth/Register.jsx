import React, { useState, Fragment } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Header from 'components/common/layout/Header';
import Footer from 'components/common/layout/Footer';
import SelectRegistration from 'components/pages/auth/SelectRegistration';
import { Link } from '@reach/router';
import { Col, Row } from 'reactstrap';
import { Formik, Form } from 'formik';
import Input from 'components/forms/Input';
import Button from 'components/forms/Button';
import CheckboxGroup from 'components/forms/CheckboxGroup';
import {
  registerSchema,
  registerObject,
} from 'components/forms/schema/userSchema';
import {
  setInitialValues,
  DisplayFormikState,
} from 'components/forms/form-helper';
import { USER_TYPES } from 'utils/constants';
import AlertMessage from 'components/common/utils/AlertMessage';
import { getProxy } from 'utils/helpers';

const registrationType = {
  'become-an-entertainer': {
    subtitle: 'MC, DJ OR OWN A LIVE BAND?',
    text: 'Become an Entertainer',
  },
  entertainer: {
    id: USER_TYPES.entertainer,
    subtitle: 'MC, DJ OR OWN A LIVE BAND?',
    text: 'Register as an Entertainer',
  },
  'hire-entertainer': {
    subtitle: 'NO GO SPOIL YOUR PARTY O!!!',
    text: 'Hire an entertainer',
  },
  user: {
    id: USER_TYPES.user,
    subtitle: 'NO GO SPOIL YOUR PARTY O!!!',
    text: 'Register as a User',
  },
};
const allowedTypes = Object.keys(registrationType);
const showRegistrationPage = (type) => {
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
  type: PropTypes.oneOf(allowedTypes),
};

Register.defaultProps = {
  type: null,
};

const RegisterForm = ({ type }) => {
  const [message, setMessage] = useState(null);
  const agreementText = (
    <small>
      I agree to the terms listed in the{' '}
      <a href="/terms-of-use" target="_blank">
        DUV LIVE Terms of Use
      </a>{' '}
      and acknowledge the{' '}
      <a href="/privacy-policy" target="_blank">
        DUV LIVE Privacy Policy
      </a>
      .
    </small>
  );
  return (
    <Formik
      initialValues={setInitialValues(registerObject, { agreement: [] })}
      onSubmit={(values, actions) => {
        delete values.agreement;
        values.type = registrationType[type].id;
        axios
          .post('/api/v1/users', values)
          .then(function (response) {
            const { status } = response;
            if (status === 200) {
              setMessage({
                type: 'success',
                message: `Your registration is successful. Kindly activate your account by clicking on the confirmation link sent to your inbox (${values.email}).`,
              });
              actions.resetForm();
            }
          })
          .catch(function (error) {
            setMessage({
              message: error.response.data.message,
              lists:
                error.response.data.errors &&
                Object.values(error.response.data.errors),
            });
          });
        actions.setSubmitting(false);
      }}
      render={({ isSubmitting, handleSubmit, ...props }) => (
        <Form>
          <h5 className="header font-weight-normal text-uppercase mb-1">
            {registrationType[type].text}
          </h5>
          <div className="text-red-100 small--2 mb-5">
            {registrationType[type].subtitle}
          </div>

          <section className="auth__social-media text-center my-4">
            <a
              className="auth__social-media--icons"
              href={`${getProxy()}/api/v1/auth/google`}
            >
              <span className="icon-google" /> <br />
              <small className="small--2">Register with Google</small>
            </a>
            {/* <a
              className="auth__social-media--icons"
              href={`${getProxy()}/api/v1/auth/facebook`}
            >
              <span className="icon-facebook-official" />
            </a> */}
            <p className="auth__social-media--text mt-3 mb-5">OR</p>
          </section>
          <div className="mt-3 d-none d-md-block">
            <AlertMessage {...message} />
          </div>
          <div className="form-row">
            <Input
              formGroupClassName="col-md-6"
              isValidMessage="First Name looks good"
              label="First Name"
              name="firstName"
              placeholder="First Name"
            />
            <Input
              formGroupClassName="col-md-6"
              isValidMessage="Last Name looks good"
              label="Last Name"
              name="lastName"
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
              name="phoneNumber"
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
              type="password"
            />
            <Input
              formGroupClassName="col-md-6"
              isValidMessage="Awesome. Password matches"
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
            />
          </div>
          <div className="form-row ml-0">
            <CheckboxGroup
              custom
              inline
              name="agreement"
              options={[{ label: agreementText, value: true }]}
            />
            <label className="form-check-label" htmlFor="agreement"></label>
          </div>
          <div className="mt-3 d-block d-md-none">
            <AlertMessage {...message} />
          </div>
          <Button
            className="btn-danger btn-wide btn-transparent mt-4"
            loading={isSubmitting}
            onClick={handleSubmit}
          >
            {registrationType[type].text}
          </Button>
          <DisplayFormikState {...props} hide showAll />
        </Form>
      )}
      validationSchema={registerSchema}
    />
  );
};

RegisterForm.propTypes = {
  type: PropTypes.oneOf(allowedTypes),
};

RegisterForm.defaultProps = {
  type: null,
};

const Content = ({ type }) => (
  <section>
    <div className="container-fluid">
      <Row>
        <Col sm={{ size: 8, offset: 2 }}>
          <div className="auth__container auth__container--lg">
            <RegisterForm type={type} />
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
  type: PropTypes.oneOf(allowedTypes),
};

Content.defaultProps = {
  type: null,
};

export default Register;
