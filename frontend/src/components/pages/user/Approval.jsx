import React from 'react';
import UserAvatar from 'assets/img/avatar/user.png';
import TopMessage from 'components/common/layout/TopMessage';
import Image from 'components/common/utils/Image';
import BackEndPage from 'components/common/layout/BackEndPage';

const Approval = () => (
  <BackEndPage title="Approval">
    <div className="main-app">
      <TopMessage message="Approve as Party DJ" />

      <section className="app-content">
        <div className="card card-custom">
          <div className="card-body">
            <h5 className="card-title blue">Party DJ</h5>
            <div className="row">
              <div className="col-sm-4">
                <p className="">
                  I am holding a beach party. I need a DJ to play 80s music for
                  me and my friends.
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
        <div className="row">
          <Approval.Card color="blue" />
        </div>
      </section>
    </div>
  </BackEndPage>
);

Approval.Card = ({ color }) => (
  <div className="col-sm-4">
    <div className={`card card-custom card-payments card-${color}`}>
      <div className="card-body">
        <h4 className="card-subtitle--1 white mb-0">N50, 000</h4>
        <div className="small--1 text-gray">Paid on Apr. 2, 2019</div>
      </div>
      <div className="spacer--payments" />
      <div className="card-footer">
        <div className="row">
          <div className="col-8">
            <h5 className="card-subtitle card-subtitle--3 mt-2 mb-0 gray">
              DJ Cuppy
            </h5>
            <div className="small--3 text-gray">Wedding DJ</div>
          </div>
          <div className="col-4">
            <Image className="float-right avatar--medium" src={UserAvatar} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Approval;
