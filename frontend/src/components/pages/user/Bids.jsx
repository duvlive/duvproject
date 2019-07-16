import React from 'react';
import Image from 'components/common/Image';
import TopMessage from 'components/common/TopMessage';
import Stars from 'components/common/Stars';
import Modal from 'components/custom/Modal';
import bids from 'data/events/bids';

const Bids = () => (
  <div className="main-app">
    <TopMessage message="All Bids" />

    <section className="app-content">
      {' '}
      <div className="card card-custom card__no-hover card-blue">
        <div className="card-body">
          <h5 className="card-title blue">Party DJ</h5>
          <div className="row">
            <div className="col-sm-4">
              <p className="">
                I am holding a beach party. I need a DJ to play 80s music for me
                and my friends.
              </p>

              <span className="">Address</span>
              <address>
                Pan-Atlantic University, Km 22 Lekki - Epe Expressway, Ajah,
                Lagos, Nigeria
              </address>
            </div>
            <div className="col-sm-4">
              <div className="table-responsive">
                <table className="table table-dark">
                  <tbody>
                    <tr>
                      <td>Entertainer</td>
                      <td className="text-right">DJ</td>
                    </tr>
                    <tr>
                      <td>Event Date</td>
                      <td className="text-right">17th Apr, 2019</td>
                    </tr>
                    <tr>
                      <td>Location</td>
                      <td className="text-right">Lagos</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="table-responsive">
                <table className="table table-dark">
                  <tbody>
                    <tr>
                      <td>Budget</td>
                      <td className="text-right">N50,000 - N150,000</td>
                    </tr>
                    <tr>
                      <td>Need</td>
                      <td className="text-right">Party DJ</td>
                    </tr>
                    <tr>
                      <td>Bid closes on</td>
                      <td className="text-right">17th Apr, 2019</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="payments">
        <div className="row">
          <Bids.List bids={bids} />
        </div>
      </section>
    </section>
  </div>
);

Bids.Card = ({ price, entertainer }) => (
  <div className="col-sm-4">
    <div className="card card-custom card-tiles card-black text-center">
      <div className="card-body">
        <Image
          className="avatar--large"
          name={entertainer.stage_name}
          src={entertainer.img.profile}
        />
        <div className="card-subtitle card-subtitle--3 mt-2 mb-0 gray">
          {entertainer.stage_name}
        </div>
        <Stars rating={entertainer.ratings.average} />
        <h4 className="card-subtitle--1 white mt-4 mb-0">N{price}</h4>
      </div>
      <div className="card-footer">
        <Modal
          body={entertainer.summary}
          title={
            <Image
              className="avatar--medium"
              name={entertainer.stage_name}
              rounded={false}
              src={entertainer.img.profile}
            />
          }
        >
          <button className="btn btn-info btn-sm btn-transparent">
            View Profile
          </button>{' '}
        </Modal>
        &nbsp; &nbsp;
        <button className="btn btn-success btn-sm btn-transparent">
          Approve Bid
        </button>
      </div>
    </div>
  </div>
);

Bids.List = ({ bids }) => {
  return bids.map(({ id, price, entertainer }) => (
    <Bids.Card entertainer={entertainer} key={id} price={price} />
  ));
};

export default Bids;
