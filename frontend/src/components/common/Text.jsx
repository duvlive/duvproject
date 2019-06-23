import React from 'react';

const Text = () => {
  return <div>Testing 123</div>;
};

Text.VerticalAlign = ({ children }) => (
  <div className="row h-100">
    <div className="col-sm-12 my-auto">{children}</div>
  </div>
);

export default Text;
