import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Header from 'components/common/layout/Header';
import Humanize from 'humanize-plus';
import TopBar from 'components/common/layout/TopBar';

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
          {!isDashboard && (
            <p className="card-subtitle">
              DUV LIVE &nbsp;/ &nbsp;{subtitle || title}
            </p>
          )}
        </div>
      </div>
    </div>
  </section>
);

LandingSection.propTypes = {
  isDashboard: PropTypes.bool,
  showSidebar: PropTypes.func,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired
};

LandingSection.defaultProps = {
  isDashboard: false,
  subtitle: null,
  showSidebar: () => {}
};
export default LandingSection;
