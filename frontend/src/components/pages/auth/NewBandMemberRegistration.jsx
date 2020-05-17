import React, { useState, Fragment } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Header from 'components/common/layout/Header';
import Footer from 'components/common/layout/Footer';
import { navigate } from '@reach/router';
import { Col, Row } from 'reactstrap';
import { Formik, Form } from 'formik';
import Input from 'components/forms/Input';
import Button from 'components/forms/Button';
import CheckboxGroup from 'components/forms/CheckboxGroup';
import classNames from 'classnames';
import { bandMemberRegistrationObject } from 'components/forms/schema/userSchema';
import { setInitialValues } from 'components/forms/form-helper';
import { USER_TYPES } from 'utils/constants';
import AlertMessage from 'components/common/utils/AlertMessage';
import Card from 'components/custom/Card';
import { createSchema } from 'components/forms/schema/schema-helpers';

const NewBandMemberRegistration = ({ bandToken }) => (
  <Fragment>
    <section className="auth">
      <Header showRedLogo />
      <Content token={bandToken} />
    </section>
    <Footer className="mt-0" />
  </Fragment>
);

NewBandMemberRegistration.propTypes = {
  bandToken: PropTypes.string,
};

NewBandMemberRegistration.defaultProps = {
  bandToken: null,
};

const NewBandMemberRegistrationForm = ({ token }) => {
  console.log('token', token);
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState({});
  const agreementText = (
    <>
      I agree to the terms listed in the{' '}
      <a href="/terms-of-use" target="_blank">
        DUV LIVE Terms of Use
      </a>{' '}
      and acknowledge the{' '}
      <a href="/privacy-policy" target="_blank">
        DUV LIVE Privacy Policy
      </a>
      .
    </>
  );
  // let userHasCompletedRegistration;

  // CHECK IF SOCIAL MEDIA LOGIN
  React.useEffect(() => {
    token &&
      axios
        .get('/api/v1/who-am-i', {
          headers: {
            'x-access-token': token,
          },
        })
        .then(function (response) {
          const { status, data } = response;
          if (status === 200) {
            if (data.type === USER_TYPES.unknown) {
              setUser(data);
              return;
            } else {
              navigate(`/login/${token}`);
            }
          }
        })
        .catch(function (error) {
          navigate(`/register`);
        });
  }, [token]);

  return (
    <Formik
      initialValues={setInitialValues(bandMemberRegistrationObject, {
        agreement: [],
      })}
      onSubmit={(values, actions) => {
        delete values.agreement;
        axios
          .put(
            '/api/v1/users/new/bandMember',
            { ...values, id: user.id },
            {
              headers: { 'x-access-token': token },
            }
          )
          .then(function (response) {
            const { data, status } = response;
            if (status === 200) {
              console.log('status', status);
              console.log('data', data);
              navigate(`/login/${token}`);
            }
          })
          .catch(function (error) {
            console.log('error', error);
            setMessage({
              message: error.response.data.message,
              lists:
                error.response.data.errors &&
                Object.values(error.response.data.errors),
            });
          });
        actions.setSubmitting(false);
      }}
      render={({ isSubmitting, handleSubmit }) => (
        <Form>
          <h3 className="font-weight-normal mb-4">Welcome {user.firstName},</h3>
          <AlertMessage {...message} />
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
              label="Phone 2"
              name="phoneNumber2"
              optional
              placeholder="Phone Number 2"
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
          <Button
            className="btn-danger btn-wide btn-transparent mt-4"
            loading={isSubmitting}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Form>
      )}
      validationSchema={createSchema(bandMemberRegistrationObject)}
    />
  );
};

NewBandMemberRegistrationForm.propTypes = {
  token: PropTypes.string.isRequired,
};

const Content = ({ token }) => (
  <section>
    <div className="container-fluid">
      <Row>
        <Col sm={{ size: 8, offset: 2 }}>
          <div className="auth__container auth__container--lg">
            <NewBandMemberRegistrationForm token={token} />
          </div>
        </Col>
      </Row>
      <p />
    </div>
  </section>
);

Content.propTypes = {
  token: PropTypes.string.isRequired,
};

const RegistrationCardList = ({ type, onClick }) => {
  const REGISTRATION_TYPE = {
    user: {
      color: 'green',
      id: USER_TYPES.user,
      subtitle: 'NO GO SPOIL YOUR PARTY O!!!',
      text: (
        <>
          Register as a <span>User</span>
        </>
      ),
    },
    entertainer: {
      color: 'blue',
      id: USER_TYPES.entertainer,
      subtitle: 'MC, DJ OR OWN A LIVE BAND?',
      text: (
        <>
          Register as an <span>Entertainer</span>
        </>
      ),
    },
  };
  return (
    <Row className="row-eq-height">
      {Object.keys(REGISTRATION_TYPE).map((userType) => {
        const title = REGISTRATION_TYPE[userType].text;
        const isActive = type === REGISTRATION_TYPE[userType].id;
        return (
          <RegistrationCard
            color={REGISTRATION_TYPE[userType].color}
            isActive={isActive}
            key={REGISTRATION_TYPE[userType].id}
            onClick={onClick}
            title={title}
            type={REGISTRATION_TYPE[userType].id}
          />
        );
      })}
    </Row>
  );
};

RegistrationCardList.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.number,
};

const RegistrationCard = ({ color, title, type, isActive, onClick }) => {
  return (
    <Col
      md={{ size: 6, offset: 0 }}
      onClick={() => onClick(type)}
      sm={{ size: 6, offset: 0 }}
    >
      <Card
        className={classNames('custom-registration', {
          isActive: isActive,
        })}
        color={color}
        hover
      >
        <h6 className="selection__text">
          <small className="small--2">
            {type === USER_TYPES.user && (
              <span className="icon icon-user-circle"></span>
            )}
            {type === USER_TYPES.entertainer && (
              <span className="icon icon-music"></span>
            )}
          </small>
          {title}
        </h6>
      </Card>
    </Col>
  );
};

RegistrationCard.propTypes = {
  color: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.any.isRequired,
  type: PropTypes.number.isRequired,
};

export default NewBandMemberRegistration;
