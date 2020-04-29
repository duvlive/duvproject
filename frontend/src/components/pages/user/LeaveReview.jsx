import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import { getTokenFromStore } from 'utils/localStorage';
import { getShortDate } from 'utils/date-helpers';
import { Link, Match } from '@reach/router';
import LoadingScreen from 'components/common/layout/LoadingScreen';
import NoContent from 'components/common/utils/NoContent';
import AlertMessage from 'components/common/utils/AlertMessage';
import { twoDigitNumber } from 'utils/helpers';
import Image from 'components/common/utils/Image';
import Stars from 'components/common/utils/Stars';
import DuvLiveModal from 'components/custom/Modal';

const LeaveReview = () => {
  const [loading, setLoading] = React.useState(true);
  const [reviews, setReviews] = React.useState([]);
  React.useEffect(() => {
    setLoading(true);
    axios
      .get('/api/v1/user/reviews/all', {
        headers: {
          'x-access-token': getTokenFromStore(),
        },
      })
      .then(function (response) {
        const { status, data } = response;
        // handle success
        if (status === 200) {
          setReviews(data.info);
        }
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        // navigate to all events
        setLoading(false);
      });
  }, []);

  const sortedReviews = reviews.reduce(
    (result, review) => {
      if (review.eventRating === null) {
        result.pending.push(review);
      } else {
        result.reviewed.push(review);
      }
      return result;
    },
    { pending: [], reviewed: [] }
  );

  return (
    <BackEndPage title="Leave A Review">
      <div className="main-app">
        <TopMessage message="Your Reviews" />

        <section className="app-content">
          <section className="leaveReview">
            <Match path={`/user/review/success`}>
              {(props) =>
                // eslint-disable-next-line react/prop-types
                props.match && (
                  <div className="mt-3 mb-4">
                    <AlertMessage
                      message="Your review has been successfully submitted"
                      type="success"
                    />
                  </div>
                )
              }
            </Match>
            <div className="row">
              {loading ? (
                <LoadingScreen loading={loading} text="Loading..." />
              ) : reviews.length > 0 ? (
                <>
                  <LeaveReview.CardLists reviews={sortedReviews.pending} />
                  <ReviewedEntertainersTable
                    reviewedEntertainers={sortedReviews.reviewed}
                  />
                </>
              ) : (
                <>
                  <div className="col-sm-12">
                    <NoContent text="You have not reviewed any entertainer" />
                  </div>
                </>
              )}
            </div>
          </section>
        </section>
      </div>
    </BackEndPage>
  );
};

LeaveReview.CardLists = ({ reviews }) => {
  const colors = ['blue', 'red', 'green', 'black', 'yellow'];
  return reviews.map((info, index) => (
    <LeaveReview.Card color={colors[index % 4]} info={info} key={index} />
  ));
};

LeaveReview.CardLists.propTypes = {
  reviews: PropTypes.array.isRequired,
};

