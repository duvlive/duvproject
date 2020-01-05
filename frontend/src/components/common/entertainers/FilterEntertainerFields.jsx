import React from 'react';
import {
  SELECT_ENTERTAINERS_TYPE,
  EVENT_AGE_GROUP,
  GENRE,
  LANGUAGE,
  AUDIENCE_SIZE,
  BUDGET,
  OCCASSION_TYPE
} from 'utils/constants';
import Select from 'components/forms/Select';
import MultiSelect from 'components/forms/MultiSelect';
import { Formik } from 'formik';
import {
  setInitialValues
  // DisplayFormikState
} from 'components/forms/form-helper';
import { addEntertainerSchema } from 'components/forms/schema/entertainerSchema';
import { createSchema } from 'components/forms/schema/schema-helpers';

const FilterEntertainerFieldsForm = () => (
  <div className="card card-custom card-black card-form col-md-4">
    <MultiSelect
      isValidMessage="looks good"
      label="Genre"
      name="entertainer.genre"
      options={GENRE}
      placeholder="Genre"
    />
    <MultiSelect
      isValidMessage="looks good"
      label="Language"
      name="entertainer.language"
      options={LANGUAGE}
      placeholder="Preferred Language"
    />
    <Select
      blankOption="Choose your lowest budget"
      isValidMessage="looks good"
      label="Lowest Budget (in Naira)"
      name="entertainer.lowest_budget"
      options={BUDGET}
      placeholder="Lowest Budget"
    />
    <Select
      blankOption="Choose your highest budget"
      isValidMessage="looks good"
      label="Highest Budget (in Naira)"
      name="entertainer.highest_budget"
      options={BUDGET}
      placeholder="Highest Budget"
    />
  </div>
);

const FilterEntertainerFields = () => (
  <Formik
    initialValues={{ entertainer: setInitialValues(addEntertainerSchema) }}
    onSubmit={(values, actions) => {
      console.log(values);
      setTimeout(() => {
        actions.setSubmitting(false);
      }, 400);
    }}
    render={({ isSubmitting, handleSubmit, ...props }) => (
      <>
        <FilterEntertainerFieldsForm />
        {/* <DisplayFormikState {...props} /> */}
      </>
    )}
    validationSchema={{ entertainer: createSchema(addEntertainerSchema) }}
  />
);

export default FilterEntertainerFields;
