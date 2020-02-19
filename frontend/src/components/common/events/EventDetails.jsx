import React from 'react';
import { OCCASSION_TYPE } from 'utils/constants';
import Select from 'components/forms/Select';
import TextArea from 'components/forms/TextArea';
import DatePicker from 'components/forms/DatePicker';

const EventDetails = () => {
  return (
    <div className="card card-custom card-black card-form ">
      <div className="card-body col-md-10">
        <h4 className="card-title yellow">Event Details</h4>
        <form>
          <div className="form-row">
            <Select
              blankOption="Select Event Type"
              formGroupClassName="col-md-6"
              isValidMessage="looks good"
              label="Event Type"
              name="event.eventType"
              options={OCCASSION_TYPE}
              placeholder="Event Type"
            />
            <DatePicker
              formGroupClassName="col-md-6"
              isValidMessage="looks good"
              label="Event Date"
              name="event.eventDate"
              placeholderText="Event Date"
            />
          </div>
          <div className="form-row">
            <DatePicker
              dateFormat="h:mm aa"
              formGroupClassName="col-md-6"
              isValidMessage="looks good"
              label="Start Time"
              name="event.startTime"
              placeholderText="Start Time"
              showTimeSelect
              showTimeSelectOnly
              timeCaption="Start Time"
              timeIntervals={30}
            />
            <DatePicker
              dateFormat="h:mm aa"
              formGroupClassName="col-md-6"
              isValidMessage="looks good"
              label="End Time"
              name="event.endTime"
              placeholderText="End Time"
              showTimeSelect
              showTimeSelectOnly
              timeCaption="End Time"
              timeIntervals={30}
            />
          </div>
          <TextArea
            label="More Information"
            name="event.moreInformation"
            optional
            placeholder="More information about your event"
            rows="8"
          />
        </form>
      </div>
    </div>
  );
};

export default EventDetails;
