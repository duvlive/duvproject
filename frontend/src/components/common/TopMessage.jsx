import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

const TopMessage = ({ message }) => (
  <section className="top_message">
    <div className="row">
      <div className="col-sm-6">
        <h3 className="main-app__title">{message}</h3>
      </div>
      <div className="col-sm-6 main-app__date text-right">
        {format(new Date(), 'dddd, Do MMMM YYYY')}
      </div>
    </div>
  </section>
);

TopMessage.propTypes = {
  message: PropTypes.string.isRequired
};
export default TopMessage;
