import React from 'react';
import TopMessage from 'components/common/layout/TopMessage';
import BackEndPage from 'components/common/layout/BackEndPage';
import AwardCard from 'components/common/utils/AwardCard';

const Badges = () => (
  <BackEndPage title="Badges">
    <div className="main-app">
      <TopMessage message="4 assigned badges" />

      <section className="app-content">
        <section className="gallery">
          <div className="row">
            <AwardCard
              color="yellow"
              date="Sun, April 17, 2019"
              title="Completed 20 Events"
            />
            <AwardCard
              color="white"
              date="Sun, April 17, 2019"
              title="Has over 10 five star ratings"
            />
            <AwardCard
              color="red"
              date="Sun, April 17, 2019"
              title="Completed over 10 Events"
            />
            <AwardCard
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

export default Badges;
