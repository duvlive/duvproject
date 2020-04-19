import React from 'react';
import axios from 'axios';
import BackEndPage from 'components/common/layout/BackEndPage';
import { Formik, Form } from 'formik';
import Input from 'components/forms/Input';
import Select from 'components/forms/Select';
import { createSchema } from 'components/forms/schema/schema-helpers';
import {
  setInitialValues,
  DisplayFormikState,
} from 'components/forms/form-helper';
import Button from 'components/forms/Button';
import { referralObject } from 'components/forms/schema/userSchema';
import { getTokenFromStore } from 'utils/localStorage';
import AlertMessage from '../utils/AlertMessage';

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
  const [message, setMessage] = React.useState({});
  return (
    <Formik
      initialValues={setInitialValues(referralObject)}
      onSubmit={(values, actions) => {
        axios
          .post('/api/v1/inviteFriend', values, {
            headers: { 'x-access-token': getTokenFromStore() },
          })
          .then(function (response) {
            const { status } = response;
            if (status === 200) {
              setMessage({
                msg: 'An email has been sent to your friend. Thank you.',
                type: 'success',
              });
              actions.resetForm();
              actions.setSubmitting(false);
            }
          })
          .catch(function (error) {
            setMessage({ msg: error.response.data.message });
            actions.setSubmitting(false);
          });
      }}
      render={({ isSubmitting, handleSubmit, ...props }) => (
        <div className="card card-custom card-black card-form ">
          <div className="card-body col-md-10">
            <h4 className="card-title text-yellow">Recommend a Friend</h4>
            <Form>
              <AlertMessage
                message={message && message.msg}
                type={message && message.type}
              />
              <div className="form-row">
                <Input
                  formGroupClassName="col-md-6"
                  isValidMessage="Email address seems valid"
                  label="Email"
                  name="email"
                  placeholder="Email Address"
                />
                <Select
                  blankOption="Select Relationship"
                  formGroupClassName="col-md-6"
                  label="Recommend As"
                  name="recommendAs"
                  options={[
                    { value: 'DJ' },
                    { value: 'Entertainer' },
                    { value: 'Friend' },
                    { value: 'Live Band' },
                    { value: 'MC' },
                    { value: 'User' },
                  ]}
                />
              </div>
              <DisplayFormikState {...props} />
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
      validationSchema={createSchema(referralObject)}
    />
  );
};
export default InviteFriends;
