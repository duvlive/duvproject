import React from 'react';
import BackEndPage from 'components/common/layout/BackEndPage';
import { Formik, Form } from 'formik';
import Input from 'components/forms/Input';
import Select from 'components/forms/Select';
import { personalInfoObject } from 'components/forms/schema/userSchema';
import { createSchema } from 'components/forms/schema/schema-helpers';
import { setInitialValues } from 'components/forms/form-helper';
import Button from 'components/forms/Button';
import { entertainerDetailsSchema } from 'components/forms/schema/entertainerSchema';

const InviteFriends = () => {
  return (
    <BackEndPage title="Invite Friends">
      <div className="main-app">
        <section className="app-content">
          <h2 className="text-uppercase text-center text-gray mb-2">
            Spread the Word!!!
          </h2>
          <h4 className="text-center text-gray subtitle--2 mb-5">
            It is time to spread the excitement and help share
            <br /> the good news with your friends and family
          </h4>
          <InviteFriendsForm />
        </section>
      </div>
    </BackEndPage>
  );
};

const InviteFriendsForm = () => {
  return (
    <Formik
      initialValues={{
        entertainer: setInitialValues(entertainerDetailsSchema, {
          available_for: [
            { id: 1, name: 'Birthdays' },
            { id: 2, name: 'Weddings' }
          ]
        }),
        personal: setInitialValues(personalInfoObject)
      }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          actions.setSubmitting(false);
        }, 400);
      }}
      render={({ isSubmitting, handleSubmit, ...props }) => (
        <div className="card card-custom card-black card-form ">
          <div className="card-body col-md-10">
            <h4 className="card-title text-yellow">Recommend a Friend</h4>
            <Form>
              <div className="form-row">
                <Input
                  formGroupClassName="col-md-6"
                  isValidMessage="First Name looks good"
                  label="First Name"
                  name="personal.first_name"
                  placeholder="First Name"
                />
                <Input
                  formGroupClassName="col-md-6"
                  isValidMessage="Last Name looks good"
                  label="Last Name"
                  name="personal.last_name"
                  placeholder="Last Name"
                />
              </div>
              <div className="form-row">
                <Input
                  formGroupClassName="col-md-6"
                  isValidMessage="Email address seems valid"
                  label="Email"
                  name="personal.email"
                  placeholder="Email Address"
                />
                <Select
                  blankOption="Select Relationship"
                  formGroupClassName="col-md-6"
                  label="Recommend As"
                  name="entertainer.relationship"
                  options={[
                    { value: 'DJ' },
                    { value: 'Entertainer' },
                    { value: 'Friend' },
                    { value: 'Live Band' },
                    { value: 'MC' },
                    { value: 'User' }
                  ]}
                />
              </div>
              <div className="form-row">
                <Button
                  className="btn-danger btn-wide btn-transparent"
                  loading={isSubmitting}
                  onClick={handleSubmit}
                >
                  Recommend Friend
                </Button>
              </div>
            </Form>
          </div>
        </div>
      )}
      validationSchema={createSchema({
        entertainer: createSchema(entertainerDetailsSchema),
        personal: createSchema(personalInfoObject)
      })}
    />
  );
};
export default InviteFriends;
