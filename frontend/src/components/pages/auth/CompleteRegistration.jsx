import React, { useState, Fragment } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Header from 'components/common/layout/Header';
import Footer from 'components/common/layout/Footer';
import { Link } from '@reach/router';
import { Col, Row } from 'reactstrap';
import { Formik, Form } from 'formik';
import Input from 'components/forms/Input';
import Button from 'components/forms/Button';
import CheckboxGroup from 'components/forms/CheckboxGroup';
import classNames from 'classnames';
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
import Card from 'components/custom/Card';

const Register = () => (
  <Fragment>
    <section className="auth">
      <Header showRedLogo />
      <Content />
    </section>
    <Footer className="mt-0" />
  </Fragment>
);

const RegisterForm = () => {
  const [message, setMessage] = useState(null);
  const [hireType, setHireType] = React.useState('user');
  const agreementText = (
    <>
      I agree to the terms listed in the{' '}
      <Link to="/terms-of-use">DUV LIVE Terms of Use</Link> and acknowledge the{' '}
      <Link to="/privacy-policy">DUV LIVE Privacy Policy</Link>.
    </>
  );
  const handleTypeClick = (selectedType) => setHireType(selectedType);
  return (
    <Formik
      initialValues={setInitialValues(registerObject, { agreement: [] })}
      onSubmit={(values, actions) => {
        delete values.agreement;
        // values.type = registrationType[type].id;
        axios
          .post('/api/v1/users', { ...values, type: hireType })
          .then(function (response) {
            const { status } = response;
            if (status === 200) {
              setMessage({
                type: 'success',
                message: `Your registration is successful. Kindly confirm your email by clicking on the confirmation link`,
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
            Complete your Registration
          </h5>
          <div className="text-red-100 small--2 mb-5">
            NO GO SPOIL YOUR PARTY O!!!
          </div>

          <AlertMessage {...message} />
          <HireEntertainersCardList onClick={handleTypeClick} type={hireType} />
          <div className="form-row">
            <Input
              formGroupClassName="col-md-6"
              isValidMessage="Phone number looks good"
              label="Phone"
              name="phoneNumber"
              placeholder="Phone"
            />
            <Input
              formGroupClassName="col-md-6"
              isValidMessage="Password seems good"
              label="Password"
              name="password"
              placeholder="Password"
              type="password"
            />
          </div>
          <div className="form-row">
            {/* <Input
              formGroupClassName="col-md-6"
              isValidMessage="Awesome. Password matches"
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
            /> */}
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
          <Button
            className="btn-danger btn-wide btn-transparent mt-4"
            loading={isSubmitting}
            onClick={handleSubmit}
          >
            Complete Registration
          </Button>
          <DisplayFormikState {...props} hide showAll />
        </Form>
      )}
      validationSchema={registerSchema}
    />
  );
};

const Content = () => (
  <section>
    <div className="container-fluid">
      <Row>
        <Col sm={{ size: 8, offset: 2 }}>
          <div className="auth__container auth__container--lg">
            <RegisterForm />
          </div>
        </Col>
      </Row>
      <p />
    </div>
  </section>
);

const HireEntertainersCardList = ({ type, onClick }) => {
  const REGISTRATION_TYPE = {
    entertainer: {
      color: 'blue',
      id: USER_TYPES.entertainer,
      subtitle: 'MC, DJ OR OWN A LIVE BAND?',
      text: 'Register as an Entertainer',
    },
    user: {
      color: 'success',
      id: USER_TYPES.user,
      subtitle: 'NO GO SPOIL YOUR PARTY O!!!',
      text: 'Register as a User',
    },
  };
  return (
    <Row className="row-eq-height mb-5">
      <label className="col-sm-12" htmlFor="">
        Select Account Type
      </label>
      {Object.keys(REGISTRATION_TYPE).map((userType) => {
        const title = REGISTRATION_TYPE[userType].text;
        const isActive = type.toLowerCase() === title.toLowerCase();
        return (
          <HireEntertainersCard
            color={REGISTRATION_TYPE[userType].color}
            isActive={isActive}
            key={title}
            onClick={onClick}
            title={title}
          />
        );
      })}
    </Row>
  );
};

HireEntertainersCardList.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
};

const HireEntertainersCard = ({ color, title, isActive, onClick }) => {
  return (
    <Col
      md={{ size: 6, offset: 0 }}
      onClick={() => onClick(title)}
      sm={{ size: 6, offset: 0 }}
    >
      <Card
        className={classNames('select-hire-type', {
          isActive: isActive,
        })}
        color={color}
        hover
      >
        <h6 className="text-center mb-0">
          {isActive && <span className="icon icon-ok text-white" />}
          {title}
        </h6>
      </Card>
    </Col>
  );
};

HireEntertainersCard.propTypes = {
  color: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Register;
