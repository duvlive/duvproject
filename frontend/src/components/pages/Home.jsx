import React from 'react';
import Header from 'components/common/Header';
import BorderedListItem from '../custom/BorderedListItem';

const noGoSpoilYourPartyList = [
  {
    title: 'Register Your Account',
    description:
      'Creating an account is easy, consectetur adipiscing elit. Etiam varius leo felis, a tincidunt ex molestie quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
  },
  {
    title: 'Enter Your Event Details',
    description:
      'Enter your events details, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam varius leo felis, a tincidunt ex molestie quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
  },
  {
    title: 'Choose Your Entertainer',
    description:
      'Either by getting bids from our trusted entertainers or by recommendation, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam varius leo felis, a tincidunt ex molestie quis.'
  }
];

const Home = () => {
  return (
    <div className="home">
      <section className="landing">
        <div className="card bg-dark text-white">
          <Header />
          <div className="card-img-overlay">
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
              <button
                className="btn btn-light btn-lg hvr-sweep-to-right"
                href="/"
              >
                Become an Entertainer
              </button>
            </p>
          </div>
        </div>
      </section>
      <section className="intro spacer">
        <div className="container-fluid">
          <h2 className="header">
            NO GO SPOIL{' '}
            <span className="d-sm-inline d-block">YOUR PARTY O!!!</span>
          </h2>
          <div className="row pt-5">
            <BorderedListItem.List items={noGoSpoilYourPartyList} />{' '}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