LeaveReview.Card = ({ info, color }) => (
  <div className="col-lg-4 col-md-8 offset-md-2 offset-lg-0">
    <div className="card card-custom">
      <div className="card-body">
        <h5 className={`card-title text-${color} header__with-border`}>
          {info.event.eventType}
        </h5>

        <div className="text-center">
          <img
            alt={info.entertainer.stageName}
            className="rounded-circle img-thumbnail img-responsive avatar--large"
            src={info.entertainer.personalDetails.profileImageURL}
            title={info.entertainer.stageName}
          />{' '}
          <h5 className="card-subtitle card-subtitle--2 mt-3 mb-0 white">
            {info.entertainer.stageName}
          </h5>
          <small className="card-subtitle--3 text-muted">
            {info.entertainer.entertainerType} at {info.event.eventType} on{' '}
            {getShortDate(info.event.eventDate)}
          </small>
          <div className="mt-3">
            <Link
              className="btn btn-danger btn-wide btn-transparent"
              to={`/user/review-entertainer/${info.id}`}
            >
              Rate Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

LeaveReview.Card.propTypes = {
  color: PropTypes.string.isRequired,
  info: PropTypes.object.isRequired,
};

const viewReview = (entertainer, event, eventRating) => (
  <>
    <div className="text-center">
      <Image
        bordered
        className="avatar--large"
        name={entertainer.stageName}
        responsiveImage={false}
        src={entertainer.personalDetails.profileImageURL}
      />
      <h6 className="font-weight-normal mt-2 text-white">
        {entertainer.stageName}
      </h6>
      <small className="text-muted">
        {entertainer.entertainerType} at {event.eventType}
      </small>
    </div>

    <div className="row text-muted mt-2 mb-2">
      <div className="col-sm-6">
        <small>Professionalism</small>
        <span className="text-muted-light-2">
          <Stars name="Professionalism" rating={eventRating.professionalism} />
        </span>
      </div>
      <div className="col-sm-6">
        <small>Accomodating</small>
        <span className="text-muted-light-2">
          <Stars name="Accomdating" rating={eventRating.accommodating} />
        </span>
      </div>
    </div>

    <div className="row text-muted mt-2 mb-2">
      <div className="col-sm-6">
        <small>Overall Talent</small>
        <span className="text-muted-light-2">
          <Stars name="OverallTalent" rating={eventRating.overallTalent} />
        </span>
      </div>
      <div className="col-sm-6">
        <small>Recommend</small>
        <span className="text-muted-light-2">
          <Stars name="Recommend" rating={eventRating.recommend} />
        </span>
      </div>
    </div>

    <div className="small--2 mt-4 text-muted-light">
      <hr />
      {eventRating.review}
    </div>
  </>
);

const ReviewedEntertainersTable = ({ reviewedEntertainers }) => (
  <div className="table-responsive">
    <table className="table table-dark table__no-border table__with-bg">
      <tbody>
        {reviewedEntertainers.map((review, index) => (
          <ReviewedEntertainersRow
            entertainer={review.entertainer}
            event={review.event}
            eventEntertainerId={review.id}
            eventRating={review.eventRating}
            key={index}
            number={index + 1}
            placeOfEvent={review.placeOfEvent}
          />
        ))}
      </tbody>
    </table>
  </div>
);

ReviewedEntertainersTable.propTypes = {
  reviewedEntertainers: PropTypes.array.isRequired,
};

const ReviewedEntertainersRow = ({
  entertainer,
  event,
  eventEntertainerId,
  eventRating,
  number,
  placeOfEvent,
}) => (
  <tr>
    <th className="table__number" scope="row">
      {twoDigitNumber(number)}
    </th>
    <td className="align-middle">
      <Image
        className="avatar--medium--small"
        name={entertainer.stageName}
        responsiveImage={false}
        src={entertainer.personalDetails.profileImageURL}
      />
    </td>
    <td className="align-middle text-gray">
      <span className="text-muted small--4">Stage name</span>{' '}
      {entertainer.stageName}
    </td>
    <td className="align-middle">
      <span className="text-muted small--4">Type</span>
      <span className="">{entertainer.entertainerType}</span>
    </td>
    <td className="align-middle">
      <span className="text-muted small--4">Event</span>
      <span className="">{event.eventType}</span>
    </td>
    <td className="align-middle">
      <span className="text-muted small--4">Place of Event</span>
      <span className="">{placeOfEvent}</span>
    </td>
    <td className="align-middle text-white td-btn">
      <span className="text-muted small--4">Average Ratings</span>{' '}
      <Stars
        name="Average Ratings"
        rating={Math.round(
          (eventRating.professionalism +
            eventRating.accommodating +
            eventRating.overallTalent +
            eventRating.recommend) /
            4
        )}
      />
    </td>

    <td className="pt-4">
      <DuvLiveModal
        body={viewReview(entertainer, event, eventRating)}
        closeModalText="Cancel"
        title="View Reviews"
      >
        <button className="btn btn-info btn-sm btn-transparent">
          View Review
        </button>
      </DuvLiveModal>
      &nbsp;&nbsp;
      <Link
        className="btn btn-danger btn-sm btn-transparent"
        to={`/user/review-entertainer/${eventEntertainerId}`}
      >
        Edit Review
      </Link>
    </td>
  </tr>
);

ReviewedEntertainersRow.propTypes = {
  entertainer: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  eventEntertainerId: PropTypes.string.isRequired,
  eventRating: PropTypes.object.isRequired,
  number: PropTypes.number.isRequired,
  placeOfEvent: PropTypes.string.isRequired,
};

export default LeaveReview;
