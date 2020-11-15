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
import { getPublicEventDate } from 'utils/date-helpers';
import defaultImage from 'assets/img/events/public-event.jpg';
import { getStatus, approval } from '../entertainer/Gallery';
import { getRequestStatusIcon } from 'utils/helpers';

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
              className="btn btn-danger mb-3 btn-transparent btn-wide"
              to="/user/public-events/new"
            >
              <span className="icon icon-events"></span> New Public Event
            </Link>
          </div>
          <h4 className="mb-3">Your Public Events</h4>
          <LoadItems
            items={publicEvents}
            loadingText="Loading your PublicEvents"
            noContent={<NoContent isButton text="No Public Events found" />}
          >
            <PublicEventsRowList publicEvents={publicEvents || []} />
          </LoadItems>
          <Link
            className="btn btn-info mb-3 btn-transparent btn-wide"
            to="/user/public-events/others"
          >
            <span className="icon icon-events"></span> Upcoming Public Events
          </Link>
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
  endTime,
  id,
  location,
  mainImage,
  startTime,
  status,
  title,
}) => {
  const viewEventLink = `/user/public-events/view/${id}`;

  return (
    <Col lg={6} md={8} sm={10}>
      <Card className="event-card">
        <div className="event-card__image-container">
          <Link to={viewEventLink}>
            <CardImg
              alt={title}
              className="img-fluid"
              src={mainImage || defaultImage}
              top
            />
            <CardImgOverlay>
              <span className="event-card__status">
                {getRequestStatusIcon(approval[getStatus(status)].text)}{' '}
              </span>
            </CardImgOverlay>
          </Link>
        </div>
        <div className="event-card__body text-left">
          <div className="event-card__info">
            <h6 className="event-card__title text-truncate">{title}</h6>
            <span className="event-card__date">
              {getPublicEventDate(startTime, endTime)}
            </span>
            <p className="event-card__address">{location}</p>

            <div className="text-left">
              <Link
                className="btn btn-danger btn-sm"
                to={`/user/public-events/edit/${id}`}
              >
                Edit Event
              </Link>
              &nbsp;&nbsp;&nbsp;
              <Link
                className="btn btn-info btn-sm"
                to={`/user/public-events/view/${id}`}
              >
                View Event
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </Col>
  );
};

SingleEvent.propTypes = {
  endTime: PropTypes.string.isRequired,
  eventLink: PropTypes.string.isRequired,
  id: PropTypes.any.isRequired,
  location: PropTypes.string.isRequired,
  mainImage: PropTypes.string,
  startTime: PropTypes.string.isRequired,
  status: PropTypes.any,
  title: PropTypes.string.isRequired,
};

SingleEvent.defaultProps = {
  mainImage: null,
  status: null,
};

export default PublicEvents;
