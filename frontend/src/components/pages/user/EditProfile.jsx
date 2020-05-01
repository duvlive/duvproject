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
import { getTokenFromStore } from 'utils/localStorage';
import AlertMessage from 'components/common/utils/AlertMessage';
import { ChangePasswordForm } from 'components/pages/user/ChangePassword';
import { createSchema } from 'components/forms/schema/schema-helpers';

const EditProfile = () => {
  return (
    <BackEndPage title="Edit Profile">
      <div className="main-app">
        <TopMessage message="Edit Profile" />

        <section className="app-content">
          <UserProfileForm />
          <ChangePasswordForm />
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

export default EditProfile;
