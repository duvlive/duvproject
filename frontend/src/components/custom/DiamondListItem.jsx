import React from 'react';
import PropTypes from 'prop-types';

const DiamondListItem = ({ icon, title, number, description }) => {
  return (
    <div className="diamond-list-item col-lg-4 col-md-6 mb-4">
      <div className="icon-box mb-3">
        <i className={`icon icon-${icon}`} />
      </div>
      <div className="description">
        <h5 className="mb-2">
          {number}. {title}
        </h5>
        <p>{description}</p>
      </div>
    </div>
  );
};

DiamondListItem.propTypes = {
  description: PropTypes.string.isRequired,
  icon: PropTypes.string,
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
};

DiamondListItem.defaultProps = {
  icon: null
};

DiamondListItem.List = ({ items }) =>
  items.map(({ title, description, icon }, index) => (
    <DiamondListItem
      description={description}
      icon={icon}
      key={index}
      number={index + 1}
      title={title}
    />
  ));

DiamondListItem.List.propTypes = {
  items: PropTypes.array.isRequired
};

export default DiamondListItem;
