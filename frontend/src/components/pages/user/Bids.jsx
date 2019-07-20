import React from 'react';
import TopMessage from 'components/common/TopMessage';
import bids from 'data/events/bids';
import EntertainerViewCard from 'components/common/EntertainerViewCard';

const Bids = () => (
  <div className="main-app">
    <TopMessage message="All Bids" />

    <section className="app-content">
      {' '}
      <div className="card card-custom card-blue">
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
          <EntertainerViewCard.List data={bids} showApproveBtn={true} />
        </div>
      </section>
    </section>
  </div>
);

export default Bids;
