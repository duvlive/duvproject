import React from 'react';
import axios from 'axios';
import {
  SELECT_ENTERTAINERS_TYPE,
  EVENT_AGE_GROUP,
  GENRE,
  LANGUAGE,
  AUDIENCE_SIZE,
  BUDGET,
  PLACE_OF_EVENTS
} from 'utils/constants';
import Select from 'components/forms/Select';
import MultiSelect from 'components/forms/MultiSelect';
import TextArea from 'components/forms/TextArea';
import { Formik } from 'formik';
import {
  setInitialValues,
  DisplayFormikState
} from 'components/forms/form-helper';
import { addEntertainerSchema } from 'components/forms/schema/entertainerSchema';
import { UserContext } from 'context/UserContext';
import { getTokenFromStore } from 'utils/localStorage';
import { createSchema } from 'components/forms/schema/schema-helpers';
import AlertMessage from '../utils/AlertMessage';

const AddEntertainerDetails = () => {
  const { userDispatch } = React.useContext(UserContext);
  const [message, setMessage] = React.useState(null);
  return (
    <Formik
      initialValues={setInitialValues(addEntertainerSchema, {
        highestBudget: '1M+'
      })}
      onSubmit={(values, actions) => {
        const entertainerDetails = {
          ...values,
          genre: JSON.stringify(values.genre),
          language: JSON.stringify(values.language),
          ageGroup: JSON.stringify(values.ageGroup)
        };
        axios
          .post('/api/v1/eventEntertainer', entertainerDetails, {
            headers: { 'x-access-token': getTokenFromStore() }
          })
          .then(function(response) {
            const { status, data } = response;
            if (status === 200) {
              userDispatch({
                type: 'add-entertainer-to-event',
                user: data
              });
              setMessage({
                type: 'info',
                message: `Your Event has been successfully saved.`
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
        <>
          <AlertMessage {...message} />
          <AddEntertainerDetailsForm />
          <div className="mt-5">
            <button
              className="btn btn-transparent btn-primary text-right btn-lg"
              onClick={handleSubmit}
            >
              Search Entertainer
            </button>
          </div>
          <DisplayFormikState {...props} />
        </>
      )}
      validationSchema={createSchema(addEntertainerSchema)}
    />
  );
};

const AddEntertainerDetailsForm = () => (
  <div className="card card-custom card-black card-form">
    <div className="card-body col-md-10">
      <h4 className="card-title blue">Entertainer Details</h4>
      <div className="form-row">
        <Select
          blankOption="Choose your preferred Entertainer Type"
          formGroupClassName="col-md-6"
          label="Entertainer Type"
          name="entertainerType"
          options={SELECT_ENTERTAINERS_TYPE}
          placeholder="Entertainer Type"
        />
        <Select
          blankOption="Choose a place of event"
          formGroupClassName="col-md-6"
          label="Place of Event"
          name="placeOfEvent"
          options={PLACE_OF_EVENTS}
          placeholder="Place of Event"
        />
      </div>
      <div className="form-row">
        <MultiSelect
          formGroupClassName="col-md-6"
          label="Genre"
          name="genre"
          optional
          options={GENRE}
          placeholder="Genre"
        />
        <MultiSelect
          formGroupClassName="col-md-6"
          label="Language"
          name="language"
          optional
          options={LANGUAGE}
          placeholder="Preferred Language"
        />
      </div>
      <div className="form-row">
        <Select
          blankOption="Select an audience size"
          formGroupClassName="col-md-6"
          label="Expected Audience Size"
          name="expectedAudienceSize"
          options={AUDIENCE_SIZE}
          placeholder="Expected Audience Size"
        />
        <MultiSelect
          formGroupClassName="col-md-6"
          label="Age Group"
          name="ageGroup"
          options={EVENT_AGE_GROUP}
          placeholder="Select the event's age group"
        />
      </div>
      <div className="form-row">
        <Select
          blankOption="Choose your base budget"
          formGroupClassName="col-md-6"
          label="Base Budget (in Naira)"
          name="lowestBudget"
          options={BUDGET}
          placeholder="Lowest Budget"
        />
        <Select
          blankOption="Choose your highest budget"
          formGroupClassName="col-md-6"
          label="Highest Budget (in Naira)"
          name="highestBudget"
          options={BUDGET}
          placeholder="Highest Budget"
        />
      </div>
      <div className="form-row">
        <div className="col-md-12">
          <TextArea
            label="Special Requests"
            name="specialRequest"
            optional
            placeholder="E.g 10 special songs, your favorite song e.t.c."
            rows="3"
          />
        </div>
      </div>
    </div>
  </div>
);

export default AddEntertainerDetails;
