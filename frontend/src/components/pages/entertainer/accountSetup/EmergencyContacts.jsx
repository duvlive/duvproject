import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import { Formik, Form } from 'formik';
import Input from 'components/forms/Input';
import Select from 'components/forms/Select';
import { createSchema } from 'components/forms/schema/schema-helpers';
import { setInitialValues } from 'components/forms/form-helper';
import Button from 'components/forms/Button';
import { UserContext } from 'context/UserContext';
import { getTokenFromStore } from 'utils/localStorage';
import { emergencyContactSchema } from 'components/forms/schema/entertainerSchema';
import AlertMessage from 'components/common/utils/AlertMessage';

const CONTACTS = {
  PROFESSIONAL: 1,
  NEXT_OF_KIN: 2
};

const INITIAL_CONTACT = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  relationship: ''
};

const EmergencyContact = () => {
  return (
    <BackEndPage title="Emergency Contacts">
      <div className="main-app">
        <TopMessage message="Incase of Emergency Contacts" />
        <section className="app-content">
          <ProfessionalContactForm />
          <NextOfKinForm />
        </section>
      </div>
    </BackEndPage>
  );
};

export const ProfessionalContactForm = () => {
  const { userState } = React.useContext(UserContext);
  const initialValue = userState.contacts.filter(
    contact => contact.type === CONTACTS.PROFESSIONAL
  );

  return (
    <ContactsForm
      initialValue={initialValue[0] || INITIAL_CONTACT}
      name="Professional Contact"
      type={CONTACTS.PROFESSIONAL}
    />
  );
};

export const NextOfKinForm = () => {
  const { userState } = React.useContext(UserContext);
  const initialValue = userState.contacts.filter(
    contact => contact.type === CONTACTS.NEXT_OF_KIN
  );
  return (
    <ContactsForm
      initialValue={initialValue[0] || INITIAL_CONTACT}
      name="Next of Kin"
      textColor="blue"
      type={CONTACTS.NEXT_OF_KIN}
    />
  );
};

export const ContactsForm = ({ type, name, textColor, initialValue }) => {
  const [message, setMessage] = React.useState(null);
  const { userDispatch } = React.useContext(UserContext);
  return (
    <Formik
      enableReinitialize={true}
      initialValues={setInitialValues(emergencyContactSchema, initialValue)}
      onSubmit={(values, actions) => {
        axios({
          method: initialValue.id ? 'put' : 'post',
          url: '/api/v1/contact',
          data: initialValue.id
            ? { ...values, contactId: initialValue.id }
            : { ...values, type },
          headers: { 'x-access-token': getTokenFromStore() }
        })
          .then(function(response) {
            const { status, data } = response;
            if (status === 200) {
              userDispatch({
                type: 'user-contact-update',
                user: data
              });
              setMessage({
                type: 'info',
                message: `Your ${name} contact has been successfully submitted.`
              });
              actions.setSubmitting(false);
            }
          })
          .catch(function(error) {
            setMessage(error.response.data.message);
            actions.setSubmitting(false);
          });
      }}
      render={({ isSubmitting, handleSubmit, ...props }) => (
        <div className="card card-custom card-black card-form ">
          <div className="card-body col-md-10">
            <h4 className={`card-title text-${textColor}`}>{name}</h4>
            <Form>
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
                  isValidMessage="Email address seems valid"
                  label="Email"
                  name="email"
                  placeholder="Email Address"
                />
                <Input
                  formGroupClassName="col-md-6"
                  isValidMessage="Phone number looks good"
                  label="Phone"
                  name="phoneNumber"
                  placeholder="Phone"
                />
              </div>
              <div className="form-row">
                {type === 1 ? (
                  <Input
                    formGroupClassName="col-md-6"
                    isValidMessage="looks good"
                    label="Relationship"
                    name="relationship"
                    placeholder="Relationship"
                  />
                ) : (
                  <Select
                    blankOption="Select Relationship"
                    formGroupClassName="col-md-6"
                    label="Relationship"
                    name="relationship"
                    options={[
                      { label: 'Aunts' },
                      { label: 'Brother' },
                      { label: 'Cousin' },
                      { label: 'Family' },
                      { label: 'Husband' },
                      { label: 'Parent' },
                      { label: 'Sibling' },
                      { label: 'Sister' },
                      { label: 'Spouse' },
                      { label: 'Uncle' },
                      { label: 'Wife' }
                    ]}
                  />
                )}
              </div>
              <Button
                className="btn-danger btn-wide btn-transparent"
                loading={isSubmitting}
                onClick={handleSubmit}
              >
                Update Contact
              </Button>
            </Form>
          </div>
        </div>
      )}
      validationSchema={createSchema(emergencyContactSchema)}
    />
  );
};

ContactsForm.propTypes = {
  initialValue: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  textColor: PropTypes.string,
  type: PropTypes.number
};

ContactsForm.defaultProps = {
  type: 1,
  textColor: 'yellow'
};

export default EmergencyContact;
