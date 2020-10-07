import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import axios from 'axios';
import { createMarkup, generateLink } from 'utils/helpers';
import Image from 'components/common/utils/Image';
import { Link } from '@reach/router';
import BackEndPage from 'components/common/layout/BackEndPage';
import TopMessage from 'components/common/layout/TopMessage';
import { getTokenFromStore } from 'utils/localStorage';
import { getDateTime, getEventDate } from 'utils/date-helpers';
import defaultImage from 'assets/img/events/public-event.jpg';
import LoadingScreen from 'components/common/layout/LoadingScreen';
import AlertMessage from 'components/common/utils/AlertMessage';

const ViewPublicEvent = ({ id }) => {
  const [event, setEvent] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [message, setMessage] = React.useState(null);

  React.useEffect(() => {
    id &&
      axios
        .get(`/api/v1/admin/public-event/${id}`, {
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

  const processEvent = (id, approvalStatus) => {
    axios
      .put(
        `/api/v1/public-events/${approvalStatus}/${id}`,
        {},
        {
          headers: { 'x-access-token': getTokenFromStore() },
        }
      )
      .then(function (response) {
        const { status } = response;
        if (status === 200) {
          setMessage({
            type: 'success',
            message: `Event has successfully been ${approvalStatus}d`,
          });
        }
      })
      .catch(function (error) {
        setMessage({
          type: 'danger',
          message: error.response.message,
        });
      });
  };

  return (
    <BackEndPage title="View Public Event">
      <div className="main-app">
        <TopMessage />
        <AlertMessage {...message} />
        {loading ? (
          <LoadingScreen loading={loading} text="Loading Event Details" />
        ) : (
          <EventSection event={event} processEvent={processEvent} />
        )}
        <BackToAllPublicEvents />
      </div>
    </BackEndPage>
  );
};

ViewPublicEvent.propTypes = {
  id: PropTypes.string,
};

ViewPublicEvent.defaultProps = {
  id: null,
};

const EventSection = ({ event, processEvent }) => {
  const actionFn = () =>
    processEvent(event.id, event.status ? 'disapprove' : 'approve');
  const actionText = event.status ? 'Disapprove Event' : 'Approve Event';
  const buttonColor = `btn btn-wide btn-transparent ${
    event.status ? 'btn-danger' : 'btn-success'
  }`;

  return (
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

            <div className="my-3">
              <div className="text-right">
                {event && event.status === null ? (
                  <>
                    <button
                      className="btn btn-wide btn-transparent btn-success"
                      onClick={() => processEvent(event.id, 'approve')}
                    >
                      <span className="icon icon-ok"></span> Approve Event
                    </button>
                    &nbsp; &nbsp; &nbsp;
                    <button
                      className="btn btn-wide btn-transparent btn-danger"
                      onClick={() => processEvent(event.id, 'disapprove')}
                    >
                      <span className="icon icon-cancel"></span> Disapprove
                      Event
                    </button>
                  </>
                ) : (
                  <button className={buttonColor} onClick={actionFn}>
                    {actionText}
                  </button>
                )}
              </div>
            </div>
          </Col>
        </Row>
        <Image.Big className="mt-3" src={event.mainImage || defaultImage} />
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
      </div>
    </section>
  );
};

EventSection.propTypes = {
  event: PropTypes.object.isRequired,
  processEvent: PropTypes.func.isRequired,
};

const BackToAllPublicEvents = () => (
  <section className="mt-5">
    <div className="container-fluid">
      <Link
        className="btn btn-info btn-transparent btn-lg"
        to="/admin/public-events"
      >
        Back to Public Events
      </Link>
    </div>
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
