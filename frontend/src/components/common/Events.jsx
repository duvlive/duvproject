import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { Col, Card, CardImg, CardImgOverlay } from 'reactstrap';
import { format, parse } from 'date-fns';

const Events = ({
  image,
  location,
  slug,
  start_date,
  start_time,
  ticket,
  title
}) => {
  const eventDate = parse(start_date);
  const weekDay = format(eventDate, 'ddd');
  const fullDate = format(eventDate, 'MMM D');

  return (
    <Col sm={4}>
      <Link to={`/event/${slug}`}>
        <Card className="event-card">
          <div className="event-card__image-container">
            <CardImg alt={title} className="img-fluid" src={image} top />
            <CardImgOverlay />
          </div>
          <div className="event-card__body">
            <div className="event-card__datetime">
              <span className="event-card__weekday">{weekDay},</span>
              <span className="event-card__date"> {fullDate},</span>
              <span className="event-card__time">{start_time}</span>
            </div>
            <div className="event-card__info">
              <h6 className="event-card__title text-truncate">{title}</h6>
              <p className="event-card__address">{location}</p>
              <div className="event-card__ticket">Ticket: {ticket}</div>
            </div>
          </div>
        </Card>
      </Link>
    </Col>
  );
};

Events.propTypes = {
  image: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  start_date: PropTypes.string.isRequired,
  start_time: PropTypes.string.isRequired,
  ticket: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

Events.List = ({ lists }) =>
  lists.map(props => <Events key={props.title} {...props} />);

export default Events;
