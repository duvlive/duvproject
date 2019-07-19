import React from 'react';

const AddEntertainer = () => (
  <div className="card card-custom  card__no-hover  card-black card-form">
    <div className="card-body col-md-10">
      <h4 className="card-title green">Add Entertainer </h4>
      <form>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Entertainer</label>
            <select className="form-control" id="location" name="location">
              <option value="dj">DJ</option>
              <option value="live-band">Live Band</option>
              <option value="mc">MC</option>
            </select>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Age Group</label>
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
            <label htmlFor="inputEmail4">Genre</label>
            <input className="form-control" placeholder="Genre" type="text" />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Preferred Language</label>
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
            <label htmlFor="inputEmail4">Lowest Budget</label>
            <input
              className="form-control"
              placeholder="Lowest Budget"
              type="text"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputPassword4">Highest Budget</label>
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
            <label htmlFor="message">Special Request</label>
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

export default AddEntertainer;
