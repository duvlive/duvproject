import React from 'react';
import { Link } from '@reach/router';
import Card from 'components/custom/Card';
import { Col, Row } from 'reactstrap';
import TopMessage from 'components/common/TopMessage';

const HireEntertainers = () => (
  <div className="main-app">
    <TopMessage message="Hire Entertainers" />

    <section className="app-content">
      <section className="payments">
        <h4 className="main-app__subtitle text-white text-center mt-5 mb-5">
          SELECT YOUR CHOICE
        </h4>
        <Row>
          <Col sm={{ size: 10, offset: 1 }}>
            <Row className="row-eq-height">
              <Col sm={{ size: 4, offset: 0 }} xs={{ size: 8, offset: 2 }}>
                <Link to="/user/events/new/search">
                  <Card color="blue" hover>
                    <div className="selection__text">
                      <h4>Search</h4>
                      <div className="selection__text--description">
                        Search for your favorite Entertainer and select them for
                        your event
                      </div>
                    </div>
                  </Card>
                </Link>
              </Col>
              <Col sm={{ size: 4, offset: 0 }} xs={{ size: 8, offset: 2 }}>
                <Link to="/user/events/new/auction">
                  <Card color="red" hover>
                    <div className="selection__text">
                      <h4>Auction</h4>
                      <div className="selection__text--description">
                        Select the best Entertainer for your Event based on bids
                        from Entertainers
                      </div>
                    </div>
                  </Card>
                </Link>
              </Col>
              <Col sm={{ size: 4, offset: 0 }} xs={{ size: 8, offset: 2 }}>
                <Link to="/user/events/new/recommend">
                  <Card color="green" hover>
                    <div className="selection__text">
                      <h4>Recommend</h4>
                      <div className="selection__text--description">
                        Lets suggest the best Entertainer for your event
                      </div>
                    </div>
                  </Card>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </section>
    </section>
  </div>
);

export default HireEntertainers;
