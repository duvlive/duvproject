import React from 'react';
import { Row, Col } from 'reactstrap';
import Header from 'components/common/Header';
import BorderedListItem from '../custom/BorderedListItem';
import Text from '../common/Text';
import noGoSpoilYourPartyList from 'data/duvSteps.js';
import entertainerLists from 'data/entertainers.js';
import eventLists from 'data/events.js';
import Footer from 'components/common/Footer';
import Slideshow from 'components/custom/Slideshow';
import { SLIDESHOW_TYPE } from 'utils/constants';

const Home = () => {
  return (
    <div className="home">
      <LandingSection />
      <IntroSection />
      <LiveYourLifeSection />
      <EntertainerSection />
      <EventSection />
      <Footer />
    </div>
  );
};

const LandingSection = () => (
  <section className="landing">
    <div className="card bg-dark text-white">
      <Header />
      <div className="card-img-overlay">
        <div className="card-img-overlay__content">
          <h2 className="card-title">
            GET THE BEST <br />
            DJS, MCS &amp; LIVE BANDS
          </h2>
          <p className="card-text">
            {' '}
            <button
              className="btn btn-danger btn-lg hvr-sweep-to-right"
              href="/"
            >
              Hire Entertainers
            </button>{' '}
            &nbsp; &nbsp;
            <button className="btn btn-light btn-lg hvr-sweep-to-left" href="/">
              Become an Entertainer
            </button>
          </p>
        </div>
      </div>
    </div>
  </section>
);

const IntroSection = () => (
  <section className="intro spacer">
    <div className="container-fluid">
      <h2 className="header">
        NO GO SPOIL <span className="d-sm-inline d-block">YOUR PARTY O!!!</span>
      </h2>
      <Row className="pt-5">
        <BorderedListItem.List items={noGoSpoilYourPartyList} />{' '}
      </Row>
    </div>
  </section>
);

const LiveYourLifeSection = () => (
  <section className="live-your-life">
    <Col className="live-your-life__content--1 live-your-life__box" sm="4">
      <Text.VerticalAlign>
        {' '}
        <h2 className="title-border">LIVE YOUR BEST LIFE</h2>
        <p>WE TUNE UP YOUR EVENTS</p>
      </Text.VerticalAlign>
    </Col>
    <Col className="live-your-life__content--2 live-your-life__box" sm="4">
      <Text.VerticalAlign>
        <h3>
          HOW IT <span>WORKS</span>
        </h3>
        <p>
          As the world’s leading live entertainment company, we are privileged
          to work with artists to bring their creativity to life on stages
          around the world. Whether it’s two hours at a packed club, or an
          entire weekend of sets at a festival, a live show does more than
          entertain. It can uplift, inspire and create a memory that lasts a
          lifetime
        </p>
      </Text.VerticalAlign>
    </Col>
    <Col className="live-your-life__content--3 live-your-life__box" sm="4">
      <Text.VerticalAlign>
        <h3>
          HIRE AN <span>ENTERTAINER</span>
        </h3>
        <p>
          As the world’s leading live entertainment company, we are privileged
          to work with artists to bring their creativity to life on stages
          around the world. Whether it’s two hours at a packed club, or an
          entire weekend of sets at a festival, a live show does more than
          entertain. It can uplift, inspire and create a memory that lasts a
          lifetime
        </p>
      </Text.VerticalAlign>
    </Col>
  </section>
);

const EntertainerSection = () => (
  <section className="entertainers spacer">
    <div className="container-fluid">
      <h2 className="header title-border">
        OUR <span>ENTERTAINERS</span>
      </h2>
      <Row className="pt-5">
        {/* <Entertainers.List lists={entertainerLists} /> */}
        <Slideshow
          items={[
            { list: entertainerLists.slice(0, 6), id: 1 },
            { list: entertainerLists.slice(6, 12), id: 2 },
            { list: entertainerLists.slice(12, 18), id: 3 }
          ]}
          type={SLIDESHOW_TYPE.entertainers}
        />
      </Row>
    </div>
  </section>
);

const EventSection = () => (
  <section className="events spacer">
    <div className="container-fluid">
      <h2 className="header title-border">
        UPCOMING <span>EVENTS</span>
      </h2>
      <Row className="pt-5">
        {/* <Events.List lists={eventLists} /> */}
        <Slideshow
          items={[
            { list: eventLists.slice(0, 3), id: 1 },
            { list: eventLists.slice(3, 6), id: 2 },
            { list: eventLists.slice(6, 9), id: 3 }
          ]}
          type={SLIDESHOW_TYPE.events}
        />
      </Row>
    </div>
  </section>
);

export default Home;
