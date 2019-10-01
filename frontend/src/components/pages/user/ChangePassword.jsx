import React from 'react';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import { Formik, Form } from 'formik';
import { feedback } from 'components/forms/form-helper';
import Input from 'components/forms/Input';
import Button from 'components/forms/Button';
import { changePasswordObject } from 'components/forms/schema/userSchema';
import { createSchema } from 'components/forms/schema/schema-helpers';
import { setInitialValues } from 'components/forms/form-helper';

const ChangePassword = () => {
  return (
    <BackEndPage title="Change Password">
      <div className="main-app">
        <TopMessage message="Change Password" />

        <section className="app-content">
          <ChangePasswordForm />
        </section>
      </div>
    </BackEndPage>
  );
};

const ChangePasswordForm = () => {
  return (
    <Formik
      initialValues={setInitialValues(changePasswordObject)}
      onSubmit={(values, actions) => {
        console.log(values);
        setTimeout(() => {
          actions.setSubmitting(false);
        }, 400);
      }}
      render={({ isSubmitting, handleSubmit }) => (
        <div className="card card-custom card-black card-form ">
          <div className="card-body col-offset-md-2 col-md-8">
            <h4 className="card-title">Update your password below</h4>
            <Form>
              <Input
                isValidMessage="Password seems good"
                label="Old Password"
                name="old_password"
                placeholder="Old Password"
                showFeedback={feedback.ERROR}
                type="password"
              />
              <Input
                isValidMessage="Password seems good"
                label="New Password"
                name="password"
                placeholder="New Password"
                showFeedback={feedback.ERROR}
                type="password"
              />
              <Input
                isValidMessage="Phone matches"
                label="Confirm Password"
                name="confirm_password"
                placeholder="Confirm Password"
                showFeedback={feedback.ERROR}
                type="password"
              />
              <Button
                className="btn-danger btn-wide btn-transparent mt-4"
                loading={isSubmitting}
                onClick={handleSubmit}
              >
                Update Password
              </Button>
            </Form>
          </div>
        </div>
      )}
      validationSchema={createSchema(changePasswordObject)}
    />
  );
};

export default ChangePassword;
