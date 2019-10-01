import React from 'react';
import Input from 'components/forms/Input';
import TextArea from 'components/forms/TextArea';
import DatePicker from 'components/forms/DatePicker';

const EventDetails = () => {
  return (
    <div className="card card-custom card-black card-form ">
      <div className="card-body col-md-10">
        <h4 className="card-title yellow">Event Details</h4>
        <form>
          <div className="form-row">
            <Input
              formGroupClassName="col-md-6"
              isValidMessage="looks good"
              label="Event Type"
              name="event.type"
              placeholder="E.g Wedding, Aniversary, Naming Ceremony"
            />
            <DatePicker
              formGroupClassName="col-md-6"
              isValidMessage="looks good"
              label="Event Date"
              name="event.date"
              placeholderText="Event Date"
            />
          </div>
          <div className="form-row">
            <DatePicker
              dateFormat="h:mm aa"
              formGroupClassName="col-md-6"
              isValidMessage="looks good"
              label="Start Time"
              name="event.start_time"
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
              name="event.end_time"
              placeholderText="End Time"
              showTimeSelect
              showTimeSelectOnly
              timeCaption="End Time"
              timeIntervals={30}
            />
          </div>
          <TextArea
            label="More Information"
            name="event.information"
            placeholder="More information about your event"
            rows="8"
          />
        </form>
      </div>
    </div>
  );
};

export default EventDetails;
