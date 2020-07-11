import React from 'react';
import PropTypes from 'prop-types';
import Stars from 'components/common/utils/Stars';
import Image from 'components/common/utils/Image';
import { commaNumber, getAverageRatings } from 'utils/helpers';

const EntertainersSearchResult = ({
  entertainers,
  searchTerm,
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
              searchTerm={searchTerm}
              selectedSearchedEntertainer={selectedSearchedEntertainer}
            />
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

EntertainersSearchResult.defaultProps = {
  searchTerm: '',
  title: null,
};

EntertainersSearchResult.propTypes = {
  entertainers: PropTypes.array.isRequired,
  searchTerm: PropTypes.string,
  selectedSearchedEntertainer: PropTypes.func.isRequired,
  title: PropTypes.string,
};

EntertainersSearchResult.Card = ({
  entertainer,
  searchTerm,
  selectedSearchedEntertainer,
}) => {
  return (
    <tr>
      <td>
        <Image
          className="avatar--medium--small"
          name={entertainer.stageName}
          responsiveImage={false}
          src={entertainer.profileImageURL}
        />
      </td>
      <td>
        <span className="text-muted small--4">Stage name</span>{' '}
        {formatSearchTerm(entertainer.stageName, searchTerm)}
      </td>
      <td>
        <span className="text-muted small--4">Type</span>{' '}
        {entertainer.entertainerType}
      </td>
      <td className="align-middle text-gray">
        <span className="text-muted small--4">Location</span>{' '}
        {entertainer.location}
      </td>
      <td className="align-middle text-gray">
        <span className="text-muted small--4">Ratings</span>{' '}
        {getAverageRatings(entertainer.ratings) > 0 ? (
          <Stars
            name={entertainer.stageName}
            rating={getAverageRatings(entertainer.ratings)}
          />
        ) : (
          <> No Ratings Yet</>
        )}
      </td>
      <td className="align-middle text-gray">
        <span className="text-muted small--4">Charges</span>{' '}
        {commaNumber(entertainer.baseCharges)} -{' '}
        {commaNumber(entertainer.preferredCharges)}
      </td>
      <td className="align-middle text-gray">
        <a
          className="btn btn-info btn-sm btn-transparent"
          href={`/entertainers/profile/${entertainer.slug}`}
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
};

EntertainersSearchResult.Card.propTypes = {
  entertainer: PropTypes.object.isRequired,
  searchTerm: PropTypes.string.isRequired,
  selectedSearchedEntertainer: PropTypes.func.isRequired,
};

const formatSearchTerm = (text, filterValue) => {
  const reg = new RegExp(`(${filterValue})`, 'gi');
  const textParts = text.split(reg);
  return (
    <>
      {textParts.map((part, index) =>
        part.match(reg) ? (
          <b className="text-danger" key={index}>
            {part}
          </b>
        ) : (
          part
        )
      )}
    </>
  );
};
export default EntertainersSearchResult;
