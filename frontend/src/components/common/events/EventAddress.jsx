import React from 'react';
import Input from 'components/forms/Input';
import { getStates, getLgas } from 'data/naija-states-and-lgas';
import Select from 'components/forms/Select';
import DynamicSelect from 'components/forms/DynamicSelect';
import TextArea from 'components/forms/TextArea';

const EventAddress = () => (
  <div className="card card-custom card-black card-form">
    <div className="card-body col-md-10">
      <h4 className="card-title blue">Event Address</h4>
      <form>
        <Input
          label="Street Line 1"
          name="address.streetLine1"
          placeholder="Street Line 1"
        />
        <Input
          label="Street Line 2"
          name="address.streetLine2"
          optional
          placeholder="Street Line 2"
        />
        <div className="form-row">
          <Select
            blankOption="Select State"
            formGroupClassName="col-md-6"
            label="State"
            name="address.state"
            options={getStates()}
            placeholder="State"
          />
          <DynamicSelect
            blankOption="Select Local Government"
            dependentOn="address.state"
            formGroupClassName="col-md-6"
            label="LGA"
            name="address.lga"
            options={getLgas}
            placeholder="Local Goverment"
          />
        </div>
        <div className="form-row">
          <Input
            formGroupClassName="col-md-6"
            label="City"
            name="address.city"
            placeholder="City"
          />
          <Input
            formGroupClassName="col-md-6"
            label="Landmark"
            name="address.landmark"
            optional
            placeholder="Landmark"
          />
        </div>
        <TextArea
          label="Description"
          name="address.description"
          optional
          placeholder="Enter more description here to make locating your address easier"
          rows="3"
        />
      </form>
    </div>
  </div>
);

export default EventAddress;
