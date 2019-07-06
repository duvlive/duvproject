import React from 'react';
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';
import { Row } from 'reactstrap';
import Entertainers from 'components/common/Entertainers';
import entertainerLists from 'data/entertainers.js';

const HireEntertainers = () => {
  return (
    <div className="how-it-works">
      <LandingSection />
      <EntertainerSection />
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
          <h2 className="card-title">Hire Entertainers</h2>
          <p className="card-subtitle">
            DUV LIVE &nbsp;/ &nbsp;Hire Entertainers
          </p>
        </div>
      </div>
    </div>
  </section>
);

const EntertainerSection = () => (
  <section className="entertainers spacer">
    <div className="container-fluid">
      <h2 className="header title-border">
        OUR <span>ENTERTAINERS</span>
      </h2>
      <Row className="pt-5">
        <Entertainers.List
          lists={[
            ...entertainerLists,
            ...entertainerLists,
            ...entertainerLists,
            ...entertainerLists
          ]}
        />
      </Row>
    </div>
  </section>
);

export default HireEntertainers;