import React from 'react';

const Onboarding = () => {
  return (
    <div className="col-md-6 col-xl-3">
      <div className="card m-b-30">
        <div className="card-body">
          <h4 className="card-title font-16 mt-0">Card title</h4>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Cras justo odio</li>
          <li className="list-group-item">Dapibus ac facilisis in</li>
        </ul>
        <div className="card-body">
          <a className="card-link" href="#">
            Card link
          </a>
          <a className="card-link" href="#">
            Another link
          </a>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
