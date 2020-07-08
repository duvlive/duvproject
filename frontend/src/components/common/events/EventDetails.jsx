import React from 'react';
import { OCCASSION_TYPE, START_TIME } from 'utils/constants';
import Input from 'components/forms/Input';
import Select from 'components/forms/Select';
import TextArea from 'components/forms/TextArea';
import DatePicker from 'components/forms/DatePicker';
import Humanize from 'humanize-plus';
import { addDays } from 'date-fns';

export const getEventDuration = () =>
  [...Array(24).keys()].map((index) => ({
    label: `${index + 1} ${Humanize.pluralize(index + 1, 'hour')}`,
    value: `${index + 1} hours`,
  }));

const EventDetails = () => {
  const EVENT_DURATION = getEventDuration();
  const [displayForm, setDisplayForm] = React.useState({ eventType: false });
  const toggleForm = (value) => {
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
                  to: '',
                }}
                name="event.eventType"
                placeholder="Type your Event Type"
              />
            ) : (
              <Select
                blankOption="Select Event Type"
                formGroupClassName="col-md-6"
                label="Event Type"
                labelLink={{
                  onClick: () => toggleForm('eventType'),
                  text: 'Type Manually',
                  to: '',
                }}
                name="event.eventType"
                options={OCCASSION_TYPE}
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
            <Select
              blankOption="Approx. Start Time"
              formGroupClassName="col-md-6"
              label="Start Time"
              name="event.startTime"
              options={START_TIME}
            />
            <Select
              blankOption="Select Duration"
              formGroupClassName="col-md-6"
              label="Duration of Event (Approx.)"
              name="event.eventDuration"
              options={EVENT_DURATION}
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
