import React from 'react';
import Card from 'components/custom/Card';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

const DashboardCard = ({ icon, number, summary, title, to }) => (
  <Link to={to}>
    <Card className="dashboard__card col-sm-4" hover>
      <h4 classname="dashboard__card__title">{title}</h4>
      <h5 classname="dashboard__card--number pt-4 mb-0">{number}</h5>
      <small classname="dashboard__card--summary">{summary}</small>
      <span classname="dashboard__card--icon">
        <span className={`icon-${icon}`}></span>
      </span>
    </Card>
  </Link>
);

DashboardCard.propTypes = {
  icon: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
};

export default DashboardCard;

{
  /* <DashboardCard
icon="users"
number="07"
summary="Testing the caard"
title="Welcome"
to="/user/auctions"
/> */
}
