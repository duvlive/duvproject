import React from 'react';
import PropTypes from 'prop-types';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';

const Badges = () => (
  <BackEndPage title="Badges">
    <div className="main-app">
      <TopMessage message="4 available badges" />

      <section className="app-content">
        <section className="gallery">
          <div className="row">
            <Badges.Card
              color="yellow"
              date="Sun, April 17, 2019"
              title="Completed 20 Events"
            />
            <Badges.Card
              color="white"
              date="Sun, April 17, 2019"
              title="Has over 10 five star ratings"
            />
            <Badges.Card
              color="red"
              date="Sun, April 17, 2019"
              title="Completed over 10 Events"
            />
            <Badges.Card
              color="blue"
              date="Sun, April 17, 2019"
              title="DUV LIVE Certified Entertainer"
            />
          </div>
        </section>
      </section>
    </div>
  </BackEndPage>
);

Badges.Card = ({ title, color, date }) => (
  <div className="col-sm-4">
    <div className={`card card-custom card-tiles card-${color} card__no-hover`}>
      <div className="text-center">
        <i className="icon icon-xl icon-badge"></i>
      </div>
      <div className="card-body m-0 fh-3 text-center">
        <h4 className="subtitle--4 text-white mb-1">{title}</h4>
        <div className="small--3 text-gray">{date}</div>
      </div>
    </div>
  </div>
);

Badges.Card.propTypes = {
  color: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default Badges;
