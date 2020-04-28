import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import { Formik, Form } from 'formik';
import { createSchema } from 'components/forms/schema/schema-helpers';
import {
  setInitialValues,
  DisplayFormikState,
} from 'components/forms/form-helper';
import Button from 'components/forms/Button';
import TextArea from 'components/forms/TextArea';
import RatingsField from 'components/forms/RatingsField';
import { reviewSchema } from 'components/forms/schema/eventSchema';
import { getTokenFromStore } from 'utils/localStorage';
import LoadingScreen from 'components/common/layout/LoadingScreen';
import { getShortDate } from 'utils/date-helpers';
import { navigate } from '@reach/router';

const ReviewEntertainer = ({ eventEntertainerId }) => {
  const [eventEntertainer, setEventEntertainer] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    eventEntertainerId &&
      axios
        .get(`/api/v1/eventEntertainer/${eventEntertainerId}`, {
          headers: {
            'x-access-token': getTokenFromStore(),
          },
        })
        .then(function (response) {
          const { status, data } = response;
          // handle success
          if (status === 200) {
            setEventEntertainer(data.eventEntertainerInfo);
            setLoading(false);
          }
        })
        .catch(function (error) {
          setLoading(false);
        });
  }, [eventEntertainerId]);
  return (
    <BackEndPage title="Leave a Review">
      <div className="main-app">
        <TopMessage message={loading ? '' : eventEntertainer.event.eventType} />
        <section className="app-content">
          {loading ? (
            <LoadingScreen text="Loading Event Details" />
          ) : (
            <LeaveAReviewForm
              entertainer={eventEntertainer.entertainer}
              event={eventEntertainer.event}
              eventEntertainerId={eventEntertainerId}
              eventRating={eventEntertainer.eventRating || {}}
            />
          )}
        </section>
      </div>
    </BackEndPage>
  );
};

ReviewEntertainer.propTypes = {
  eventEntertainerId: PropTypes.any,
};
ReviewEntertainer.defaultProps = {
  eventEntertainerId: '',
};

const LeaveAReviewForm = ({
  entertainer,
  event,
  eventEntertainerId,
  eventRating,
}) => {
  return (
    <Formik
      initialValues={setInitialValues(reviewSchema, eventRating)}
      onSubmit={(values, actions) => {
        let payload = {
          entertainerId: entertainer.id,
          eventEntertainerId: eventEntertainerId,
          ...values,
        };

        if (eventRating && eventRating.id) {
          payload.id = eventRating.id;
        }
        console.log('payload', payload);
        axios
          .post('/api/v1/rating', payload, {
            headers: { 'x-access-token': getTokenFromStore() },
          })
          .then(function (response) {
            const { status } = response;
            if (status === 200) {
              navigate('/user/review/success');
              actions.setSubmitting(false);
            }
          })
          .catch(function (error) {
            // setMessage(error.response.data.message);
            actions.setSubmitting(false);
          });
      }}
      render={({ isSubmitting, handleSubmit, ...props }) => (
        <div className="card card-custom card-black card-form ">
          <div className="card-body col-md-10">
            <h4 className="card-title text-yellow">Leave a Review</h4>
            <div className="text-center mb-5">
              <img
                alt={entertainer.stageName}
                className="rounded-circle img-thumbnail img-responsive avatar--large"
                src={entertainer.personalDetails.profileImageURL}
                title={entertainer.stageName}
              />{' '}
              <h5 className="card-subtitle card-subtitle--2 mt-3 mb-0 white">
                {entertainer.stageName}
              </h5>
              <small className="text-red card-subtitle--3">
                {entertainer.entertainerType} on {getShortDate(event.eventDate)}
              </small>
            </div>
            <Form>
              <div className="form-row">
                <RatingsField
                  formGroupClassName="col-md-6"
                  label="Professionalism"
                  name="professionalism"
                />
                <RatingsField
                  formGroupClassName="col-md-6"
                  label="Accommodating"
                  name="accommodating"
                />
              </div>
              <div className="form-row">
                <RatingsField
                  formGroupClassName="col-md-6"
                  label="Overall Talent"
                  name="overallTalent"
                />
                <RatingsField
                  formGroupClassName="col-md-6"
                  label="Recommend"
                  name="recommend"
                />
              </div>

              <TextArea
                label="Your Review"
                name="review"
                optional
                placeholder="Your Review (optional)"
                rows="5"
                type="textarea"
              />
              <Button
                className="btn-danger btn-lg btn-wide btn-transparent"
                loading={isSubmitting}
                onClick={handleSubmit}
              >
                Review Entertainer
              </Button>
              <DisplayFormikState hide {...props} />
            </Form>
          </div>
        </div>
      )}
      validationSchema={createSchema(reviewSchema)}
    />
  );
};

LeaveAReviewForm.propTypes = {
  entertainer: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  eventEntertainerId: PropTypes.any.isRequired,
  eventRating: PropTypes.object.isRequired,
};

export default ReviewEntertainer;
