import React from 'react';
import {
  SELECT_ENTERTAINERS_TYPE,
  EVENT_AGE_GROUP,
  GENRE,
  LANGUAGE,
  AUDIENCE_SIZE,
  BUDGET,
  PLACE_OF_EVENTS,
  OCCASSION_TYPE
} from 'utils/constants';
import Select from 'components/forms/Select';
import MultiSelect from 'components/forms/MultiSelect';
import TextArea from 'components/forms/TextArea';

const SearchForEntertainer = () => (
  <div className="card card-custom card-black card-form">
    <div className="card-body col-md-10">
      <h4 className="card-title blue">Add Entertainer</h4>
      <div className="form-row">
        <Select
          blankOption="Choose your preferred Entertainer Type"
          formGroupClassName="col-md-6"
          isValidMessage="looks good"
          label="Entertainer Type"
          name="entertainer.type"
          options={SELECT_ENTERTAINERS_TYPE}
          placeholder="Entertainer Type"
        />
        <Select
          blankOption="Select Event Type"
          formGroupClassName="col-md-6"
          isValidMessage="looks good"
          label="Event Type"
          name="entertainer.eventType"
          options={OCCASSION_TYPE}
          placeholder="Event Type"
        />
      </div>
      <div className="form-row">
        <MultiSelect
          formGroupClassName="col-md-6"
          isValidMessage="looks good"
          label="Genre"
          name="entertainer.genre"
          options={GENRE}
          placeholder="Genre"
        />
        <MultiSelect
          formGroupClassName="col-md-6"
          isValidMessage="looks good"
          label="Language"
          name="entertainer.language"
          options={LANGUAGE}
          placeholder="Preferred Language"
        />
      </div>
      <div className="form-row">
        <Select
          blankOption="Select an audience size"
          formGroupClassName="col-md-6"
          isValidMessage="looks good"
          label="Expected Audience Size"
          name="entertainer.audience"
          options={AUDIENCE_SIZE}
          placeholder="Expected Audience Size"
        />
        <Select
          blankOption="Select the event's age group"
          formGroupClassName="col-md-6"
          isValidMessage="looks good"
          label="Age Group"
          name="entertainer.ageGroup"
          options={EVENT_AGE_GROUP}
          placeholder="Select the event's age group"
        />
      </div>
      <div className="form-row">
        <Select
          blankOption="Choose your lowest budget"
          formGroupClassName="col-md-6"
          isValidMessage="looks good"
          label="Lowest Budget (in Naira)"
          name="entertainer.lowest_budget"
          options={BUDGET}
          placeholder="Lowest Budget"
        />
        <Select
          blankOption="Choose your highest budget"
          formGroupClassName="col-md-6"
          isValidMessage="looks good"
          label="Highest Budget (in Naira)"
          name="entertainer.highestBudget"
          options={BUDGET}
          placeholder="Highest Budget"
        />
      </div>
      <div className="form-row">
        <Select
          blankOption="Choose a place of event"
          formGroupClassName="col-md-6"
          isValidMessage="looks good"
          label="Place of Event"
          name="entertainer.place"
          options={PLACE_OF_EVENTS}
          placeholder="Place of Event"
        />
        <div className="col-md-6">
          <TextArea
            label="Special Requests"
            name="entertainer.specialRequest"
            placeholder="E.g 10 special songs, your favorite song e.t.c."
            rows="3"
          />
        </div>
      </div>
    </div>
  </div>
);

export default SearchForEntertainer;
