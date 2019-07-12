import React from 'react';
import { Col, Card, CardImg, CardImgOverlay } from 'reactstrap';
import { format, parse } from 'date-fns';

const Events = ({
  start_date,
  end_date,
  image,
  location,
  ticket,
  start_time,
  title
}) => {
  const eventDate = parse(start_date);
  const weekDay = format(eventDate, 'ddd');
  const fullDate = format(eventDate, 'MMM D');

  return (
    <Col sm={4}>
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
            <h6 className="event-card__title">{title}</h6>
            <p className="event-card__address">{location}</p>
            <div className="event-card__ticket">Ticket: {ticket}</div>
          </div>
        </div>
      </Card>
    </Col>
  );
};

Events.List = ({ lists }) =>
  lists.map(props => <Events key={props.title} {...props} />);

export default Events;
