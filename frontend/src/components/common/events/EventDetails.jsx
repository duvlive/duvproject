import React from 'react';
import { OCCASSION_TYPE } from 'utils/constants';
import Input from 'components/forms/Input';
import Select from 'components/forms/Select';
import TextArea from 'components/forms/TextArea';
import DatePicker from 'components/forms/DatePicker';
import { addDays } from 'date-fns';

const EventDetails = () => {
  const [displayForm, setDisplayForm] = React.useState({ eventType: false });
  const toggleForm = value => {
    console.log('value', value);
    console.log('displayForm[value]: ', displayForm[value]);
    setDisplayForm({ [value]: !displayForm[value] });
  };
  return (
    <div className="card card-custom card-black card-form ">
      <div className="card-body col-md-10">
        <h4 className="card-title yellow">Event Details</h4>
        <form>
          <div className="form-row">
            {displayForm.eventType ? (
              <Input
                formGroupClassName="col-md-6"
                label="Event Type"
                labelLink={{
                  onClick: () => toggleForm('eventType'),
                  text: 'Select Event Type',
                  to: ''
                }}
                name="event.eventType"
                placeholder="Event Type"
              />
            ) : (
              <Select
                blankOption="Select Event Type"
                formGroupClassName="col-md-6"
                label="Event Type"
                labelLink={{
                  onClick: () => toggleForm('eventType'),
                  text: 'Type Manually',
                  to: ''
                }}
                name="event.eventType"
                options={OCCASSION_TYPE}
                placeholder="Event Type"
              />
            )}
            <DatePicker
              formGroupClassName="col-md-6"
              label="Event Date"
              minDate={addDays(new Date(), 4)}
              name="event.eventDate"
              placeholder="Event Date"
            />
          </div>
          <div className="form-row">
            <DatePicker
              dateFormat="h:mm aa"
              formGroupClassName="col-md-6"
              label="Start Time"
              name="event.startTime"
              placeholder="Approx. Start Time"
              showTimeSelect
              showTimeSelectOnly
              timeCaption="Start Time"
            />
            <DatePicker
              dateFormat="h:mm aa"
              formGroupClassName="col-md-6"
              label="End Time"
              name="event.endTime"
              placeholder="Approx. End Time"
              showTimeSelect
              showTimeSelectOnly
              timeCaption="End Time"
            />
          </div>
          <TextArea
            label="More Information"
            name="event.moreInformation"
            optional
            placeholder="More information about your event"
            rows="4"
          />
        </form>
      </div>
    </div>
  );
};

export default EventDetails;
