import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Footer from 'components/common/layout/Footer';
import LandingSection from './LandingSection';

const FrontEndPage = ({ title, subtitle, children }) => (
  <Fragment>
    <LandingSection subtitle={subtitle} title={title} />
    {children}
    <Footer />
  </Fragment>
);

FrontEndPage.propTypes = {
  children: PropTypes.node.isRequired,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired
};

FrontEndPage.defaultProps = {
  subtitle: null
};

export default FrontEndPage;
