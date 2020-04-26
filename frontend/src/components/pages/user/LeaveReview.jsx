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

const LeaveReview = () => {
  const [loading, setLoading] = React.useState(true);
  const [pendingReviews, setPendingReviews] = React.useState([]);
  React.useEffect(() => {
    setLoading(true);
    axios
      .get('/api/v1/user/reviews/pending/date', {
        headers: {
          'x-access-token': getTokenFromStore(),
        },
      })
      .then(function (response) {
        const { status, data } = response;
        // handle success
        if (status === 200) {
          setPendingReviews(data.info);
        }
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        // navigate to all events
        setLoading(false);
      });
  }, []);

  return (
    <BackEndPage title="Leave A Review">
      <div className="main-app">
        <TopMessage message="Leave A Review" />

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
              ) : pendingReviews.length > 0 ? (
                <LeaveReview.CardLists pendingReviews={pendingReviews} />
              ) : (
                <>
                  <div className="col-sm-12">
                    <NoContent text="No pending reviews found" />
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

LeaveReview.CardLists = ({ pendingReviews }) => {
  const colors = ['blue', 'red', 'green', 'black', 'yellow'];
  return pendingReviews.map((info, index) => (
    <LeaveReview.Card color={colors[index % 4]} info={info} key={index} />
  ));
};

LeaveReview.CardLists.propTypes = {
  pendingReviews: PropTypes.array.isRequired,
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

export default LeaveReview;
