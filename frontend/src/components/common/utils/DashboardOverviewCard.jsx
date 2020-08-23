import React from 'react';
import Card from 'components/custom/Card';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import WhiteLogo from 'assets/img/logo/white-white-logo-only.svg';
import { commaNumber } from 'utils/helpers';

const DashboardOverviewCard = ({ children, color, textLink, title, to }) => (
  <section className="d-block col-lg-4">
    <Card className="dashboard__card px-1">
      <h4
        className={`dashboard__card--title border-bottom text-${color} font-weight-bold px-1 pb-3 mb-0`}
      >
        {title}
      </h4>
      {children}
      <div className="mt-4 mb-2">
        <Link className="btn btn-link" to={to}>
          {textLink}
        </Link>
      </div>
    </Card>
  </section>
);

DashboardOverviewCard.propTypes = {
  children: PropTypes.any.isRequired,
  color: PropTypes.string.isRequired,
  textLink: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

DashboardOverviewCard.List = ({ color, icon, title, number }) => (
  <section className="py-4 border-bottom position-relative">
    <small className="text-muted-light-2">{title}</small>
    <div className="media">
      <div className="media-body">
        <h4 className={`text-${color} dashboard-overview__text pt-2 mt-0 mb-1`}>
          {number == null ? (
            <img
              alt="Duv Live White Logo"
              className="animated-logo"
              height="50"
              src={WhiteLogo}
            />
          ) : (
            commaNumber(number)
          )}
        </h4>
      </div>
      <span
        className={`text-muted icon-${icon} dashboard-overview__icon`}
      ></span>
    </div>
  </section>
);

DashboardOverviewCard.List.propTypes = {
  color: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  number: PropTypes.any,
  title: PropTypes.string.isRequired,
};

DashboardOverviewCard.List.defaultProps = {
  number: null,
};

export default DashboardOverviewCard;
