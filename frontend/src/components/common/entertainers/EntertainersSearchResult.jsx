import React from 'react';
import PropTypes from 'prop-types';
import Stars from 'components/common/utils/Stars';
import bids from 'data/events/bids';
// import DuvLiveModal from 'components/custom/Modal';
import Image from 'components/common/utils/Image';
import { Accordion, Card } from 'react-bootstrap';

const EntertainersSearchResult = () => (
  <section className="entertainerssearchresult col-md-9">
    <div className="pl-3">
      <h4 className="main-app__subtitle">3 entertainers found</h4>
      <div className="row">
        <div className="table-responsive">
          <table className="table table-dark table__no-border table__with-bg">
            <EntertainersSearchResult.Card {...bids[0]} />
            <EntertainersSearchResult.Card {...bids[1]} />
            <EntertainersSearchResult.Card {...bids[2]} />
            <EntertainersSearchResult.Card {...bids[3]} />
            <EntertainersSearchResult.Card {...bids[4]} />
          </table>
        </div>
      </div>
    </div>
  </section>
);

EntertainersSearchResult.Card = ({ price, entertainer, cardsPerRow }) => (
  <tr>
    {/* <th className="table__number" scope="row">
      {twoDigitNumber(number)}
    </th> */}
    <td>
      <Image
        className="avatar--medium-small"
        name={entertainer.stageName || 'No name'}
        responsiveImage={false}
        src={entertainer.img.profile || 'No src'}
      />
    </td>
    <td>
      <span className="text-muted small--4">Stage name</span>{' '}
      {entertainer.stageName}
    </td>
    <td>
      <span className="text-muted small--4">Ratings</span>{' '}
      <Stars
        name={entertainer.stageName}
        rating={entertainer.ratings.average}
      />
    </td>
    <td className="align-middle text-gray">
      <span className="text-muted small--4">Location</span>{' '}
      {entertainer.location}
    </td>
  </tr>
  // <div className={`col-sm-${12 / cardsPerRow}`}>
  //   <div className="card card-custom card-tiles card-blue text-center">
  //     <div className="card-body">
  //       <Image
  //         className="avatar--large"
  //         name={entertainer.stageName}
  //         src={entertainer.img.profile}
  //       />
  //       <div className="card-subtitle card-subtitle--3 mt-2 mb-0 gray">
  //         {entertainer.stageName}
  //       </div>
  //       <Stars
  //         name={entertainer.stageName}
  //         rating={entertainer.ratings.average}
  //       />
  //       <h4 className="card-subtitle--1 white mt-4 mb-0">N{price}</h4>
  //     </div>
  //     <div className="card-footer">
  //       <DuvLiveModal.ViewEntertainerProfile entertainer={entertainer} />
  //       &nbsp; &nbsp;
  //       <button className="btn btn-success btn-sm btn-transparent">
  //         Select Entertainer
  //       </button>
  //     </div>
  //   </div>
  // </div>
);

EntertainersSearchResult.Card.propTypes = {
  cardsPerRow: PropTypes.number.isRequired,
  entertainer: PropTypes.object.isRequired,
  price: PropTypes.string.isRequired
};

export default EntertainersSearchResult;
