import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Row, Col } from 'reactstrap';
import Header from 'components/common/layout/Header';
import BorderedListItem from '../../custom/BorderedListItem';
import Text from '../../common/utils/Text';
import noGoSpoilYourPartyList from 'data/duvSteps.js';
import eventLists from 'data/events.js';
import Footer from 'components/common/layout/Footer';
import Slideshow from 'components/custom/Slideshow';
import { SLIDESHOW_TYPE, USER_TYPES, DASHBOARD_PAGE } from 'utils/constants';
import YouTube from 'react-youtube';
import { Link } from '@reach/router';
import LiveYourBestLife from 'components/common/utils/LiveYourBestLife';
import Quotes from 'components/common/utils/Quotes';
import PlayingMusicAnimation from 'components/common/utils/PlayingMusicAnimation';
import LoadingScreen from 'components/common/layout/LoadingScreen';
import { getUserTypeFromStore, getTokenFromStore } from 'utils/localStorage';

const Home = () => {
  const [entertainers, setEntertainers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    axios.get(`/api/v1/entertainers`).then(function (response) {
      const { status, data } = response;
      // handle success
      if (status === 200) {
        setEntertainers(data.entertainers);
        setLoading(false);
      }
    });
  }, []);
  return (
    <div className="home">
      <LandingSection />
      <IntroSection />
      <LiveYourLifeSection />
      <EntertainerSection entertainers={entertainers} loading={loading} />
      <EventSection />
      <Footer />
    </div>
  );
};

const LandingSection = () => {
  const userType = getUserTypeFromStore();
  const userIsLoggedIn = !!getTokenFromStore();

  console.log('Object.keys(USER_TYPES)', Object.keys(USER_TYPES));
  return (
    <section className="landing">
      <div className="card bg-dark text-white">
        <Header />
        <div className="card-img-overlay">
          <VideoSection />
          <div className="card-img-overlay__content">
            <h2 className="card-title">
              <br />
              DJs, MCs &amp; LIVE BANDs
            </h2>
            <p className="card-text">
              <Link
                className="btn btn-danger btn-lg hvr-sweep-to-right"
                to={
                  userIsLoggedIn
                    ? 'user/hire-entertainer'
                    : 'register/hire-entertainer'
                }
              >
                Hire Entertainers
              </Link>
              &nbsp; &nbsp;
              {userIsLoggedIn ? (
                <Link
                  className="btn btn-light btn-lg hvr-sweep-to-left"
                  to={`/${DASHBOARD_PAGE[userType]}/dashboard`}
                >
                  Go to Dashboard
                </Link>
              ) : (
                <Link
                  className="btn btn-light btn-lg hvr-sweep-to-left"
                  to="register/become-an-entertainer"
                >
                  Become an Entertainer
                </Link>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

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

const LiveYourLifeSection = () => {
  return (
    <section className="live-your-life">
      <Col className="live-your-life__content--1 live-your-life__box" sm="4">
        <Text.VerticalAlign>
          {' '}
          <h2 className="title-border best-life">
            <LiveYourBestLife />
          </h2>
          <p className="text-uppercase">Celebrate the great moments</p>
        </Text.VerticalAlign>
      </Col>
      <Col className="live-your-life__content--2 live-your-life__box" sm="4">
        <Text.VerticalAlign>
          <h3>
            HOW IT <span>WORKS</span>
          </h3>
          <p>
            DUV LIVE is an online platform that supports and promotes the best
            in live entertainment. Our range of services affords talented
            performers the power to manage their bookings personally, while
            delivering world class exposure to all levels of live entertainment.
            Simply hire the entertainer of your choice for that upcoming party
            by following these simple steps:
            <Link className="d-block mt-3" to="/how-it-works">
              Learn more &rarr;
            </Link>
          </p>
        </Text.VerticalAlign>
      </Col>
      <Col
        className="live-your-life__content--3 live-your-life__box position-relative"
        sm="4"
      >
        <Quotes />
        <PlayingMusicAnimation />
      </Col>
    </section>
  );
};

const EntertainerSection = ({ entertainers, loading }) => (
  <section className="entertainers spacer">
    <div className="container-fluid">
      <h2 className="header title-border">
        <span>ENTERTAINER</span>
      </h2>
      <Row className="pt-5">
        {loading ? (
          <LoadingScreen loading={loading} text="Loading Entertainers" />
        ) : (
          <Slideshow
            items={[
              { list: entertainers.slice(0, 6), id: 1 },
              { list: entertainers.slice(6, 12), id: 2 },
              { list: entertainers.slice(12, 18), id: 3 },
            ]}
            type={SLIDESHOW_TYPE.entertainers}
          />
        )}
      </Row>
    </div>
  </section>
);

EntertainerSection.propTypes = {
  entertainers: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

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
            { list: eventLists.slice(6, 9), id: 3 },
          ]}
          type={SLIDESHOW_TYPE.events}
        />
      </Row>
    </div>
  </section>
);

// https://www.internetrix.com.au/blog/how-to-use-youtube-video-as-your-webpage-background-2/
const VideoSection = () => {
  const onReady = (event) => {
    // access to player in all event handlers via event.target
    // event.target.pauseVideo();
    event.target.mute();
    event.target.playVideo();
  };
  const onStateChange = (event) => {
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
      enablejsapi: 1,
    },
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
