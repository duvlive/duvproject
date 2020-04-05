import React from 'react';
import PropTypes from 'prop-types';
import Stars from 'components/common/utils/Stars';
// import DuvLiveModal from 'components/custom/Modal';
import Image from 'components/common/utils/Image';
import Humanize from 'humanize-plus';
import { twoDigitNumber, commaNumber } from 'utils/helpers';
import { Link } from '@reach/router';

const EntertainersSearchResult = ({ entertainers, isSearchForm }) => (
  <section className="entertainerssearchresult col-md-9">
    <div className="pl-3">
      <h4 className="main-app__subtitle">
        {entertainers.length}{' '}
        {isSearchForm
          ? Humanize.pluralize(entertainers.length, 'entertainer')
          : Humanize.pluralize(entertainers.length, 'past entertainer')}{' '}
        found
      </h4>
      <div className="table-responsive">
        <table className="table table-dark table__no-border table__with-bg">
          <tbody>
            {entertainers.map((entertainer, index) => (
              <EntertainersSearchResult.Card
                entertainer={entertainer}
                key={index}
                number={index + 1}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

EntertainersSearchResult.propTypes = {
  entertainers: PropTypes.array.isRequired,
  isSearchForm: PropTypes.bool.isRequired,
};

EntertainersSearchResult.Card = ({ entertainer, number }) => (
  <tr>
    <th className="table__number" scope="row">
      {twoDigitNumber(number)}
    </th>
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
      <Link
        className="btn btn-success btn-sm btn-transparent"
        to={`/user/auction/bids/${entertainer.id}`}
      >
        Send Request
      </Link>
    </td>
  </tr>
);

EntertainersSearchResult.Card.propTypes = {
  entertainer: PropTypes.object.isRequired,
  number: PropTypes.number.isRequired,
};

export default EntertainersSearchResult;
