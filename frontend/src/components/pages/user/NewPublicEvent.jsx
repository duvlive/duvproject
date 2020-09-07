import React from 'react';
import { Formik } from 'formik';
import {
  setInitialValues,
  DisplayFormikState,
} from 'components/forms/form-helper';
import TopMessage from 'components/common/layout/TopMessage';
import { navigate } from '@reach/router';
import BackEndPage from 'components/common/layout/BackEndPage';
import { publicEventSchema } from 'components/forms/schema/eventSchema';
import { createSchema } from 'components/forms/schema/schema-helpers';
import axios from 'axios';
import { getTokenFromStore } from 'utils/localStorage';
import AlertMessage from 'components/common/utils/AlertMessage';
import { startOfDay, addHours } from 'date-fns';
import { getEventDuration } from 'components/common/events/EventDetails';
import Input from 'components/forms/Input';
import Select from 'components/forms/Select';
import TextArea from 'components/forms/TextArea';
import DatePicker from 'components/forms/DatePicker';
import { START_TIME } from 'utils/constants';
import { addDays } from 'date-fns';
import Button from 'components/forms/Button';
import InputFormat from 'components/forms/InputFormat';

const NewEvent = () => {
  return (
    <BackEndPage title="New Events">
      <div className="main-app">
        <TopMessage message="Public Events" />

        <section className="app-content">
          <NewEventForm />
        </section>
      </div>
    </BackEndPage>
  );
};

const NewEventForm = () => {
  const [message, setMessage] = React.useState(null);

  return (
    <Formik
      initialValues={setInitialValues(publicEventSchema)}
      onSubmit={(event, actions) => {
        const eventDate = startOfDay(event.eventDate.date);
        const startTime = addHours(eventDate, event.startTime);
        const payload = {
          ...event,
          eventDate: startTime,
          startTime: startTime,
        };
        console.log('event, payload', event, payload);
        axios
          .post('/api/v1/public-events', payload, {
            headers: { 'x-access-token': getTokenFromStore() },
          })
          .then(function (response) {
            const { status } = response;
            if (status === 200) {
              navigate('/user/public-events');
              actions.resetForm();
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
          <PublicEventDetails />

          <DisplayFormikState hide {...props} />
          <div className="mt-5">
            <AlertMessage {...message} />
            <Button
              className="btn-danger btn-wide btn-transparent btn-lg"
              loading={isSubmitting}
              onClick={handleSubmit}
            >
              Submit Public Event
            </Button>
          </div>
        </>
      )}
      validationSchema={createSchema(publicEventSchema)}
    />
  );
};

const PublicEventDetails = () => {
  const EVENT_DURATION = getEventDuration();

  return (
    <div className="card card-custom card-black card-form ">
      <div className="card-body col-md-10">
        <h4 className="card-title yellow">New Public Event</h4>
        <form>
          <div className="form-row">
            <Input
              formGroupClassName="col-md-6"
              label="Event Name"
              name="title"
              placeholder="Type your Event Name"
            />

            <DatePicker
              formGroupClassName="col-md-6"
              label="Event Date"
              minDate={addDays(new Date(), 4)}
              name="eventDate"
              placeholder="Event Date"
            />
          </div>
          <div className="form-row">
            <Select
              blankOption="Approx. Start Time"
              formGroupClassName="col-md-6"
              label="Start Time"
              name="startTime"
              options={START_TIME}
            />
            <Select
              blankOption="Select Duration"
              formGroupClassName="col-md-6"
              label="Duration of Event (Approx.)"
              name="eventDuration"
              options={EVENT_DURATION}
            />
          </div>
          <Input
            label="Event Venue"
            name="venue"
            placeholder="Type Venue / Online Events"
          />
          <div className="form-row">
            <Input
              formGroupClassName="col-md-6"
              label="Event Location"
              name="location"
              optional
              placeholder="Event Location / Online Event Link"
            />
            <InputFormat
              formGroupClassName="col-md-6"
              label="Ticket Price (NGN)"
              name="ticket"
              placeholder="Ticket Price (Leave Blank or type 0 for Free)"
            />
          </div>
          <Input
            formGroupClassName="col-md-6"
            label="Organizer"
            name="organizer"
            placeholder="Organizer"
          />
          <TextArea
            label="More Information"
            name="description"
            optional
            placeholder="More information about your event"
            rows="8"
          />
        </form>
      </div>
    </div>
  );
};

export default NewEvent;
