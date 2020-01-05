import React from 'react';

const SearchEntertainerFields = () => {
  return (
    <div className="card card-custom card-black card-form col-sm-12 p-3">
      <div className="input-group mb-3">
        <input
          aria-describedby="basic-addon3"
          className="form-control col-sm-6"
          id="basic-url"
          placeholder="Entertainers Name or Stage Name"
          type="text"
        />
        <div class="input-group-append">
          <button className="btn btn-primary">Search</button>
        </div>
      </div>
    </div>
  );
};
export default SearchEntertainerFields;
