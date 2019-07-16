import React from 'react';
import TopMessage from 'components/common/TopMessage';

const NewEvent = () => {
  return (
    <div className="main-app">
      <TopMessage message="Hire an Entertainer (AUCTION)" />

      <section className="app-content">
        <NewEvent.EventDetails />
        <NewEvent.EventAddress />
        <NewEvent.AddEntertainer />
        <NewEvent.Action />
      </section>
    </div>
  );
};

NewEvent.EventDetails = () => (
  <div className="card card-custom  card__no-hover  card-black card-form ">
    <div className="card-body col-md-10">
      <h4 className="card-title yellow">Event Details</h4>
      <form>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label for="inputEmail4">Event Type</label>
            <input
              className="form-control"
              placeholder="Event Type"
              type="text"
            />
          </div>
          <div className="form-group col-md-6">
            <label for="inputPassword4">Event Date</label>
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
            <label for="inputEmail4">Start Time</label>
            <input
              className="form-control"
              placeholder="Start Time"
              type="text"
            />
          </div>
          <div className="form-group col-md-6">
            <label for="inputPassword4">End Time</label>
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
            <label for="message">More Information</label>
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

NewEvent.EventAddress = () => (
  <div className="card card-custom  card__no-hover  card-black card-form">
    <div className="card-body col-md-10">
      <h4 className="card-title blue">Event Address</h4>
      <form>
        <div className="form-group">
          <label for="inputEmail4">Street Line 1</label>
          <input
            className="form-control"
            placeholder="Street Line 1"
            type="text"
          />
        </div>
        <div className="form-group">
          <label for="inputEmail4">Street Line 2</label>
          <input
            className="form-control"
            placeholder="Street Line 2"
            type="text"
          />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label for="inputEmail4">LGA</label>
            <input className="form-control" placeholder="LGA" type="text" />
          </div>
          <div className="form-group col-md-6">
            <label for="inputPassword4">Landmark</label>
            <input
              className="form-control"
              id="inputPassword4"
              placeholder="Enter Landmark"
              type="text"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label for="inputEmail4">Location</label>
            <select className="form-control" id="location" name="location">
              <option value="lagos">Lagos State</option>
              <option value="ogun">Ogun State</option>
              <option value="oyo">Oyo State</option>
            </select>
          </div>
          <div className="form-group col-md-6" />
        </div>
      </form>
    </div>
  </div>
);

NewEvent.AddEntertainer = () => (
  <div className="card card-custom  card__no-hover  card-black card-form">
    <div className="card-body col-md-10">
      <h4 className="card-title green">Add Entertainer </h4>
      <form>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label for="inputEmail4">Entertainer</label>
            <select className="form-control" id="location" name="location">
              <option value="dj">DJ</option>
              <option value="live-band">Live Band</option>
              <option value="mc">MC</option>
            </select>
          </div>
          <div className="form-group col-md-6">
            <label for="inputEmail4">Age Group</label>
            <select className="form-control" id="location" name="location">
              <option value="dj">Children</option>
              <option value="live-band">Adults</option>
              <option value="mc">Old People</option>
              <option value="mc">Everyone</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label for="inputEmail4">Genre</label>
            <input className="form-control" placeholder="Genre" type="text" />
          </div>
          <div className="form-group col-md-6">
            <label for="inputEmail4">Preferred Language</label>
            <select className="form-control" id="location" name="location">
              <option value="dj">None</option>
              <option value="live-band">Yoruba</option>
              <option value="mc">Hausa</option>
              <option value="mc">Igbo</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label for="inputEmail4">Lowest Budget</label>
            <input
              className="form-control"
              placeholder="Lowest Budget"
              type="text"
            />
          </div>
          <div className="form-group col-md-6">
            <label for="inputPassword4">Highest Budget</label>
            <input
              className="form-control"
              id="inputPassword4"
              placeholder="Highest Budget"
              type="text"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-12">
            <label for="message">Special Request</label>
            <textarea
              className="form-control"
              id="message"
              name="message"
              placeholder="E.g 10 special songs, your favorite song e.t.c."
              rows="8"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
);

NewEvent.Action = () => (
  <div className="mt-5">
    <button
      className="btn btn-transparent btn-primary text-right btn-lg"
      type="submit"
    >
      Start Auction
    </button>
  </div>
);

export default NewEvent;
