import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Row, Col, Card, CardImgOverlay } from 'reactstrap';
import FrontEndPage from 'components/common/layout/FrontEndPage';
import HowItWorksImage from 'assets/img/bg/how-it-works.jpg';
import Text from 'components/common/utils/Text';
import BorderedListItem from 'components/custom/BorderedListItem';
import DiamondListItem from 'components/custom/DiamondListItem';
import Slideshow from 'components/custom/Slideshow';
import Counter from 'components/custom/Counter';
import { SLIDESHOW_TYPE } from 'utils/constants';
import { howItWorksSteps, otherWorksSteps } from 'data/duvSteps';
import testimonialLists from 'data/testimonials';

const HowItWorks = () => {
  const [total, setTotal] = React.useState({ mc: 0, dj: 0, liveband: 0 });
  React.useEffect(() => {
    axios.get(`/api/v1/entertainers/total`).then(function (response) {
      const { status, data } = response;
      // handle success
      if (status === 200) {
        setTotal(data.entertainers);
      }
    });
  }, []);
  return (
    <FrontEndPage title="How it Works">
      <AboutUs />
      <CounterSection total={total} />
      <WhyUseDuvLive />
      {false && (
        <Slideshow
          items={testimonialLists}
          type={SLIDESHOW_TYPE.testimonials}
        />
      )}
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
              DUV LIVE is an online platform that supports and promotes the best
              in live entertainment. Our range of services affords talented
              performers the power to manage their bookings personally, while
              delivering world class exposure to all levels of live
              entertainment.
            </p>
            <p className="about-us__text">
              Simply hire the entertainer of your choice for that upcoming party
              by following these simple steps:
            </p>
          </div>
        </Col>
      </Row>
      <Row className="mt-5">
        <DiamondListItem.List items={[...otherWorksSteps]} />
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
        <BorderedListItem.List items={[...howItWorksSteps]} />{' '}
      </Row>
    </div>
    <div className="mb-5" />
  </section>
);

const CounterSection = ({ total }) => (
  <section className="pt-5">
    <Card className="entertainers-counter">
      <CardImgOverlay>
        <div className="container-fluid">
          <Row>
            <EntertainersCounter.List total={total} />
          </Row>
        </div>
      </CardImgOverlay>
    </Card>
  </section>
);

CounterSection.propTypes = {
  total: PropTypes.object.isRequired,
};

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
  number: PropTypes.number.isRequired,
};

EntertainersCounter.List = ({ total }) => {
  const lists = [
    { icon: 'headphones', name: 'DJs', number: total.dj },
    { icon: 'mic', name: 'MCs', number: total.mc },
    { icon: 'music', name: 'Live Bands', number: total.liveband },
  ];
  return lists.map((props) => (
    <EntertainersCounter key={props.name} {...props} />
  ));
};

EntertainersCounter.List.propTypes = {
  total: PropTypes.object.isRequired,
};

export default HowItWorks;
