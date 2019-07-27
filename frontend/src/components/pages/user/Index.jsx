import React from 'react';
import PropTypes from 'prop-types';

const Index = ({ children }) => <>{children}</>;

Index.propTypes = {
  children: PropTypes.node.isRequired
};

export default Index;
