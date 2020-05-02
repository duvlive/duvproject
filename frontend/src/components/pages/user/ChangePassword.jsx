import React from 'react';
import axios from 'axios';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import { Formik, Form } from 'formik';
import { feedback } from 'components/forms/form-helper';
import Input from 'components/forms/Input';
import Button from 'components/forms/Button';
import { changePasswordObject } from 'components/forms/schema/userSchema';
import { createSchema } from 'components/forms/schema/schema-helpers';
import { setInitialValues } from 'components/forms/form-helper';
import { getTokenFromStore } from 'utils/localStorage';
import AlertMessage from 'components/common/utils/AlertMessage';

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

export const ChangePasswordForm = () => {
  const [message, setMessage] = React.useState(null);
  return (
    <Formik
      initialValues={setInitialValues(changePasswordObject)}
      onSubmit={(values, actions) => {
        axios
          .put('/api/v1/users/change-password', values, {
            headers: { 'x-access-token': getTokenFromStore() },
          })
          .then(function (response) {
            const { status } = response;
            if (status === 200) {
              setMessage({
                type: 'success',
                message: `Your password has been successfully updated`,
              });
              actions.setSubmitting(false);
              actions.resetForm();
            }
          })
          .catch(function (error) {
            setMessage({ message: error.response.data.message });
            actions.setSubmitting(false);
          });
      }}
      render={({ isSubmitting, handleSubmit }) => (
        <div className="card card-custom card-black card-form ">
          <div className="card-body col-offset-md-2 col-md-8">
            <Form>
              <h4 className="card-title text-blue">Change Password</h4>
              <AlertMessage {...message} />

              <Input
                isValidMessage="Password seems good"
                label="Old Password"
                name="oldPassword"
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
                isValidMessage="Password matches"
                label="Confirm Password"
                name="confirmPassword"
                placeholder="Confirm Password"
                showFeedback={feedback.ERROR}
                type="password"
              />
              <Button
                className="btn-danger btn-wide btn-transparent mt-3"
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
