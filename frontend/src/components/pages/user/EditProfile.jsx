import React from 'react';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import { Formik, Form } from 'formik';
import Input from 'components/forms/Input';
import Button from 'components/forms/Button';
import {
  profileObject,
  profileSchema
} from 'components/forms/schema/userSchema';
import axios from 'axios';
import { setInitialValues } from 'components/forms/form-helper';
import UploadImage from 'components/common/utils/UploadImage';
import { UserContext } from 'context/UserContext';
import { getToken } from 'utils/localStorage';
import AlertMessage from 'components/common/utils/AlertMessage';

const EditProfile = () => {
  return (
    <BackEndPage title="Edit Profile">
      <div className="main-app">
        <TopMessage message="Edit Profile" />

        <section className="app-content">
          <UserProfileForm />
        </section>
      </div>
    </BackEndPage>
  );
};

const UserProfileForm = () => {
  const [message, setMessage] = React.useState(null);
  const { userState, userDispatch } = React.useContext(UserContext);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={setInitialValues(profileObject, userState)}
      onSubmit={(values, actions) => {
        axios
          .put('/api/v1/users/editUser', values, {
            headers: { 'x-access-token': getToken() }
          })
          .then(function(response) {
            const { status, data } = response;
            console.log('status', status);
            console.log('data', data);
            // handle success
            console.log(status, data);
            if (status === 200) {
              userDispatch({
                type: 'user-profile-update',
                user: data
              });
              setMessage({
                type: 'success',
                message: `Your profile has been successfully updated`
              });
              actions.setSubmitting(false);
            }
          })
          .catch(function(error) {
            console.log('error', error);
            setMessage(error.response.data.message);
            actions.setSubmitting(false);
          });
      }}
      render={({ isSubmitting, handleSubmit }) => (
        <div className="card card-custom card-black card-form ">
          <div className="card-body col-md-10">
            <Form>
              <div className="row">
                <div className="col-md-3 mt-5 mb-5">
                  <UploadImage />
                </div>
                <div className="col-md-9">
                  <div className="col-md-12">
                    <h4 className="card-title text-blue">
                      Profile Information
                    </h4>
                    <AlertMessage {...message} />
                  </div>
                  <Input
                    formGroupClassName="col-md-8"
                    isValidMessage="First Name looks good"
                    label="First Name"
                    name="firstName"
                    placeholder="First Name"
                  />
                  <Input
                    formGroupClassName="col-md-8"
                    isValidMessage="Last Name looks good"
                    label="Last Name"
                    name="lastName"
                    placeholder="Last Name"
                  />
                  <Input
                    formGroupClassName="col-md-8"
                    isValidMessage="Phone number looks good"
                    label="Phone"
                    name="phoneNumber"
                    placeholder="Phone"
                  />
                  <div className="col-12">
                    <Button
                      className="btn-danger btn-wide btn-transparent mt-4"
                      loading={isSubmitting}
                      onClick={handleSubmit}
                    >
                      Update Profile
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      )}
      validationSchema={profileSchema}
    />
  );
};

export default EditProfile;
