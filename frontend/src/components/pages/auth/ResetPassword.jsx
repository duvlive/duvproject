import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Header from 'components/common/layout/Header';
import Footer from 'components/common/layout/Footer';
import { Formik, Form } from 'formik';
import Input from 'components/forms/Input';
import Button from 'components/forms/Button';
import { resetPasswordObject } from 'components/forms/schema/userSchema';
import { createSchema } from 'components/forms/schema/schema-helpers';
import { setInitialValues } from 'components/forms/form-helper';
import { Link } from '@reach/router';
import { Col, Row } from 'reactstrap';
import AlertMessage from 'components/common/utils/AlertMessage';
import Quotes from 'components/common/utils/Quotes';

const ResetPassword = ({ token }) => (
  <>
    <section className="auth">
      <Header showRedLogo />
      <Content token={token} />
    </section>
    <Footer className="mt-0" />
  </>
);

ResetPassword.propTypes = {
  token: PropTypes.string
};

ResetPassword.defaultProps = {
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
                <h5 className="header font-weight-normal mb-4">
                  Change Password
                </h5>
                <ResetPasswordForm token={token} />
              </section>
              <section className="auth__footer">
                <div className="mt-4 text-center">
                  <Link className="auth__link" to="/login">
                    Back to Login Page
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

const ResetPasswordForm = ({ token }) => {
  const [message, setMessage] = useState(null);
  return (
    <Formik
      initialValues={setInitialValues(resetPasswordObject)}
      onSubmit={(values, actions) => {
        axios
          .post('/api/v1/users/reset-password', values, { params: { token } })
          .then(function(response) {
            const { status } = response;
            if (status === 200) {
              setMessage({
                type: 'success',
                message: `Your password has been successfully updated.`
              });
              actions.resetForm();
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
            label="New Password"
            name="password"
            placeholder="New Password"
            type="password"
          />
          <Input
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm Password"
            type="password"
          />
          <Button
            className="btn-danger btn-wide btn-transparent"
            loading={isSubmitting}
            onClick={handleSubmit}
          >
            Reset Password
          </Button>
        </Form>
      )}
      validationSchema={createSchema(resetPasswordObject)}
    />
  );
};
ResetPasswordForm.propTypes = {
  token: PropTypes.string.isRequired
};
export default ResetPassword;
