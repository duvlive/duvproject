import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import NoContent from 'components/common/utils/NoContent';
import { getTokenFromStore } from 'utils/localStorage';
import LoadItems from 'components/common/utils/LoadItems';
import { Link } from '@reach/router';
import { Col, Card, CardImg, CardImgOverlay } from 'reactstrap';
import { format, parse } from 'date-fns';
import { getTime } from 'utils/date-helpers';

const PublicEvents = () => {
  const [publicEvents, setPublicEvents] = React.useState(null);
  React.useEffect(() => {
    axios
      .get('/api/v1/public-events', {
        headers: {
          'x-access-token': getTokenFromStore(),
        },
      })
      .then(function (response) {
        const { status, data } = response;
        console.log('status,data', status, data);
        // handle success
        if (status === 200) {
          setPublicEvents(data.publicEvents);
        }
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        setPublicEvents([]);
      });
  }, []);
  return (
    <BackEndPage title="PublicEvents">
      <div className="main-app">
        <TopMessage />

        <section className="app-content">
          <div className="text-right">
            <Link
              className="btn btn-danger btn-transparent btn-wide"
              to="/user/public-events/new"
            >
              <span className="icon icon-events"></span> New Public Event
            </Link>
          </div>
          <LoadItems
            items={publicEvents}
            loadingText="Loading your PublicEvents"
            noContent={<NoContent isButton text="No PublicEvents found" />}
          >
            <PublicEventsRowList publicEvents={publicEvents || []} />
          </LoadItems>
        </section>
      </div>
    </BackEndPage>
  );
};

const PublicEventsRowList = ({ publicEvents }) => (
  <div className="table-responsive">
    <table className="table table-dark table__no-border table__with-bg">
      <tbody>
        {publicEvents.map((publicEvent, index) => (
          <SingleEvent key={index} {...publicEvent} />
        ))}
      </tbody>
    </table>
    <br />
    <br />
  </div>
);

PublicEventsRowList.propTypes = {
  publicEvents: PropTypes.array.isRequired,
};

const SingleEvent = ({
  eventDate,
  mainImage,
  location,
  slug,
  startTime,
  ticket,
  title,
}) => {
  const parsedEventDate = parse(eventDate);
  const weekDay = format(parsedEventDate, 'ddd');
  const fullDate = format(parsedEventDate, 'MMM D');

  return (
    <Col sm={6}>
      <Link to={`/event/${slug}`}>
        <Card className="event-card">
          <div className="event-card__image-container">
            <CardImg alt={title} className="img-fluid" src={mainImage} top />
            <CardImgOverlay />
          </div>
          <div className="event-card__body">
            <div className="event-card__datetime">
              <span className="event-card__weekday">{weekDay},</span>
              <span className="event-card__date"> {fullDate},</span>
              <span className="event-card__time">{getTime(startTime)}</span>
            </div>
            <div className="event-card__info">
              <h6 className="event-card__title text-truncate">{title}</h6>
              <p className="event-card__address">{location}</p>
              <div className="event-card__ticket">
                Ticket: {ticket ? `NGN ${ticket}` : 'Free'}
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </Col>
  );
};

SingleEvent.propTypes = {
  image: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  start_date: PropTypes.string.isRequired,
  ticket: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default PublicEvents;
