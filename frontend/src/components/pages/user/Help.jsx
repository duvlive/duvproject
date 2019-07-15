import React from 'react';
import TopMessage from 'components/common/TopMessage';

const Help = () => (
  <div className="main-app">
    <TopMessage message="Help" />

    <section className="app-content">
      <div className="row">
        <div className="col-sm-8">
          <h4 className="main-app__subtitle">Help</h4>
        </div>
        <div className="col-sm-4">Help</div>
      </div>
    </section>
  </div>
);

export default Help;
