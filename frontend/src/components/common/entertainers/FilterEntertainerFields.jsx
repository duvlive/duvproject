import React from 'react';
import { GENRE, LANGUAGE, BUDGET, RATINGS } from 'utils/constants';
import Select from 'components/forms/Select';
import MultiSelect from 'components/forms/MultiSelect';
import { Formik } from 'formik';
import {
  setInitialValues
  // DisplayFormikState
} from 'components/forms/form-helper';
import { addEntertainerSchema } from 'components/forms/schema/entertainerSchema';
import { createSchema } from 'components/forms/schema/schema-helpers';
import { getStates } from 'data/naija-states-and-lgas';
// import { Accordion } from 'react-bootstrap';
import Accordion from 'components/custom/Accordion';

const FilterEntertainerFieldsForm = () => (
  // <Accordion atomic={true}>

  <>
    <h3 className="mb-1 small">Clear Filters</h3>
    <Accordion key="0" title="Location">
      <Select
        blankOption="Location"
        label="State"
        name="address.state"
        optional
        options={getStates()}
        placeholder="State"
      />
    </Accordion>
    <Accordion key="1" title="Music Type">
      <MultiSelect
        label="Genre"
        name="entertainer.genre"
        optional
        options={GENRE}
        placeholder="Genre"
      />
      <MultiSelect
        label="Language"
        name="entertainer.language"
        optional
        options={LANGUAGE}
        placeholder="Preferred Language"
      />
    </Accordion>
    <Accordion key="2" title="Budget">
      <Select
        blankOption="Choose your lowest budget"
        label="Lowest Budget (in Naira)"
        name="entertainer.lowest_budget"
        optional
        options={BUDGET}
        placeholder="Lowest Budget"
      />
      <Select
        blankOption="Choose your highest budget"
        label="Highest Budget (in Naira)"
        name="entertainer.highestBudget"
        optional
        options={BUDGET}
        placeholder="Highest Budget"
      />
    </Accordion>
  </>
);

const FilterEntertainerFields = () => (
  <Formik
    initialValues={{ entertainer: setInitialValues(addEntertainerSchema) }}
    onSubmit={(values, actions) => {
      setTimeout(() => {
        actions.setSubmitting(false);
      }, 400);
    }}
    render={({ isSubmitting, handleSubmit, ...props }) => (
      <section className="col-md-3">
        <h4 className="main-app__subtitle">&nbsp;</h4>
        <div>
          <FilterEntertainerFieldsForm />
          <div className="mt-3 mb-5">
            <button
              className="btn btn-transparent btn-primary text-right btn-lg"
              onClick={handleSubmit}
            >
              Recommend Entertainer
            </button>
          </div>
        </div>
        {/* <DisplayFormikState {...props} /> */}
      </section>
    )}
    validationSchema={{ entertainer: createSchema(addEntertainerSchema) }}
  />
);

export default FilterEntertainerFields;
