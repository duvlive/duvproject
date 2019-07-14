import React from 'react';
import PropTypes from 'prop-types';

const Text = () => {
  return <div>Testing 123</div>;
};

Text.VerticalAlign = ({ children }) => (
  <div className="row h-100">
    <div className="col-sm-12 my-auto">{children}</div>
  </div>
);

Text.VerticalAlign.propTypes = {
  children: PropTypes.node.isRequired
};
export default Text;
