import React from 'react';
import { Row } from 'reactstrap';
import Events from 'components/common/events/Events';
import eventLists from 'data/events.js';
import FrontEndPage from 'components/common/layout/FrontEndPage';

const UpcomingEvents = () => {
  return (
    <FrontEndPage title="Upcoming Events">
      <UpcomingEventsSection />
    </FrontEndPage>
  );
};

const UpcomingEventsSection = () => (
  <section className="upcoming-events spacer">
    <div className="container-fluid">
      <h2 className="header title-border">
        Upcoming <span>Events</span>
      </h2>
      <Row className="pt-5">
        <Events.List lists={eventLists} />
      </Row>
    </div>
  </section>
);

export default UpcomingEvents;
