import React from 'react';
import Header from 'components/common/Header';

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
          <div className="row">
            <div className="col-lg-8 align-center about">
              <h2 className="header">
                NO GO SPOIL{' '}
                <span className="d-sm-inline d-block">YOUR PARTY O!!!</span>
              </h2>
              <p>
                Lorem ipsum dolor sit amet, ad eos iriure corpora prodesset.
                Partem timeam at vim, mel veritus accusata ea. Ius ei dicam
                inciderint, eleifend deseruisse ei mea. Alia dicam eam te, summo
                exerci ei mei.Ei sea debet choro omittantur. Ea nam quis
                aeterno, et usu semper senserit.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
