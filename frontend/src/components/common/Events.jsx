import React from 'react';
import { Col, Card, CardImg, CardImgOverlay } from 'reactstrap';

const Events = ({ title, address, ticket, weekday, date, time, image }) => (
  <Col sm={4}>
    <Card className="event-card">
      <div className="event-card__image-container">
        <CardImg alt={title} className="img-fluid" src={image} top />
        <CardImgOverlay />
      </div>
      <div className="event-card__body">
        <div className="event-card__datetime">
          <span className="event-card__weekday">{weekday},</span>
          <span className="event-card__date"> {date},</span>
          <span className="event-card__time">{time}</span>
        </div>
        <div className="event-card__info">
          <h6 className="event-card__title">{title}</h6>
          <p className="event-card__address">{address}</p>
          <div className="event-card__ticket">Ticket: {ticket}</div>
        </div>
      </div>
    </Card>
  </Col>
);

Events.List = ({ lists }) =>
  lists.map(props => <Events key={props.title} {...props} />);

export default Events;
