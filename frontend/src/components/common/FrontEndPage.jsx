import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';
import Humanize from 'humanize-plus';

const FrontEndPage = ({ title, subtitle, children }) => (
  <Fragment>
    <section className="landing">
      <div className="card card__menu bg-dark text-white">
        <Header />
        <div className="card-img-overlay">
          <div className="card-img-overlay__content">
            <h2 className="card-title">
              {title && Humanize.capitalize(title)}
            </h2>
            <p className="card-subtitle text-uppercase">
              DUV LIVE &nbsp;/ &nbsp;{subtitle || title}
            </p>
          </div>
        </div>
      </div>
    </section>
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
