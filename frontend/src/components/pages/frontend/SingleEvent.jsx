import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Row, Col } from 'reactstrap';
import FrontEndPage from 'components/common/layout/FrontEndPage';
import Events from 'components/common/events/Events';
import Image from 'components/common/utils/Image';
import { Link } from '@reach/router';
import LoadingScreen from 'components/common/layout/LoadingScreen';
import AlertMessage from 'components/common/utils/AlertMessage';
import { createMarkup, generateLink } from 'utils/helpers';
import { getDateTime, getEventDate } from 'utils/date-helpers';
import defaultImage from 'assets/img/events/public-event.jpg';

const SingleEvent = ({ slug }) => {
  const [event, setEvent] = React.useState({
    profile: { stageName: slug },
  });
  const [otherEvents, setOtherEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [message, setMessage] = React.useState(null);

  React.useEffect(() => {
    slug &&
      axios
        .get(`/api/v1/public-events/${slug.toLowerCase()}`)
        .then(function (response) {
          const { status, data } = response;
          // handle success
          if (status === 200) {
            setEvent(data.event);
            setOtherEvents(data.otherEvents);
            setLoading(false);
          }
        })
        .catch(function (error) {
          error.response.data.otherEvents &&
            setOtherEvents(error.response.data.otherEvents);
          setMessage({
            message: error.response.data.message,
          });
          setLoading(false);
        });
  }, [slug]);

  return (
    <FrontEndPage subtitle="Upcoming Events" title={event.title}>
      {loading ? (
        <LoadingScreen loading={loading} text={`Loading ${slug} information`} />
      ) : (
        <>
          <NotFound message={message} />
          <EventSection event={event} />
          <OtherEventsSection events={otherEvents.slice(0, 3)} />
          <BackToHireEvents />
        </>
      )}
    </FrontEndPage>
  );
};

SingleEvent.propTypes = {
  slug: PropTypes.string,
};

SingleEvent.defaultProps = {
  slug: null,
};

const NotFound = ({ message }) => (
  <section className="my-5 pt-5">
    <div className="container-fluid">
      <AlertMessage {...message} />
    </div>
  </section>
);

NotFound.propTypes = {
  message: PropTypes.object,
};

NotFound.defaultProps = {
  message: {},
};

const EventSection = ({ event }) => (
  <section className="single-event spacer--4">
    <div className="container-fluid">
      <h2 className="single-event__title text-uppercase">{event.title}</h2>
      <Row>
        <Col>
          <div className="single-event__location">
            <span className="icon-location" />
            {event.location}
          </div>
          <div className="single-event__date-time">
            <span className="icon-calendar" />
            {getEventDate(event.startTime)}
          </div>
        </Col>
      </Row>
      <Image.Big
        className={`mt-3 ${event.mainImage ? '' : 'default-image'}`}
        src={event.mainImage || defaultImage}
      />
      <Row className="mt-5">
        <Col sm="8">
          <h2 className="header font-weight-light pb-3">
            ABOUT <span>EVENT</span>
          </h2>
          {event.description}

          <h5 className="font-weight-normal mt-5">More Information</h5>
          {generateLink(event.eventLink)}
        </Col>
        <Col sm="4">
          <div className={`card card-custom card-tiles card-blue no-br`}>
            <div className="card-body">
              <h4 className="subtitle--3 text-danger mb-3">Details</h4>
              <SingleEvent.Details
                details={getDateTime(event.startTime)}
                title="Start Time"
              />
              <SingleEvent.Details
                details={getDateTime(event.endTime)}
                title="End Time"
              />
              <SingleEvent.Details details={event.venue} title="Venue" />
              <SingleEvent.Details details={event.state} title="State" />
              <SingleEvent.Details details={event.city} title="City" />
              <SingleEvent.Details
                details={event.organizer}
                title="Organizer"
              />
              <SingleEvent.Details details={event.location} title="Location" />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  </section>
);

EventSection.propTypes = {
  event: PropTypes.object.isRequired,
};

const OtherEventsSection = ({ events }) => (
  <section className="other-events spacer">
    <div className="container-fluid">
      <h2 className="header title-border">
        RELATED <span>Events</span>
      </h2>
      <Row className="pt-5">
        <Events.List lists={events} />
      </Row>
    </div>
  </section>
);

OtherEventsSection.propTypes = {
  events: PropTypes.array.isRequired,
};

const BackToHireEvents = () => (
  <section className="mt-">
    <div className="container-fluid">
      <Link
        className="btn btn-info btn-transparent btn-lg"
        to="/upcoming-events"
      >
        Back to Upcoming Events
      </Link>
    </div>
  </section>
);

SingleEvent.Details = ({ title, details }) => {
  if (!details) {
    return null;
  }
  return (
    <div className="event-details">
      <p className="event-details__title">{title}</p>
      <div
        className="event-details__details"
        dangerouslySetInnerHTML={createMarkup(details)}
      />
    </div>
  );
};
SingleEvent.Details.propTypes = {
  details: PropTypes.string,
  title: PropTypes.string.isRequired,
};
SingleEvent.Details.defaultProps = {
  details: null,
};
export default SingleEvent;
