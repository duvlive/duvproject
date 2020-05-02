import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import { Formik, Form } from 'formik';
import Input from 'components/forms/Input';
import { createSchema } from 'components/forms/schema/schema-helpers';
import { setInitialValues } from 'components/forms/form-helper';
import Button from 'components/forms/Button';
import { UserContext } from 'context/UserContext';
import { getTokenFromStore } from 'utils/localStorage';
import { bankDetailsSchema } from 'components/forms/schema/entertainerSchema';
import AlertMessage from 'components/common/utils/AlertMessage';
import { ONBOARDING_STEPS } from 'utils/constants';

const BankDetails = () => {
  return (
    <BackEndPage title="Bank Details">
      <div className="main-app">
        <TopMessage message="Bank Details" />
        <section className="app-content">
          <BankDetailsForm />
        </section>
      </div>
    </BackEndPage>
  );
};

export const BankDetailsForm = ({ moveToNextStep }) => {
  const [message, setMessage] = React.useState(null);
  const { userState, userDispatch } = React.useContext(UserContext);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={setInitialValues(bankDetailsSchema, userState.bankDetail)}
      onSubmit={(values, actions) => {
        axios
          .put('/api/v1/bankDetail', values, {
            headers: { 'x-access-token': getTokenFromStore() },
          })
          .then(function (response) {
            const { status, data } = response;
            if (status === 200) {
              userDispatch({
                type: 'bank-account-update',
                bankDetail: data.bankDetail,
              });
              setMessage({
                type: 'info',
                message: `Your bank has been successfully submitted.`,
              });
              actions.setSubmitting(false);
              moveToNextStep();
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
            <h4 className="card-title text-blue">
              {ONBOARDING_STEPS.bankAccount.title}
            </h4>
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
BankDetailsForm.propTypes = {
  moveToNextStep: PropTypes.func,
};

BankDetailsForm.defaultProps = {
  moveToNextStep: () => {},
};

export default BankDetails;
