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
import { navigate } from '@reach/router';
import { setInitialValues } from 'components/forms/form-helper';
import UploadImage from 'components/common/utils/UploadImage';

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
  return (
    <Formik
      initialValues={setInitialValues(profileObject)}
      onSubmit={(values, actions) => {
        console.log(values);
        setTimeout(() => {
          actions.setSubmitting(false);
          const { email, password } = values;
          if (email === 'user@duvlive.com' && password === 'passworded') {
            return navigate('/user/dashboard');
          }
        }, 400);
      }}
      render={({ isSubmitting, handleSubmit }) => (
        <div className="card card-custom card-black card-form ">
          <div className="card-body col-md-10">
            <h4 className="card-title text-yellow">Profile Information</h4>
            <Form>
              <div className="row">
                <div className="col-md-3 mt-3 mb-5">
                  <UploadImage />
                </div>
                <div className="col-md-9">
                  <div className="form-row">
                    <Input
                      formGroupClassName="col-md-6"
                      isValidMessage="First Name looks good"
                      label="First Name"
                      name="first_name"
                      placeholder="First Name"
                    />
                    <Input
                      formGroupClassName="col-md-6"
                      isValidMessage="Last Name looks good"
                      label="Last Name"
                      name="last_name"
                      placeholder="Last Name"
                    />
                  </div>
                  <div className="form-row">
                    <Input
                      formGroupClassName="col-md-6"
                      isValidMessage="Email address seems valid"
                      label="Email"
                      name="email"
                      placeholder="Email Address"
                    />
                    <Input
                      formGroupClassName="col-md-6"
                      isValidMessage="Phone number looks good"
                      label="Phone"
                      name="phone"
                      placeholder="Phone"
                    />
                  </div>

                  <div className="form-row">
                    <Input
                      formGroupClassName="col-md-6"
                      isValidMessage="Location seems valid"
                      label="Location"
                      name="location"
                      placeholder="Location"
                    />
                    <Input
                      formGroupClassName="col-md-6"
                      isValidMessage="Address looks okay"
                      label="Address"
                      name="address"
                      placeholder="Address"
                    />
                  </div>
                  <Button
                    className="btn-danger btn-wide btn-transparent mt-4"
                    loading={isSubmitting}
                    onClick={handleSubmit}
                  >
                    Update Profile
                  </Button>
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
