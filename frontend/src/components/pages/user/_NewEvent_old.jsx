import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  setInitialValues,
  DisplayFormikState,
} from 'components/forms/form-helper';
import TopMessage from 'components/common/layout/TopMessage';
import EventDetails from 'components/common/events/EventDetails';
import EventAddress from 'components/common/events/EventAddress';
import AddEntertainerDetails from 'components/pages/user/AddEntertainerToEvent';
import { HIRE_ENTERTAINERS } from 'utils/constants';
// import { navigate } from '@reach/router';
import BackEndPage from 'components/common/layout/BackEndPage';
import {
  eventDetailsSchema,
  eventAddressSchema,
} from 'components/forms/schema/eventSchema';
import { addEntertainerSchema } from 'components/forms/schema/entertainerSchema';
import { createSchema } from 'components/forms/schema/schema-helpers';
import axios from 'axios';
import { getTokenFromStore } from 'utils/localStorage';
import { UserContext } from 'context/UserContext';
import AlertMessage from 'components/common/utils/AlertMessage';

const NewEvent = ({ hire_type }) => {
  const validHireType = Object.keys(HIRE_ENTERTAINERS).includes(
    hire_type.toLowerCase()
  );
  const currentHireType = validHireType ? HIRE_ENTERTAINERS[hire_type] : '';
  const message = validHireType
    ? `Hire an Entertainer (${currentHireType})`
    : 'Enter a New Event';
  return (
    <BackEndPage title="New Events">
      <div className="main-app">
        <TopMessage message={message} />

        <section className="app-content">
          <NewEventForm currentHireType={currentHireType} />
        </section>
      </div>
    </BackEndPage>
  );
};

NewEvent.propTypes = {
  hire_type: PropTypes.string,
};

NewEvent.defaultProps = {
  hire_type: '',
};

const NewEventForm = ({ currentHireType }) => {
  const initialValues = {
    event: setInitialValues(eventDetailsSchema),
    address: setInitialValues(eventAddressSchema),
    entertainer: setInitialValues(addEntertainerSchema, {
      highestBudget: '1M+',
    }),
  };
  const entertainersSchema = {
    event: createSchema(eventDetailsSchema),
    address: createSchema(eventAddressSchema),
    entertainer: createSchema(addEntertainerSchema),
  };
  const { userDispatch } = React.useContext(UserContext);
  const [message, setMessage] = React.useState(null);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={({ event, address, entertainer }, actions) => {
        const payload = {
          entertainer: {
            ...entertainer,
            genre: JSON.stringify(entertainer.genre),
            language: JSON.stringify(entertainer.language),
            ageGroup: JSON.stringify(entertainer.ageGroup),
          },
          eventDetails: {
            eventType: event.eventType,
            eventDate: event.eventDate.date,
            startTime: event.startTime.date,
            eventDuration: event.eventDuration.date,
            moreInformation: event.moreInformation,
            ...address,
          },
        };
        console.log('payload', payload);
        axios
          .post('/api/v1/events', payload.eventDetails, {
            headers: { 'x-access-token': getTokenFromStore() },
          })
          .then(function (response) {
            const { status, data } = response;
            console.log('status, data', status, data);
            if (status === 200) {
              userDispatch({
                type: 'add-new-event',
                user: data,
              });

              axios
                .post(
                  '/api/v1/eventEntertainer',
                  { ...payload.entertainer, eventId: data.event.id },
                  {
                    headers: { 'x-access-token': getTokenFromStore() },
                  }
                )
                .then(function (response) {
                  const { status, data } = response;
                  if (status === 200) {
                    userDispatch({
                      type: 'add-entertainer-to-event',
                      user: data,
                    });
                    setMessage({
                      type: 'info',
                      message: `Your Event has been successfully saved.`,
                    });
                    actions.setSubmitting(false);
                  }
                })
                .catch(function (error) {
                  setMessage(error.response.data.message);
                  actions.setSubmitting(false);
                });

              setMessage({
                type: 'info',
                message: `Your bank has been successfully submitted.`,
              });
              actions.setSubmitting(false);
            }
          })
          .catch(function (error) {
            setMessage(error.response.data.message);
            actions.setSubmitting(false);
          });
      }}
      render={({ isSubmitting, handleSubmit, ...props }) => (
        <>
          <AlertMessage {...message} />
          <EventDetails />
          <EventAddress />
          <AddEntertainerDetails />
          <div className="mt-5">
            <button
              className="btn btn-transparent btn-primary text-right btn-lg"
              onClick={handleSubmit}
            >
              Start {currentHireType}
            </button>
          </div>
          <DisplayFormikState {...props} />
        </>
      )}
      validationSchema={entertainersSchema}
    />
  );
};

NewEventForm.propTypes = {
  currentHireType: PropTypes.string.isRequired,
};

export default NewEvent;
