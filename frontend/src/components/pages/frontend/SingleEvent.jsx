import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import FrontEndPage from 'components/common/layout/FrontEndPage';
import Events from 'components/common/events/Events';
import eventLists from 'data/events.js';
import { getSlug, getOtherSlugs, createMarkup } from 'utils/helpers';
import { format, parse } from 'date-fns';
import Image from 'components/common/utils/Image';
import { Link } from '@reach/router';

const SingleEvent = ({ slug }) => {
  const event = getSlug(eventLists, slug);
  const otherEvents = getOtherSlugs(eventLists, slug, event.type);
  return (
    <FrontEndPage subtitle="Upcoming Events" title={event.title}>
      <EventSection event={event} />
      <OtherEventsSection events={otherEvents.slice(0, 3)} />
      <BackToHireEvents />
    </FrontEndPage>
  );
};

SingleEvent.propTypes = {
  slug: PropTypes.string
};

SingleEvent.defaultProps = {
  slug: null
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
            {getEventDateTime(event)}
          </div>
        </Col>
      </Row>
      <Image.Big className="mt-3" src={event.image} />
      <Row className="mt-5">
        <Col sm="8">
          <h2 className="header font-weight-light pb-3">
            ABOUT <span>EVENT</span>
          </h2>
          <div dangerouslySetInnerHTML={createMarkup(event.description)} />
        </Col>
        <Col sm="4">
          <div className={`card card-custom card-tiles card-blue no-br`}>
            <div className="card-body">
              <h4 className="subtitle--3 text-danger mb-3">Details</h4>
              <SingleEvent.Details
                details={getEventDateTime(event)}
                title="Date & Time"
              />
              <SingleEvent.Details details={event.venue} title="Venue" />
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
  event: PropTypes.object.isRequired
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
  events: PropTypes.array.isRequired
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

const getEventDateTime = event => {
  const eventDate = parse(event.start_date);
  return format(eventDate, 'DD MMMM') + ' ' + event.start_time;
};

SingleEvent.Details = ({ title, details }) => (
  <div className="event-details">
    <p className="event-details__title">{title}</p>
    <div
      className="event-details__details"
      dangerouslySetInnerHTML={createMarkup(details)}
    />
  </div>
);
SingleEvent.Details.propTypes = {
  details: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};
export default SingleEvent;
