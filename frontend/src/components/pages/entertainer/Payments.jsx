import React from 'react';
import PropTypes from 'prop-types';
import UserAvatar from 'assets/img/avatar/user.png';
import TopMessage from 'components/common/layout/TopMessage';
import Image from 'components/common/utils/Image';
import BackEndPage from 'components/common/layout/BackEndPage';

const Payments = () => (
  <BackEndPage title="Payments History">
    <div className="main-app">
      <TopMessage message="Payments History" />

      <section className="app-content">
        <section className="payments">
          <h4 className="main-app__subtitle">June 2019</h4>
          <div className="row">
            <Payments.Card color="blue" />
            <Payments.Card color="red" />
            <Payments.Card color="green" />
            <Payments.Card color="black" />
            <Payments.Card color="yellow" />
          </div>
        </section>
      </section>
    </div>
  </BackEndPage>
);

Payments.Card = ({ color }) => (
  <div className="col-sm-4">
    <div className={`card card-custom card-tiles card-${color} card__no-hover`}>
      <div className="card-body">
        <h4 className="subtitle--2 white mb-0">N50, 000</h4>
        <div className="small--1 text-gray">Paid on Apr. 2, 2019</div>
      </div>
      <div className="spacer--tiles--3" />
      <div className="card-footer">
        <div className="row">
          <div className="col-8">
            <h5 className="subtitle--3 mt-2 mb-0 gray">DJ Cuppy</h5>
            <div className="small--3 text-gray">Wedding DJ</div>
          </div>
          <div className="col-4">
            <Image
              bordered
              className="float-right avatar--medium"
              name="Mariam Obi"
              src={UserAvatar}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

Payments.Card.propTypes = {
  color: PropTypes.string.isRequired
};

export default Payments;
