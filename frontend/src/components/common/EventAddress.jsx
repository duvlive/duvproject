import React from 'react';

const EventAddress = () => (
  <div className="card card-custom  card__no-hover  card-black card-form">
    <div className="card-body col-md-10">
      <h4 className="card-title blue">Event Address</h4>
      <form>
        <div className="form-group">
          <label htmlFor="inputEmail4">Street Line 1</label>
          <input
            className="form-control"
            placeholder="Street Line 1"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputEmail4">Street Line 2</label>
          <input
            className="form-control"
            placeholder="Street Line 2"
            type="text"
          />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">LGA</label>
            <input className="form-control" placeholder="LGA" type="text" />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputPassword4">Landmark</label>
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
            <label htmlFor="inputEmail4">Location</label>
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

export default EventAddress;
