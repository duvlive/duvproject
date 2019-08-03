import React, { useState } from 'react';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import AutoComplete from 'components/custom/AutoComplete';
import { RangeTooltip } from 'components/custom/SliderTooltip';
import Ratings from 'components/custom/Ratings';
import { FormGroup, Label, CustomInput, Form } from 'reactstrap';
import Switch from 'rc-switch';
import 'rc-switch/assets/index.css';

const AddEntertainer = () => {
  const [tags, setTags] = useState([]);
  const [primary, setPrimary] = useState(false);
  return (
    <div className="card card-custom card-black card-form">
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
                <option value="all">All</option>
                <option value="children">Children</option>
                <option value="adults">Adults</option>
                <option value="old">Old People</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Genre</label>
              <TagsInput
                onChange={tags => setTags(tags)}
                renderInput={AutoComplete}
                test="testing"
                value={tags}
              />
              {/* <input className="form-control" placeholder="Genre" type="text" /> */}
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
              <label htmlFor="inputEmail4">Expected Audience Size</label>
              <input
                className="form-control"
                placeholder="Expected Audience Size"
                type="text"
              />
            </div>
            <div className="form-group col-md-6 position-relative">
              <label htmlFor="inputPassword4">Budget</label>
              <RangeTooltip
                allowCross={false}
                className="mb-5"
                defaultValue={[800, 1200]}
                max={1500}
                min={500}
                pushable={100}
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
          <div className="form-row">
            <div className="form-group col-md-12 mt-5">
              <Ratings onRate={rating => {}} rating={0} total={5} /> <br />
              <Ratings interactive={false} rating={5} total={5} />
            </div>
          </div>
        </form>
        <Form>
          <FormGroup>
            <Label for="exCustomCheckbox">CheckBoxes</Label>
            <div>
              <CustomInput
                id="exCustomCheckbox"
                label="Check this custom checkbox"
                type="checkbox"
              />
              <CustomInput
                id="exCustomCheckbox2"
                label="Or this one"
                type="checkbox"
              />
              <CustomInput
                disabled
                id="exCustomCheckbox3"
                label="But not this disabled one"
                type="checkbox"
              />
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="exCustomRadio">Radios</Label>
            <div>
              <CustomInput
                id="exCustomRadio"
                label="Select this custom radio"
                name="customRadio"
                type="radio"
              />
              <CustomInput
                id="exCustomRadio2"
                label="Or this one"
                name="customRadio"
                type="radio"
              />
              <CustomInput
                disabled
                id="exCustomRadio3"
                label="But not this disabled one"
                type="radio"
              />
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="exCustomInline">Inline</Label>
            <div>
              <CustomInput
                id="exCustomInline"
                inline
                label="An inline custom input"
                type="checkbox"
              />
              <CustomInput
                id="exCustomInline2"
                inline
                label="and another one"
                type="checkbox"
              />
            </div>
            <div className="mt-5">
              <Switch
                checked={primary}
                className="custom-switch custom-switch-primary"
                onChange={primary => setPrimary(primary)}
              />
            </div>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
};

export default AddEntertainer;
