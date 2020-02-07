import React from 'react';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import { Formik, Form } from 'formik';
import Input from 'components/forms/Input';
import Select from 'components/forms/Select';
import { personalInfoObject } from 'components/forms/schema/userSchema';
import { createSchema } from 'components/forms/schema/schema-helpers';
import { setInitialValues } from 'components/forms/form-helper';
import { range } from 'utils/helpers';
import Button from 'components/forms/Button';
import { entertainerDetailsSchema } from 'components/forms/schema/entertainerSchema';
import { EntertainerDetailsForm } from 'components/pages/entertainer/EditProfile';
import { EmergencyContactForm } from 'components/pages/entertainer/EmergencyContacts';
import { BankDetailsForm } from 'components/pages/entertainer/BankDetails';

const currentYear = new Date().getFullYear();

const AccountSetup = () => {
  return (
    <BackEndPage title="Account Setup">
      <div className="main-app">
        <TopMessage message="Account Setup" />
        <section className="app-content">
          <RegisterAsEntertainerForm />
        </section>
      </div>
    </BackEndPage>
  );
};

const RegisterAsEntertainerForm = () => {
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
        console.log(values);
        setTimeout(() => {
          actions.setSubmitting(false);
        }, 400);
      }}
      render={({ isSubmitting, handleSubmit, ...props }) => (
        <>
          <EntertainerDetailsForm />
          <BankDetailsForm />
          <EmergencyContactForm />
          <YoutubeChannelForm />
          <IdentificationForm />
          <Button
            className="btn-danger btn-lg btn-wide btn-transparent"
            loading={isSubmitting}
            onClick={handleSubmit}
          >
            Edit Profile
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

const YoutubeChannelForm = () => (
  <div className="card card-custom card-black card-form ">
    <div className="card-body col-md-10">
      <h4 className="card-title yellow">Youtube Channel Form</h4>
      <Form>
        <Input
          formGroupClassName="col-md-6"
          isValidMessage="First Name looks good"
          label="Youtube Channel"
          name="entertainer.accountName"
          placeholder="Youtube Channel"
        />
      </Form>
    </div>
  </div>
);

const IdentificationForm = () => (
  <div className="card card-custom card-black card-form ">
    <div className="card-body col-md-10">
      <h4 className="card-title yellow">Identification Form</h4>
      <Form>
        <div className="form-row">
          <Select
            blankOption="ID Type"
            formGroupClassName="col-md-6"
            label="ID Type"
            name="idType"
            options={range(currentYear, currentYear - 20, -1).map(year => ({
              label: year
            }))}
          />
          <Input
            formGroupClassName="col-md-6"
            isValidMessage="ID Number looks good"
            label="ID Number"
            name="idNumber"
            placeholder="ID Number"
          />
        </div>
        <div className="form-row">
          <Input
            formGroupClassName="col-md-6"
            isValidMessage="Issue Date looks good"
            label="Issue Date"
            name="issueDate"
            placeholder="Issue Date"
          />
          <Input
            formGroupClassName="col-md-6"
            isValidMessage="Expiry Date looks good"
            label="Expiry Date"
            name="expiryDate"
            placeholder="Expirty Date"
          />
        </div>
      </Form>
    </div>
  </div>
);

export default AccountSetup;
