import React from 'react';
import PropTypes from 'prop-types';
import Select from 'components/forms/Select';
import MultiSelect from 'components/forms/MultiSelect';
import TextArea from 'components/forms/TextArea';
import InputFormat from 'components/forms/InputFormat';
import DatePicker from 'components/forms/DatePicker';
import { addDays } from 'date-fns';
import {
  SELECT_ENTERTAINERS_TYPE,
  EVENT_AGE_GROUP,
  GENRE,
  LANGUAGE,
  AUDIENCE_SIZE,
  BUDGET,
  PLACE_OF_EVENTS,
} from 'utils/constants';
import { maxAuctionDate, minAuctionDate } from 'utils/event-helpers';

export const SearchEntertainerDetailsForm = () => (
  <>
    <div className="form-row">
      <InputFormat
        formGroupClassName="col-md-6"
        label="Your Offer"
        name="askingPrice"
        placeholder="Enter the Amount you wish to pay"
      />
      <Select
        blankOption="Choose a place of event"
        formGroupClassName="col-md-6"
        label="Type of Event"
        name="placeOfEvent"
        options={PLACE_OF_EVENTS}
        placeholder="Type of Event"
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
      <MultiSelect
        formGroupClassName="col-md-6"
        label="Genre"
        name="genre"
        optional
        options={GENRE}
        placeholder="Preferred Genre"
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
  </>
);

export const AuctionEntertainerDetailsForm = ({ eventDate }) => {
  const [showMore, setShowMore] = React.useState(false);
  return (
    <>
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
          label="Type of Event"
          name="placeOfEvent"
          options={PLACE_OF_EVENTS}
          placeholder="Type of Event"
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
      <section className={showMore ? 'd-block' : 'd-none'}>
        <div className="form-row">
          <MultiSelect
            formGroupClassName="col-md-6"
            label="Genre"
            name="genre"
            optional
            options={GENRE}
            placeholder="Preferred Genre"
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
          <DatePicker
            formGroupClassName="col-md-6"
            label="Auction Start Date"
            maxDate={minAuctionDate(eventDate)}
            minDate={new Date()}
            name="auctionStartDate"
            placeholderText="Event Date"
          />
          <DatePicker
            formGroupClassName="col-md-6"
            label="Auction End Date"
            maxDate={maxAuctionDate(eventDate)}
            minDate={addDays(new Date(), 1)}
            name="auctionEndDate"
            placeholderText="Event Date"
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
      </section>
      {!showMore && (
        <p className="text-link small" onClick={() => setShowMore(!showMore)}>
          {showMore ? 'Show Less' : 'Show More'}...
        </p>
      )}
    </>
  );
};

AuctionEntertainerDetailsForm.propTypes = {
  eventDate: PropTypes.any.isRequired,
};
