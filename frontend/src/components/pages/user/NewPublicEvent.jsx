import React from 'react';
import PropTypes from 'prop-types';
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
import defaultImage from 'assets/img/events/public-event.jpg';
import Button from 'components/forms/Button';
import Image from 'components/common/utils/Image';
import UploadArticleImage from 'components/common/utils/UploadArticleImage';
import LoadingScreen from 'components/common/layout/LoadingScreen';
import { getStates, getLgas } from 'data/naija-states-and-lgas';
import Select from 'components/forms/Select';
import DynamicSelect from 'components/forms/DynamicSelect';

const NewPublicEvent = ({ id }) => {
  const [event, setEvent] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    id &&
      axios
        .get(`/api/v1/public-event/${id}`, {
          headers: {
            'x-access-token': getTokenFromStore(),
          },
        })
        .then(function (response) {
          const { status, data } = response;
          console.log('data', data);
          // handle success
          if (status === 200) {
            setEvent(data.event);
            setLoading(false);
          }
        })
        .catch(function (error) {
          setLoading(false);
        });
  }, [id]);

  return (
    <BackEndPage title={id ? 'Edit Event' : 'New Event'}>
      <div className="main-app">
        <TopMessage message="Public Events" />

        {id && event.status !== null && (
          <AlertMessage
            message={
              <span>
                Updating an approved or rejected event would be reviewed by the
                administrator for approval.
              </span>
            }
            type="info"
          />
        )}

        <section className="app-content">
          {id ? (
            <EditEventForm event={event} loading={loading} />
          ) : (
            <NewEventForm />
          )}
        </section>
      </div>
    </BackEndPage>
  );
};

NewPublicEvent.propTypes = {
  id: PropTypes.any,
};

NewPublicEvent.defaultProps = {
  id: null,
};

const EditEventForm = ({ loading, event }) =>
  loading ? (
    <LoadingScreen loading={loading} text="Loading Event Details" />
  ) : (
    <NewEventForm eventDetails={event} />
  );

EditEventForm.propTypes = {
  event: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};

EditEventForm.defaultProps = {
  event: {},
};

const NewEventForm = ({ eventDetails }) => {
  const defaultImage = eventDetails.mainImage || null;
  const [message, setMessage] = React.useState(null);
  const [image, setImage] = React.useState(defaultImage);

  console.log('eventDetails', eventDetails);

  return (
    <Formik
      initialValues={setInitialValues(publicEventSchema, {
        ...eventDetails,
        startTime: { date: eventDetails.startTime },
        endTime: { date: eventDetails.endTime },
      })}
      onSubmit={(event, actions) => {
        const startTime = event.startTime.date;
        const endTime = event.endTime.date;
        const payload = {
          ...eventDetails,
          ...event,
          startTime: startTime,
          endTime: endTime,
          mainImage: image,
        };
        console.log('event, payload', event, payload);
        axios({
          method: eventDetails ? 'put' : 'post',
          url: '/api/v1/public-events',
          data: payload,
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

          <PublicEventDetails image={image} setImage={setImage} />

          <DisplayFormikState hide {...props} />
          <div className="mt-5">
            <AlertMessage {...message} />
            <Button
              className="btn-danger btn-wide btn-transparent btn-lg"
              loading={isSubmitting}
              onClick={handleSubmit}
            >
              {eventDetails ? 'Update' : 'Submit'} Public Event
            </Button>
            <DisplayFormikState {...props} />
          </div>
        </>
      )}
      validationSchema={createSchema(publicEventSchema)}
    />
  );
};

NewEventForm.propTypes = {
  eventDetails: PropTypes.object,
};

NewEventForm.defaultProps = {
  eventDetails: {},
};

const PublicEventImage = ({ image, setImage }) => {
  return (
    <section>
      <Image
        className="uploaded-image uploaded-article-image"
        name="property image"
        rounded={false}
        src={image || defaultImage}
      />
      <div className="my-4">
        <UploadArticleImage
          afterUpload={(image) => setImage(image)}
          defaultImage={image}
        />
      </div>
    </section>
  );
};

PublicEventImage.propTypes = {
  image: PropTypes.any.isRequired,
  setImage: PropTypes.func.isRequired,
};

const PublicEventDetails = ({ image, setImage }) => {
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
              placeholder="Event End Time"
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
              label="Event Address"
              name="location"
              optional
              placeholder="Type 'Online' for online events"
            />
          </div>
          <div className="form-row">
            <Select
              blankOption="Select State"
              formGroupClassName="col-md-6"
              label="State"
              name="state"
              optional
              options={getStates()}
              placeholder="State"
            />
            <DynamicSelect
              blankOption="Select City/LGA"
              dependentOn="state"
              formGroupClassName="col-md-6"
              label="City"
              name="city"
              optional
              options={getLgas}
              placeholder="City / LGA"
            />
          </div>
          <Input
            label="Name of Venue"
            name="venue"
            placeholder="Venue Name / Online Event"
          />

          <Input
            label="Event Link"
            name="eventLink"
            placeholder="Event Website Link or type 'None'"
          />
          <TextArea
            label="Event Description"
            name="description"
            optional
            placeholder="More information about your event"
            rows="8"
          />

          <div className="col-sm-8">
            <PublicEventImage image={image || ''} setImage={setImage} />
          </div>
        </form>
      </div>
    </div>
  );
};

PublicEventDetails.propTypes = {
  image: PropTypes.any,
  setImage: PropTypes.func.isRequired,
};

PublicEventDetails.defaultProps = {
  image: null,
};

export default NewPublicEvent;
