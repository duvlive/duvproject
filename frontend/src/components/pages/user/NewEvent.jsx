import React from 'react';
import { Formik } from 'formik';
import { setInitialValues } from 'components/forms/form-helper';
import TopMessage from 'components/common/layout/TopMessage';
import EventDetails from 'components/common/events/EventDetails';
import EventAddress from 'components/common/events/EventAddress';
import { navigate } from '@reach/router';
import BackEndPage from 'components/common/layout/BackEndPage';
import {
  eventDetailsSchema,
  eventAddressSchema,
} from 'components/forms/schema/eventSchema';
import { createSchema } from 'components/forms/schema/schema-helpers';
import axios from 'axios';
import {
  getHiredEntertainerFromStore,
  getTokenFromStore,
} from 'utils/localStorage';
import { UserContext } from 'context/UserContext';
import AlertMessage from 'components/common/utils/AlertMessage';
import { Link, Match } from '@reach/router';
import { startOfDay, addHours } from 'date-fns';
import { HiredEntertainerCard } from './AddEntertainerToEvent';

const NewEvent = () => {
  const hiredEntertainer = getHiredEntertainerFromStore();
  return (
    <BackEndPage title="New Events">
      <div className="main-app">
        <TopMessage message="Enter a New Event" />

        <section className="app-content">
          {hiredEntertainer && (
            <>
              <HiredEntertainerCard />
              <Link
                className="btn btn-success btn-transparent btn-xs mb-5"
                to="/user/events"
              >
                Hire for an exisiting event
              </Link>
            </>
          )}
          <Match path="/user/hire-entertainer">
            {(props) =>
              // eslint-disable-next-line react/prop-types
              props.match &&
              !hiredEntertainer && (
                <AlertMessage
                  message={
                    <span>
                      Kindly enter the type of event you wish to{' '}
                      <strong>Hire an Entertainer</strong> for. To add an
                      entertainer to a previously created event,{' '}
                      <Link to="/user/events">Click here</Link>
                    </span>
                  }
                  type="info"
                />
              )
            }
          </Match>
          <NewEventForm />
        </section>
      </div>
    </BackEndPage>
  );
};

const NewEventForm = () => {
  const initialValues = {
    event: setInitialValues(eventDetailsSchema),
    address: setInitialValues(eventAddressSchema),
  };
  const entertainersSchema = {
    event: createSchema(eventDetailsSchema),
    address: createSchema(eventAddressSchema),
  };
  const { userDispatch } = React.useContext(UserContext);
  const [message, setMessage] = React.useState(null);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={({ event, address }, actions) => {
        const eventDate = startOfDay(event.eventDate.date);
        const startTime = addHours(eventDate, event.startTime);
        const payload = {
          eventType: event.eventType,
          eventDate: startTime,
          startTime: startTime,
          eventDuration: event.eventDuration,
          moreInformation: event.moreInformation,
          ...address,
        };
        axios
          .post('/api/v1/events', payload, {
            headers: { 'x-access-token': getTokenFromStore() },
          })
          .then(function (response) {
            const { status, data } = response;
            if (status === 200) {
              userDispatch({
                type: 'add-new-event',
                event: data.event,
              });

              const eventId = data.event.id;
              navigate(`/user/events/${eventId}/add-entertainer/new-event`);
              actions.setSubmitting(false);
            }
          })
          .catch(function (error) {
            setMessage({ message: error.response.data.message });
            actions.setSubmitting(false);
          });
      }}
      render={({ isSubmitting, handleSubmit, ...props }) => (
        <>
          <AlertMessage {...message} />
          <EventDetails />
          <EventAddress />
          <div className="mt-5">
            <button
              className="btn btn-transparent btn-primary text-right btn-lg"
              onClick={handleSubmit}
            >
              Save Event
            </button>
          </div>
        </>
      )}
      validationSchema={createSchema(entertainersSchema)}
    />
  );
};

export default NewEvent;
