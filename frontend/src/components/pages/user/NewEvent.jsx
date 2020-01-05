import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  setInitialValues
  // DisplayFormikState
} from 'components/forms/form-helper';
import TopMessage from 'components/common/layout/TopMessage';
import EventDetails from 'components/common/events/EventDetails';
import EventAddress from 'components/common/events/EventAddress';
import AddEntertainerDetails from 'components/common/entertainers/AddEntertainerDetails';
import { HIRE_ENTERTAINERS } from 'utils/constants';
import { navigate } from '@reach/router';
import BackEndPage from 'components/common/layout/BackEndPage';
import {
  eventDetailsSchema,
  eventAddressSchema
} from 'components/forms/schema/eventSchema';
import { addEntertainerSchema } from 'components/forms/schema/entertainerSchema';
import { createSchema } from 'components/forms/schema/schema-helpers';

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
  hire_type: PropTypes.string
};

NewEvent.defaultProps = {
  hire_type: ''
};

const NewEventForm = ({ currentHireType }) => {
  const initialValues = {
    event: setInitialValues(eventDetailsSchema),
    address: setInitialValues(eventAddressSchema),
    entertainer: setInitialValues(addEntertainerSchema, {
      highest_budget: '1M+'
    })
  };
  const entertainersSchema = {
    event: createSchema(eventDetailsSchema),
    address: createSchema(eventAddressSchema),
    entertainer: createSchema(addEntertainerSchema)
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        console.log(values);
        setTimeout(() => {
          actions.setSubmitting(false);
          let urlToRedirect;
          console.log('currentHireType', currentHireType);
          if (currentHireType === HIRE_ENTERTAINERS.search) {
            urlToRedirect = '/user/entertainer/search/1';
          } else if (currentHireType === HIRE_ENTERTAINERS.recommend) {
            urlToRedirect = '/user/entertainer/recommended/1';
          } else {
            urlToRedirect = '/user/auctions';
          }
          return navigate(urlToRedirect);
        }, 400);
      }}
      render={({ isSubmitting, handleSubmit, ...props }) => (
        <>
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
          {/* <DisplayFormikState {...props} /> */}
        </>
      )}
      validationSchema={entertainersSchema && createSchema({})}
    />
  );
};

NewEventForm.propTypes = {
  currentHireType: PropTypes.string.isRequired
};

export default NewEvent;
