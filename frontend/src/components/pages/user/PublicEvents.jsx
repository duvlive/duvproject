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
import defaultImage from 'assets/img/events/public-event.jpg';
import { getStatus } from '../entertainer/Gallery';

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
          <h4 className="col-sm-12">Your Public Events</h4>
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
  <div className="row text-center">
    {publicEvents.map((publicEvent, index) => (
      <SingleEvent key={index} {...publicEvent} />
    ))}
  </div>
);

PublicEventsRowList.propTypes = {
  publicEvents: PropTypes.array.isRequired,
};

const SingleEvent = ({
  location,
  mainImage,
  slug,
  startTime,
  status,
  title,
}) => {
  const parsedEventDate = parse(startTime);
  const weekDay = format(parsedEventDate, 'ddd');
  const fullDate = format(parsedEventDate, 'MMM D');

  return (
    <Col md={8} sm={10} lg={6}>
      <Link to={`/user/public-events/view/${slug}`}>
        <Card className="event-card">
          <div className="event-card__image-container">
            <CardImg
              alt={title}
              className="img-fluid"
              src={mainImage || defaultImage}
              top
            />
            <CardImgOverlay />
          </div>
          <div className="event-card__body text-left">
            <div className="event-card__datetime">
              <span className="event-card__weekday">{weekDay},</span>
              <span className="event-card__date"> {fullDate},</span>
              <span className="event-card__time">{getTime(startTime)}</span>
            </div>
            <div className="event-card__info">
              <h6 className="event-card__title text-truncate">{title}</h6>
              <p className="event-card__address">{location}</p>
              <div className="event-card__ticket">
                Status: {getStatus(status)}
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </Col>
  );
};

SingleEvent.propTypes = {
  endTime: PropTypes.string.isRequired,
  eventLink: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  mainImage: PropTypes.string,
  slug: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  status: PropTypes.any,
  title: PropTypes.string.isRequired,
};

SingleEvent.defaultProps = {
  mainImage: null,
  status: null,
};

export default PublicEvents;
