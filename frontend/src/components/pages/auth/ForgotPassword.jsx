import React, { useState } from 'react';
import axios from 'axios';
import Header from 'components/common/layout/Header';
import Footer from 'components/common/layout/Footer';
import { Formik, Form } from 'formik';
import Input from 'components/forms/Input';
import Button from 'components/forms/Button';
import { forgotPasswordSchema } from 'components/forms/schema/userSchema';
import { Link } from '@reach/router';
import { Col, Row } from 'reactstrap';
import AlertMessage from 'components/common/utils/AlertMessage';
import Quotes from 'components/common/utils/Quotes';

const ForgotPassword = () => (
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
                <h5 className="header font-weight-normal mb-4">
                  Forgot Password
                </h5>
                <ForgotPasswordForm />
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

const ForgotPasswordForm = () => {
  const [message, setMessage] = useState(null);
  return (
    <Formik
      initialValues={{
        email: ''
      }}
      onSubmit={(values, actions) => {
        // post to api
        axios
          .post('/api/v1/users/forgot-password', values)
          .then(function(response) {
            const { status } = response;
            if (status === 200) {
              setMessage({
                type: 'warning',
                message: `A password reset link has been sent to your mail. If you don't receive an email, and it's not in your spam folder this could mean you signed up with a different address.`
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
          <Input label="Email" name="email" placeholder="Email Address" />
          <Button
            className="btn-danger btn-wide btn-transparent"
            loading={isSubmitting}
            onClick={handleSubmit}
          >
            Reset Password
          </Button>
        </Form>
      )}
      validationSchema={forgotPasswordSchema}
    />
  );
};
export default ForgotPassword;
