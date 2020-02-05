import React from 'react';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import { Formik, Form } from 'formik';
import Input from 'components/forms/Input';
import { createSchema } from 'components/forms/schema/schema-helpers';
import { setInitialValues } from 'components/forms/form-helper';
import Button from 'components/forms/Button';
import { bankDetailsSchema } from 'components/forms/schema/entertainerSchema';

const BankDetails = () => {
  return (
    <BackEndPage title="Edit Profile">
      <div className="main-app">
        <TopMessage message="Edit Profile" />
        <section className="app-content">
          <BankDetailsForm />
        </section>
      </div>
    </BackEndPage>
  );
};

export const BankDetailsForm = () => {
  return (
    <Formik
      initialValues={setInitialValues(bankDetailsSchema)}
      onSubmit={(values, actions) => {
        console.log(values);
        setTimeout(() => {
          actions.setSubmitting(false);
        }, 400);
      }}
      render={({ isSubmitting, handleSubmit, ...props }) => (
        <div className="card card-custom card-black card-form ">
          <div className="card-body col-md-10">
            <h4 className="card-title yellow">BAnk Details</h4>
            <Form>
              <Input
                formGroupClassName="col-md-6"
                isValidMessage="Account Name looks good"
                label="Account Name"
                name="accountName"
                placeholder="Account Name"
              />
              <Input
                formGroupClassName="col-md-6"
                isValidMessage="Bank Name looks good"
                label="Bank Name"
                name="bankName"
                placeholder="Bank Name"
              />
              <Input
                formGroupClassName="col-md-6"
                isValidMessage="Stage Name looks good"
                label="Account Number"
                name="accountNumber"
                placeholder="Account Number"
              />
              <Button
                className="btn-danger btn-lg btn-wide btn-transparent"
                loading={isSubmitting}
                onClick={handleSubmit}
              >
                Edit Profile
              </Button>
            </Form>
          </div>
        </div>
      )}
      validationSchema={createSchema(bankDetailsSchema)}
    />
  );
};

export default BankDetails;
