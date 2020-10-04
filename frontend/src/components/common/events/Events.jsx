import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { Col, Card, CardImg, CardImgOverlay } from 'reactstrap';
import { format, parse } from 'date-fns';
import defaultImage from 'assets/img/events/public-event.jpg';
import { getTime } from 'utils/date-helpers';

const Events = ({ mainImage, location, slug, startTime, title }) => {
  const eventDate = parse(startTime);
  const weekDay = format(eventDate, 'ddd');
  const fullDate = format(eventDate, 'MMM D');

  return (
    <Col sm={4}>
      <Link to={`/event/${slug}`}>
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
          <div className="event-card__body">
            <div className="event-card__datetime">
              <span className="event-card__weekday">{weekDay},</span>
              <span className="event-card__date"> {fullDate},</span>
              <span className="event-card__time">{getTime(startTime)}</span>
            </div>
            <div className="event-card__info">
              <h6 className="event-card__title text-truncate">{title}</h6>
              <p className="event-card__address">{location}</p>
            </div>
          </div>
        </Card>
      </Link>
    </Col>
  );
};

Events.propTypes = {
  location: PropTypes.string.isRequired,
  mainImage: PropTypes.string,
  slug: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

Events.defaultProps = {
  mainImage: null,
};

Events.List = ({ lists }) =>
  lists.map((props) => <Events key={props.title} {...props} />);

export default Events;
