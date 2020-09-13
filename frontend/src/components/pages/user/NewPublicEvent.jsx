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
import Input from 'components/forms/Input';
import TextArea from 'components/forms/TextArea';
import DatePicker from 'components/forms/DatePicker';
import { addDays } from 'date-fns';
import Button from 'components/forms/Button';

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
        const startTime = event.startTime.date;
        const endTime = event.endTime.date;
        const payload = {
          ...event,
          startTime: startTime,
          endTime: endTime,
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
            <DisplayFormikState {...props} />
          </div>
        </>
      )}
      validationSchema={createSchema(publicEventSchema)}
    />
  );
};

const PublicEventDetails = () => {
  return (
    <div className="card card-custom card-black card-form ">
      <div className="card-body col-md-10">
        <h4 className="card-title yellow">New Public Event</h4>
        <form>
          <Input
            label="Event Name"
            name="title"
            placeholder="Type your Event Name"
          />

          <div className="form-row">
            <DatePicker
              dateFormat="MMMM d, yyyy h:mm aa"
              formGroupClassName="col-md-6"
              label="Event Start Date"
              minDate={addDays(new Date(), 1)}
              name="startTime"
              placeholder="Event Start Time"
              showTimeSelect
              timeIntervals={15}
            />

            <DatePicker
              dateFormat="MMMM d, yyyy h:mm aa"
              formGroupClassName="col-md-6"
              label="Event End Date"
              minDate={addDays(new Date(), 1)}
              name="endTime"
              placeholder="Event Date"
              showTimeSelect
              timeIntervals={15}
            />
          </div>
          <div className="form-row">
            <Input
              formGroupClassName="col-md-6"
              label="Organizer"
              name="organizer"
              placeholder="Organizer"
            />
            <Input
              formGroupClassName="col-md-6"
              label="Event Location"
              name="location"
              optional
              placeholder="Event Location / Online Event Link"
            />
          </div>
          <Input
            label="Name of Venue"
            name="venue"
            placeholder="Venue Name / Online Event"
          />

          <Input label="Event Link" name="eventLink" placeholder="Event Link" />
          <TextArea
            label="Event Description"
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
