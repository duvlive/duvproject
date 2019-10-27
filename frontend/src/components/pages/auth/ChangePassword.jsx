import React, { Fragment } from 'react';
import Header from 'components/common/layout/Header';
import Footer from 'components/common/layout/Footer';
import { Formik, Form } from 'formik';
import Input from 'components/forms/Input';
import Button from 'components/forms/Button';
import { changePasswordByEmailObject } from 'components/forms/schema/userSchema';
import { createSchema } from 'components/forms/schema/schema-helpers';
import { setInitialValues } from 'components/forms/form-helper';
import { Link } from '@reach/router';
import { Col, Row } from 'reactstrap';
import Text from 'components/common/utils/Text';
import Quotes from 'data/quotes';
import { randomItem } from 'utils/helpers';

const ChangePassword = () => (
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
                <h5 className="header font-weight-normal mb-4">
                  Forgot Password
                </h5>
                <ChangePassword.Form />
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

ChangePassword.Form = () => {
  return (
    <Formik
      initialValues={setInitialValues(changePasswordByEmailObject)}
      onSubmit={(values, actions) => {
        console.log(values);
        setTimeout(() => {
          actions.setSubmitting(false);
        }, 400);
      }}
      render={({ isSubmitting, handleSubmit }) => (
        <Form>
          <Input
            label="New Password"
            name="password"
            placeholder="New Password"
            type="password"
          />
          <Input
            label="Confirm Password"
            name="confirm_password"
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
      validationSchema={createSchema(changePasswordByEmailObject)}
    />
  );
};
export default ChangePassword;
