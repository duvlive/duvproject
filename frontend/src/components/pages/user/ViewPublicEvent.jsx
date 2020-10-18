import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import axios from 'axios';
import {
  createMarkup,
  generateLink,
  getRequestStatusIcon,
} from 'utils/helpers';
import Image from 'components/common/utils/Image';
import { Link } from '@reach/router';
import BackEndPage from 'components/common/layout/BackEndPage';
import TopMessage from 'components/common/layout/TopMessage';
import { getTokenFromStore } from 'utils/localStorage';
import { getDateTime, getEventDate } from 'utils/date-helpers';
import defaultImage from 'assets/img/events/public-event.jpg';
import LoadingScreen from 'components/common/layout/LoadingScreen';
import { getStatus, approval } from '../entertainer/Gallery';
import { UserContext } from 'context/UserContext';

const ViewPublicEvent = ({ id }) => {
  const [event, setEvent] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    id &&
      axios
        .get(`/api/v1/public-event/${id}`, {
          headers: {
            'x-access-token': getTokenFromStore(),
          },
        })
        .then(function (response) {
          const { status, data } = response;
          console.log('data', data);
          // handle success
          if (status === 200) {
            setEvent(data.event);
            setLoading(false);
          }
        })
        .catch(function (error) {
          setLoading(false);
        });
  }, [id]);
  return (
    <BackEndPage title="View Public Event">
      <div className="main-app">
        <TopMessage />
        {loading ? (
          <LoadingScreen loading={loading} text="Loading Event Details" />
        ) : (
          <EventSection event={event} />
        )}
        <BackToHireEvents />
      </div>
    </BackEndPage>
  );
};

ViewPublicEvent.propTypes = {
  id: PropTypes.any,
};

ViewPublicEvent.defaultProps = {
  id: null,
};

const EventSection = ({ event }) => {
  const { userState } = React.useContext(UserContext);

  return (
    <section className="single-event spacer--4">
      <div className="text-right">
        {userState.id === event.userId && (
          <Link
            className="btn btn-danger mb-3 btn-transparent btn-wide"
            to={`/user/public-events/edit/${event.id}`}
          >
            <span className="icon icon-events"></span> Edit Event
          </Link>
        )}
      </div>
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
          <h6 className="pt-3 text-muted">
            {' '}
            {getRequestStatusIcon(approval[getStatus(event.status)].text)}{' '}
          </h6>
        </Col>
      </Row>
      <Image.Big
        className="mt-3"
        name={event.title}
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
              <ViewPublicEvent.Details
                details={getDateTime(event.startTime)}
                title="Start Time"
              />
              <ViewPublicEvent.Details
                details={getDateTime(event.endTime)}
                title="End Time"
              />
              <ViewPublicEvent.Details details={event.venue} title="Venue" />
              <ViewPublicEvent.Details
                details={event.organizer}
                title="Organizer"
              />
              <ViewPublicEvent.Details
                details={event.location}
                title="Location"
              />
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
};

EventSection.propTypes = {
  event: PropTypes.object.isRequired,
};

const BackToHireEvents = () => (
  <section className="mt-5">
    <Link
      className="btn btn-info btn-transparent btn-lg"
      to="/user/public-events"
    >
      Back to Public Events
    </Link>
  </section>
);

ViewPublicEvent.Details = ({ title, details }) => (
  <div className="event-details">
    <p className="event-details__title">{title}</p>
    <div
      className="event-details__details"
      dangerouslySetInnerHTML={createMarkup(details)}
    />
  </div>
);
ViewPublicEvent.Details.propTypes = {
  details: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
export default ViewPublicEvent;
