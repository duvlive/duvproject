import React from 'react';
import FrontEndPage from 'components/common/layout/FrontEndPage';
import { Row } from 'reactstrap';
import Entertainers from 'components/common/entertainers/Entertainers';
import entertainerLists from 'data/entertainers.js';

const HireEntertainers = () => {
  return (
    <FrontEndPage title="Hire Entertainers">
      <EntertainerSection />
    </FrontEndPage>
  );
};

const EntertainerSection = () => (
  <section className="entertainers spacer">
    <div className="container-fluid">
      <h2 className="header title-border">
        OUR <span>ENTERTAINERS</span>
      </h2>
      <Row className="pt-5">
        <Entertainers.List lists={entertainerLists} />
      </Row>
    </div>
  </section>
);

export default HireEntertainers;
