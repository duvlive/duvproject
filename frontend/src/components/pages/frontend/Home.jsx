import React from 'react';
import { Row, Col } from 'reactstrap';
import Header from 'components/common/layout/Header';
import BorderedListItem from '../../custom/BorderedListItem';
import Text from '../../common/utils/Text';
import noGoSpoilYourPartyList from 'data/duvSteps.js';
import entertainerLists from 'data/entertainers.js';
import eventLists from 'data/events.js';
import Footer from 'components/common/layout/Footer';
import Slideshow from 'components/custom/Slideshow';
import { SLIDESHOW_TYPE } from 'utils/constants';
import YouTube from 'react-youtube';
import { Link } from '@reach/router';

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
        <VideoSection />
        <div className="card-img-overlay__content">
          <h2 className="card-title">
            <br />
            DJS, MCS &amp; LIVE BANDS
          </h2>
          <p className="card-text">
            {' '}
            <Link
              className="btn btn-danger btn-lg hvr-sweep-to-right"
              to="register/hire-entertainer"
            >
              Hire Entertainers
            </Link>{' '}
            &nbsp; &nbsp;
            <Link
              className="btn btn-light btn-lg hvr-sweep-to-left"
              to="register/become-an-entertainer"
            >
              Become an Entertainer
            </Link>
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
        <p className="text-uppercase">Celebrate the great moments</p>
      </Text.VerticalAlign>
    </Col>
    <Col className="live-your-life__content--2 live-your-life__box" sm="4">
      <Text.VerticalAlign>
        <h3>
          HOW IT <span>WORKS</span>
        </h3>
        <p>
          DUV LIVE is an online platform that supports the best of live
          entertainers in Nigeria. Our range of services affords upcoming and
          professional talent the power to manage their bookings online , while
          delivery a world class Simply hire the entertainer of your choice for
          that upcoming party by following these simple steps:
          <Link className="d-block mt-3" to="/how-it-works">
            Learn more &rarr;
          </Link>
        </p>
      </Text.VerticalAlign>
    </Col>
    <Col className="live-your-life__content--3 live-your-life__box" sm="4">
      {/* <Text.VerticalAlign>
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
      </Text.VerticalAlign> */}
    </Col>
  </section>
);

const EntertainerSection = () => (
  <section className="entertainers spacer">
    <div className="container-fluid">
      <h2 className="header title-border">
        <span>ENTERTAINER</span>
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

// https://www.internetrix.com.au/blog/how-to-use-youtube-video-as-your-webpage-background-2/
const VideoSection = () => {
  const onReady = event => {
    // access to player in all event handlers via event.target
    // event.target.pauseVideo();
    event.target.mute();
    event.target.playVideo();
  };
  const onStateChange = event => {
    if (event && event.data === 1) {
      var videoHolder = document.getElementById('home-banner-box');
      if (videoHolder && videoHolder.id) {
        videoHolder.classList.remove('loading');
      }
    } else if (event && event.data === 0) {
      event.target.playVideo();
    }
  };
  const opts = {
    width: '100%', // Player width (in px)
    height: '720',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1, // Auto-play the video on load
      disablekb: 1, // Disable Keyboard
      controls: 0, // Hide pause/play buttons in player
      showinfo: 0, // Hide the video title
      modestbranding: 1, // Hide the Youtube Logo
      loop: 1, // Run the video in a loop
      fs: 0, // Hide the full screen button
      autohide: 0, // Hide video controls when playing
      rel: 0,
      enablejsapi: 1
    }
  };

  return (
    <section className="loading" id="home-banner-box">
      <div className="video-background">
        <div
          className="video-foreground embed-responsive embed-responsive-16by9"
          id="YouTubeBackgroundVideoPlayer"
        >
          <YouTube
            onReady={onReady}
            onStateChange={onStateChange}
            opts={opts}
            videoId="W0LHTWG-UmQ"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
