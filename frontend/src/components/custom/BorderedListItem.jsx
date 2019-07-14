import React from 'react';

const BorderedListItem = ({ number, title, description }) => {
  return (
    <div className="bordered-list-item col-sm-4">
      <div className="bordered-list-item__container">
        <div className="bordered-list-item__number">{number}</div>
        <h4 className="bordered-list-item__title">{title}</h4>
        <p className="bordered-list-item__description">{description}</p>
      </div>
    </div>
  );
};

BorderedListItem.List = ({ items }) =>
  items.map(({ title, description }, index) => (
    <BorderedListItem
      description={description}
      key={index}
      number={`0${index + 1}`}
      title={title}
    />
  ));

export default BorderedListItem;
