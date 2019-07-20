import React from 'react';
import TopBar from 'components/common/TopBar';

const LandingSection = () => (
  <section className="landing">
    <div className="card card__dashboard bg-dark text-white">
      <TopBar />
      <div className="card-img-overlay">
        <div className="card-img-overlay__content">
          <h2 className="card-title">Dashboard</h2>
          <p className="card-subtitle">DUV LIVE &nbsp;/ &nbsp;Dashboard</p>
        </div>
      </div>
    </div>
  </section>
);
export default LandingSection;
