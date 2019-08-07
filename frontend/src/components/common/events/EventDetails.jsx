import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

const EventDetails = () => {
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  return (
    <div className="card card-custom card-black card-form ">
      <div className="card-body col-md-10">
        <h4 className="card-title yellow">Event Details</h4>
        <form>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Event Type</label>
              <input
                className="form-control"
                placeholder="Event Type"
                type="text"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">Event Date</label>
              <DatePicker
                className="form-control"
                onChange={date => setStartDate(date)}
                placeholderText="Event Date"
                selected={startDate}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Start Time</label>
              <DatePicker
                className="form-control"
                dateFormat="h:mm aa"
                onChange={time => setStartTime(time)}
                selected={startTime}
                showTimeSelect
                showTimeSelectOnly
                timeCaption="Start Time"
                timeIntervals={30}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">End Time</label>
              <DatePicker
                className="form-control"
                dateFormat="h:mm aa"
                onChange={time => setEndTime(time)}
                selected={endTime}
                showTimeSelect
                showTimeSelectOnly
                timeCaption="Start Time"
                timeIntervals={30}
              />
            </div>
          </div>
          <div className="form-row mb-4">
            <div className="form-group col-md-12">
              <label htmlFor="message">More Information</label>
              <textarea
                className="form-control"
                id="message"
                name="message"
                placeholder="More information about your event"
                rows="4"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventDetails;
