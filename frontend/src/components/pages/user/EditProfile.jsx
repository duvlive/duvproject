import React from 'react';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import { Formik, Form } from 'formik';
import Input from 'components/forms/Input';
import Button from 'components/forms/Button';
import { personalInfoObject } from 'components/forms/schema/userSchema';
import axios from 'axios';
import { setInitialValues, feedback } from 'components/forms/form-helper';
import UploadImage from 'components/common/utils/UploadImage';
import { UserContext } from 'context/UserContext';
import { clearStorage, getTokenFromStore } from 'utils/localStorage';
import AlertMessage from 'components/common/utils/AlertMessage';
import { ChangePasswordForm } from 'components/pages/user/ChangePassword';
import { createSchema, email } from 'components/forms/schema/schema-helpers';
import { bankDetailsSchema } from 'components/forms/schema/entertainerSchema';
import { navigate } from '@reach/router';
import DuvLiveModal from 'components/custom/Modal';

const EditProfile = () => {
  return (
    <BackEndPage title="Edit Profile">
      <div className="main-app">
        <TopMessage message="Edit Profile" />
        <section className="app-content">
          <UserProfileForm />
          <BankDetailsForm />
          <ChangePasswordForm />
          <div className="text-right">
            <DuvLiveModal
              body={<DeactivateAccount />}
              title="Deactivate Your Account"
            >
              <button className="btn btn-link text-muted">
                Deactivate Your account
              </button>
            </DuvLiveModal>
          </div>
        </section>
      </div>
    </BackEndPage>
  );
};

export const UserProfileForm = () => {
  const [message, setMessage] = React.useState(null);
  const { userState, userDispatch } = React.useContext(UserContext);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={setInitialValues(personalInfoObject, userState)}
      onSubmit={(values, actions) => {
        axios
          .put('/api/v1/users/editUser', values, {
            headers: { 'x-access-token': getTokenFromStore() },
          })
          .then(function (response) {
            const { status, data } = response;
            console.log('data', data);
            if (status === 200) {
              userDispatch({
                type: 'user-profile-update',
                user: data,
              });
              setMessage({
                type: 'success',
                message: `Your profile has been successfully updated`,
              });
              actions.setSubmitting(false);
            }
          })
          .catch(function (error) {
            setMessage({ message: error.response.data.message });
            actions.setSubmitting(false);
          });
      }}
      render={({ isSubmitting, handleSubmit }) => (
        <div className="card card-custom card-black card-form ">
          <div className="card-body">
            <Form>
              <h4 className="card-title text-blue">Profile Information</h4>
              <div className="mt-5 mb-5">
                <UploadImage />
              </div>
              <AlertMessage {...message} />
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
                  isValidMessage="Phone number looks good"
                  label="Phone"
                  name="phoneNumber"
                  placeholder="Phone"
                />
                <Input
                  formGroupClassName="col-md-6"
                  isValidMessage="Phone number looks good"
                  label="Alternative Phone Number"
                  name="phoneNumber2"
                  optional
                  placeholder="Alternative Phone Number"
                  showFeedback={feedback.ERROR}
                />
              </div>
              <Button
                className="btn-danger btn-wide btn-transparent mt-3"
                loading={isSubmitting}
                onClick={handleSubmit}
              >
                Update Profile
              </Button>
            </Form>
          </div>
        </div>
      )}
      validationSchema={createSchema(personalInfoObject)}
    />
  );
};

export const BankDetailsForm = () => {
  const [message, setMessage] = React.useState(null);
  const { userState } = React.useContext(UserContext);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={setInitialValues(bankDetailsSchema, userState)}
      onSubmit={(values, actions) => {
        axios
          .put('/api/v1/user/bankDetail', values, {
            headers: { 'x-access-token': getTokenFromStore() },
          })
          .then(function (response) {
            const { status } = response;
            if (status === 200) {
              setMessage({
                type: 'info',
                message: `Your bank has been successfully submitted.`,
              });
              actions.setSubmitting(false);
            }
          })
          .catch(function (error) {
            setMessage({ message: error.response.data.message });
            actions.setSubmitting(false);
          });
      }}
      render={({ isSubmitting, handleSubmit, ...props }) => (
        <div className="card card-custom card-black card-form ">
          <div className="card-body col-md-10">
            <h4 className="card-title text-blue">Account Details</h4>
            <Form>
              <AlertMessage {...message} />
              <Input
                label="Account Name"
                name="accountName"
                placeholder="Account Name"
              />
              <Input
                label="Bank Name"
                name="bankName"
                placeholder="Bank Name"
              />
              <Input
                label="Account Number"
                name="accountNumber"
                placeholder="Account Number"
              />
              <Button
                className="btn-danger btn-wide btn-transparent"
                loading={isSubmitting}
                onClick={handleSubmit}
              >
                Update Bank Details
              </Button>
            </Form>
          </div>
        </div>
      )}
      validationSchema={createSchema(bankDetailsSchema)}
    />
  );
};

export const DeactivateAccount = () => {
  const [message, setMessage] = React.useState(null);
  const { userState, userDispatch } = React.useContext(UserContext);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={setInitialValues({ email })}
      onSubmit={({ email }, actions) => {
        if (email !== userState.email) {
          setMessage({
            message:
              'Invalid email. You need to enter your email address to deactivate your account',
          });
          return;
        }
        axios
          .put(
            '/api/v1/user/deactivate',
            {},
            {
              headers: { 'x-access-token': getTokenFromStore() },
            }
          )
          .then(function (response) {
            const { status } = response;
            if (status === 200) {
              userDispatch({ type: 'user-logout' });
              userDispatch({
                type: 'add-alert',
                alert: 'account-deactivation',
              });
              clearStorage();
              navigate('/login');
              actions.setSubmitting(false);
            }
          })
          .catch(function (error) {
            setMessage({ message: error.response.data.message });
            actions.setSubmitting(false);
          });
      }}
      render={({ isSubmitting, handleSubmit, ...props }) => (
        <Form>
          <AlertMessage {...message} />

          <p className="text-muted">
            To deactivate your account, you would need to enter the email
            address associated with this account below.
          </p>
          <Input
            label="Email"
            name="email"
            placeholder="Your Registered Email Address"
          />
          <Button
            className="btn-danger btn-wide btn-transparent"
            loading={isSubmitting}
            onClick={handleSubmit}
          >
            Deactivate Your Account
          </Button>
        </Form>
      )}
      validationSchema={createSchema({ email })}
    />
  );
};

export default EditProfile;
