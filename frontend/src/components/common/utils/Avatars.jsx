import React from 'react';
import PropTypes from 'prop-types';

// [
//  {
// stageName,
// personalDetails.profileImageURL,
//   }
// ]

const Avatars = ({ entertainers, others }) => (
  <ul className="avatars">
    {entertainers &&
      entertainers.map(
        entertainer =>
          entertainer && (
            <Avatars.Item
              key={entertainer.stageName}
              name={entertainer.stageName}
              src={
                entertainer.personalDetails.profileImageURL ||
                entertainer.img.profile
              }
            />
          )
      )}
    {!!others && <Avatars.Others others={others} />}
  </ul>
);

Avatars.propTypes = {
  entertainers: PropTypes.array.isRequired,
  others: PropTypes.number
};

Avatars.defaultProps = {
  others: 0
};

Avatars.Item = ({ src, name }) => (
  <li className="avatars__item">
    <img alt={name} className="avatars__img" src={src} title={name} />
  </li>
);

Avatars.Item.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired
};

Avatars.Others = ({ others }) => (
  <li className="avatars__item">
    <div className="avatars__others">+{others}</div>
  </li>
);

Avatars.Others.propTypes = {
  others: PropTypes.number.isRequired
};

export default Avatars;
