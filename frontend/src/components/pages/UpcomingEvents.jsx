import React from 'react';
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';
import { Row } from 'reactstrap';
import Events from 'components/common/Events';
import eventLists from 'data/events.js';

const UpcomingEvents = () => {
  return (
    <div className="how-it-works">
      <LandingSection />
      <UpcomingEventsSection />
      <Footer />
    </div>
  );
};

const LandingSection = () => (
  <section className="landing">
    <div className="card card__menu bg-dark text-white">
      <Header />
      <div className="card-img-overlay">
        <div className="card-img-overlay__content">
          <h2 className="card-title">Upcoming Events</h2>
          <p className="card-subtitle">
            DUV LIVE &nbsp;/ &nbsp;Upcoming Events
          </p>
        </div>
      </div>
    </div>
  </section>
);

const UpcomingEventsSection = () => (
  <section className="upcoming-events spacer">
    <div className="container-fluid">
      <h2 className="header title-border">
        Upcoming <span>Events</span>
      </h2>
      <Row className="pt-5">
        <Events.List
          lists={[...eventLists, ...eventLists, ...eventLists, ...eventLists]}
        />
      </Row>
    </div>
  </section>
);

export default UpcomingEvents;
