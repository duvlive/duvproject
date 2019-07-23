import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Header from 'components/common/Header';
import Humanize from 'humanize-plus';
import TopBar from 'components/common/TopBar';

const LandingSection = ({ showSidebar, isDashboard, title, subtitle }) => (
  <section className="landing">
    <div
      className={classNames(
        'card bg-dark text-white',
        {
          card__dashboard: isDashboard
        },
        {
          card__menu: !isDashboard
        }
      )}
    >
      {isDashboard ? <TopBar showSidebar={showSidebar} /> : <Header />}
      <div className="card-img-overlay">
        <div className="card-img-overlay__content">
          <h2 className="card-title">{title && Humanize.capitalize(title)}</h2>
          <p className="card-subtitle">
            DUV LIVE &nbsp;/ &nbsp;{subtitle || title}
          </p>
        </div>
      </div>
    </div>
  </section>
);

LandingSection.propTypes = {
  isDashboard: PropTypes.bool,
  showSidebar: PropTypes.bool,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired
};

LandingSection.defaultProps = {
  isDashboard: false,
  showSidebar: false,
  subtitle: null
};
export default LandingSection;
