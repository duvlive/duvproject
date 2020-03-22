import React from 'react';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import { Formik, Form } from 'formik';
import Input from 'components/forms/Input';
import Select from 'components/forms/Select';
import { personalInfoObject } from 'components/forms/schema/userSchema';
import { createSchema } from 'components/forms/schema/schema-helpers';
import { setInitialValues } from 'components/forms/form-helper';
import Button from 'components/forms/Button';
import { entertainerDetailsSchema } from 'components/forms/schema/entertainerSchema';

const EmergencyContact = () => {
  return (
    <BackEndPage title="Emergency Contacts">
      <div className="main-app">
        <TopMessage message="Incase of Emergency Contacts" />
        <section className="app-content">
          <EmergencyContactForm />
        </section>
      </div>
    </BackEndPage>
  );
};

const EmergencyContactForm = () => {
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
        <>
          <ProfessionalContactForm />
          <NextOfKinForm />
          <Button
            className="btn-danger btn-lg btn-wide btn-transparent"
            loading={isSubmitting}
            onClick={handleSubmit}
          >
            Update Emergency Contacts
          </Button>
        </>
      )}
      validationSchema={createSchema({
        entertainer: createSchema(entertainerDetailsSchema),
        personal: createSchema(personalInfoObject)
      })}
    />
  );
};

const ProfessionalContactForm = () => (
  <div className="card card-custom card-black card-form ">
    <div className="card-body col-md-10">
      <h4 className="card-title text-yellow">Professional Contact</h4>
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
          <Input
            formGroupClassName="col-md-6"
            isValidMessage="Phone number looks good"
            label="Phone"
            name="personal.phone"
            placeholder="Phone"
          />
        </div>
        <div className="form-row">
          <Input
            formGroupClassName="col-md-6"
            isValidMessage="looks good"
            label="Relationship"
            name="personal.relationship"
            placeholder="Relationship"
          />
        </div>
      </Form>
    </div>
  </div>
);

const NextOfKinForm = () => (
  <div className="card card-custom card-black card-form ">
    <div className="card-body col-md-10">
      <h4 className="card-title text-blue">Next of Kin</h4>
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
          <Input
            formGroupClassName="col-md-6"
            isValidMessage="Phone number looks good"
            label="Phone"
            name="personal.phone"
            placeholder="Phone"
          />
        </div>
        <div className="form-row">
          <Select
            blankOption="Select Relationship"
            formGroupClassName="col-md-6"
            label="Relationship"
            name="entertainer.relationship"
            options={[
              { label: 'Aunts' },
              { label: 'Brother' },
              { label: 'Cousins' },
              { label: 'Family' },
              { label: 'Husband' },
              { label: 'Parent' },
              { label: 'Siblings' },
              { label: 'Sister' },
              { label: 'Spouse' },
              { label: 'Uncle' },
              { label: 'Wife' }
            ]}
          />
        </div>
      </Form>
    </div>
  </div>
);

export default EmergencyContact;
