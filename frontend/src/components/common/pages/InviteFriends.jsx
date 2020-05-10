import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import BackEndPage from 'components/common/layout/BackEndPage';
import { Formik, Form } from 'formik';
import Input from 'components/forms/Input';
import Select from 'components/forms/Select';
import { createSchema } from 'components/forms/schema/schema-helpers';
import { setInitialValues } from 'components/forms/form-helper';
import Button from 'components/forms/Button';
import { referralObject } from 'components/forms/schema/userSchema';
import { getTokenFromStore } from 'utils/localStorage';
import AlertMessage from '../utils/AlertMessage';
import InviteFriendImage from 'assets/img/background/invite-friend.svg';
import Sharer from '../utils/Sharer';

const InviteFriends = () => {
  return (
    <BackEndPage title="Invite Friends">
      <div className="main-app">
        <section className="app-content">
          <h2 className="text-uppercase text-center text-muted-light-2 mb-2">
            Spread the Word!!!
          </h2>
          <p className="text-center text-gray lead mb-2">
            It is time to spread the excitement and help share
            <br className="d-none d-md-block" /> the good news with your friends
            and family
          </p>
          <div className="share-buttons mb-5">
            <Sharer />
          </div>
          <InviteFriendsForm />
        </section>
      </div>
    </BackEndPage>
  );
};

export const InviteFriendsForm = ({ widget }) => {
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
      render={({ isSubmitting, handleSubmit, ...props }) => {
        if (widget) {
          return (
            <InviteFriendsWidget
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              message={message}
            />
          );
        }
        return (
          <section className="row">
            <div className="col-md-6">
              <div className="card card-custom card-black card-form ">
                <div className="card-body">
                  <h4 className="card-title text-yellow">Recommend a Friend</h4>
                  <InviteFriendsWidget
                    handleSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    message={message}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <img
                alt="Listening to Music"
                className="img-fluid mr-n5 opacity-30"
                src={InviteFriendImage}
              />
            </div>
          </section>
        );
      }}
      validationSchema={createSchema(referralObject)}
    />
  );
};

InviteFriendsForm.propTypes = {
  widget: PropTypes.bool,
};

InviteFriendsForm.defaultProps = {
  widget: false,
};

const InviteFriendsWidget = ({ message, isSubmitting, handleSubmit }) => (
  <Form>
    <AlertMessage
      message={message && message.msg}
      type={message && message.type}
    />
    <Input
      isValidMessage="Email address seems valid"
      label="Email"
      name="email"
      placeholder="Email Address"
    />
    <Select
      blankOption="Select Relationship"
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
    <Button
      className="btn-danger btn-wide btn-transparent"
      loading={isSubmitting}
      onClick={handleSubmit}
    >
      Recommend Friend
    </Button>
  </Form>
);

InviteFriendsWidget.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  message: PropTypes.object.isRequired,
};

export default InviteFriends;
