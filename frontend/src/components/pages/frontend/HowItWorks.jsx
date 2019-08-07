import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardImgOverlay } from 'reactstrap';
import FrontEndPage from 'components/common/layout/FrontEndPage';
import HowItWorksImage from 'assets/img/bg/how-it-works.jpg';
import Text from 'components/common/utils/Text';
import BorderedListItem from 'components/custom/BorderedListItem';
import Slideshow from 'components/custom/Slideshow';
import Counter from 'components/custom/Counter';
import { SLIDESHOW_TYPE } from 'utils/constants';
import noGoSpoilYourPartyList from 'data/duvSteps';
import testimonialLists from 'data/testimonials';

const HowItWorks = () => {
  return (
    <FrontEndPage title="How it Works">
      <AboutUs />
      <WhyUseDuvLive />
      <CounterSection />
      <Slideshow items={testimonialLists} type={SLIDESHOW_TYPE.testimonials} />
    </FrontEndPage>
  );
};

const AboutUs = () => (
  <section className="about-us spacer">
    <div className="container-fluid">
      <Row>
        <Col sm={6}>
          <div className="about-us__img--container">
            <img
              alt="how it works"
              className="img-fluid"
              src={HowItWorksImage}
            />
          </div>
        </Col>
        <Col sm={6}>
          <div className="about-us__content">
            <h2 className="about-us__title">HOW IT WORKS</h2>
            <h3 className="about-us__subtitle">
              DUV LIVE SUPPORTS THE BEST DJS, MCS AND LIVE BANDS IN NIGERIA.
            </h3>
            <p className="about-us__text">
              Praesent eget egestas lectus. Vestibulum eleifend augue a erat
              condimentum, ac laoreet mi tristique. Fusce porttitor est augue.
              Nunc rutrum volutpat orci, quis pharetra nisl lacinia sit amet. In
              in tellus nec nisl tincidunt feugiat. Vestibulum magna mauris,
              posuere vel facilisis ut, pulvinar nec nisi. Class aptent taciti
              sociosqu ad litora torquent per conubia nostra, per inceptos
              himenaeos. Nullam facilisis faucibus nisi, eget porta arcu ornare
              nec. Quisque dapibus mi id ultricies consectetur.
            </p>
          </div>
        </Col>
      </Row>
    </div>
  </section>
);

const WhyUseDuvLive = () => (
  <section className="why-use-duv-live spacer">
    <div className="container-fluid">
      <h2 className="title-border">
        WHY USE <span>DUV LIVE</span>
      </h2>
      <Row className="pt-5">
        <BorderedListItem.List
          items={[...noGoSpoilYourPartyList, ...noGoSpoilYourPartyList]}
        />{' '}
      </Row>
    </div>
    <div className="mb-5" />
  </section>
);

const CounterSection = () => (
  <section className="pt-5">
    <Card className="entertainers-counter">
      <CardImgOverlay>
        <div className="container-fluid">
          <Row>
            <EntertainersCounter.List />
          </Row>
        </div>
      </CardImgOverlay>
    </Card>
  </section>
);

const EntertainersCounter = ({ icon, name, number }) => (
  <Col className="entertainers-counter__content" sm={4}>
    <Text.VerticalAlign>
      <div className="entertainers-counter__icon d-none d-sm-block">
        <i className={`icon icon-${icon}`} />
      </div>
      <h2 className="entertainers-counter__number">
        <Counter number={number} />
      </h2>
      <h3 className="entertainers-counter__name">{name}</h3>
    </Text.VerticalAlign>
  </Col>
);

EntertainersCounter.propTypes = {
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired
};

EntertainersCounter.List = () => {
  const lists = [
    { icon: 'headphones', name: 'DJs', number: 56 },
    { icon: 'mic', name: 'MCs', number: 36 },
    { icon: 'music', name: 'Live Bands', number: 20 }
  ];
  return lists.map(props => (
    <EntertainersCounter key={props.name} {...props} />
  ));
};

export default HowItWorks;
