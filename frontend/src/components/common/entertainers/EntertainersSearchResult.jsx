import React from 'react';
import PropTypes from 'prop-types';
import Stars from 'components/common/utils/Stars';
// import DuvLiveModal from 'components/custom/Modal';
import Image from 'components/common/utils/Image';
import { commaNumber } from 'utils/helpers';

const EntertainersSearchResult = ({
  entertainers,
  selectedSearchedEntertainer,
  title,
}) => (
  <section className="entertainerssearchresult">
    <h4 className="main-app__subtitle">{title}</h4>
    <div className="table-responsive">
      <table className="table table-dark table__no-border table__with-bg">
        <tbody>
          {entertainers.map((entertainer, index) => (
            <EntertainersSearchResult.Card
              entertainer={entertainer}
              key={index}
              number={index + 1}
              selectedSearchedEntertainer={selectedSearchedEntertainer}
            />
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

EntertainersSearchResult.defaultProps = {
  title: null,
};

EntertainersSearchResult.propTypes = {
  entertainers: PropTypes.array.isRequired,
  selectedSearchedEntertainer: PropTypes.func.isRequired,
  title: PropTypes.string,
};

EntertainersSearchResult.Card = ({
  entertainer,
  number,
  selectedSearchedEntertainer,
}) => (
  <tr>
    {/* <th className="table__number" scope="row">
      {twoDigitNumber(number)}
    </th> */}
    <td>
      <Image
        className="avatar--medium-small"
        name={entertainer.stageName}
        responsiveImage={false}
        src={entertainer.profileImageURL}
      />
    </td>
    <td>
      <span className="text-muted small--4">Stage name</span>{' '}
      {entertainer.stageName}
    </td>
    <td>
      <span className="text-muted small--4">Type</span>{' '}
      {entertainer.entertainerType}
    </td>
    <td className="align-middle text-gray">
      <span className="text-muted small--4">Location</span>{' '}
      {entertainer.location}
    </td>
    <td>
      <span className="text-muted small--4">Ratings</span>{' '}
      <Stars name={entertainer.stageName} rating={4.5} />
    </td>
    <td>
      <span className="text-muted small--4">Charges</span>{' '}
      {commaNumber(entertainer.baseCharges)} -{' '}
      {commaNumber(entertainer.preferredCharges)}
    </td>
    <td>
      <a
        className="btn btn-info btn-sm btn-transparent"
        href={`/entertainers/${entertainer.slug}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        Profile
      </a>
      &nbsp;&nbsp;
      <button
        className="btn btn-success btn-sm btn-transparent"
        onClick={() => selectedSearchedEntertainer(entertainer)}
      >
        Select
      </button>
    </td>
  </tr>
);

EntertainersSearchResult.Card.propTypes = {
  entertainer: PropTypes.object.isRequired,
  number: PropTypes.number.isRequired,
  selectedSearchedEntertainer: PropTypes.func.isRequired,
};

export default EntertainersSearchResult;
