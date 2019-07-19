import React from 'react';

const EventDetails = () => (
  <div className="card card-custom  card__no-hover  card-black card-form ">
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
            <input
              className="form-control"
              id="inputPassword4"
              placeholder="Event Date"
              type="text"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Start Time</label>
            <input
              className="form-control"
              placeholder="Start Time"
              type="text"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputPassword4">End Time</label>
            <input
              className="form-control"
              id="inputPassword4"
              placeholder="End Time"
              type="text"
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
              placeholder="Questions, Complaints or Suggestions"
              rows="4"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
);

export default EventDetails;
