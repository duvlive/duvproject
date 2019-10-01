import React from 'react';
import Card from 'components/custom/Card';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

const DashboardCard = ({ color, icon, number, summary, title, to }) => (
  <Link className="d-block col-sm-4" to={to}>
    <Card className="dashboard__card" hover>
      <h4 className="dashboard__card--title">{title}</h4>
      <h5 className={`dashboard__card--number pt-4 mb-0 ${color}`}>{number}</h5>
      <small className={`dashboard__card--summary ${color}`}>{summary}</small>
      <span className="dashboard__card--icon">
        <span className={`icon-${icon}`}></span>
      </span>
    </Card>
  </Link>
);

DashboardCard.propTypes = {
  color: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
};

export default DashboardCard;
