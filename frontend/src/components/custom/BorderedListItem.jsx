import React from 'react';
import PropTypes from 'prop-types';

const BorderedListItem = ({ icon, number, title, description }) => {
  return (
    <div className="bordered-list-item col-lg-4 col-md-6">
      <div className="bordered-list-item__container">
        <div className="bordered-list-item__number">
          {icon && <span className={`icon icon-${icon}`} />}
          {!icon && number}
        </div>
        <h4 className="bordered-list-item__title">{title}</h4>
        <p className="bordered-list-item__description">{description}</p>
      </div>
    </div>
  );
};

BorderedListItem.propTypes = {
  description: PropTypes.string.isRequired,
  icon: PropTypes.string,
  number: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

BorderedListItem.defaultProps = {
  icon: null
};

BorderedListItem.List = ({ items }) =>
  items.map(({ title, description, icon }, index) => (
    <BorderedListItem
      description={description}
      icon={icon}
      key={index}
      number={`0${index + 1}`}
      title={title}
    />
  ));

BorderedListItem.List.propTypes = {
  items: PropTypes.array.isRequired
};

export default BorderedListItem;
