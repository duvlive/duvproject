import React from 'react';
import PropTypes from 'prop-types';
import Image from 'components/common/utils/Image';
import Stars from 'components/common/utils/Stars';
import DuvLiveModal from 'components/custom/Modal';

const EntertainerViewCard = ({ price, entertainer, showApproveBtn }) => (
  <div className="col-sm-4">
    <div className="card card-custom card-tiles card-black text-center">
      <div className="card-body">
        <Image
          className="avatar--large"
          name={entertainer.stageName}
          src={entertainer.img.profile}
        />
        <div className="card-subtitle card-subtitle--3 mt-2 mb-0 gray">
          {entertainer.stageName}
        </div>
        <Stars
          name={entertainer.stageName}
          rating={entertainer.ratings.average}
        />
        <h4 className="card-subtitle--1 white mt-4 mb-0">N{price}</h4>
      </div>
      <div className="card-footer">
        <DuvLiveModal.ViewEntertainerProfile entertainer={entertainer} />
        &nbsp; &nbsp;
        {showApproveBtn && (
          <button className="btn btn-success btn-sm btn-transparent">
            Approve Bid
          </button>
        )}
      </div>
    </div>
  </div>
);

EntertainerViewCard.propTypes = {
  entertainer: PropTypes.object.isRequired,
  price: PropTypes.string.isRequired,
  showApproveBtn: PropTypes.bool.isRequired
};

EntertainerViewCard.List = ({ data, showApproveBtn }) => {
  return data.map(({ id, price, entertainer }) => (
    <EntertainerViewCard
      entertainer={entertainer}
      key={id}
      price={price}
      showApproveBtn={showApproveBtn}
    />
  ));
};

EntertainerViewCard.List.propTypes = {
  data: PropTypes.array.isRequired,
  showApproveBtn: PropTypes.bool
};

EntertainerViewCard.List.defaultProps = {
  showApproveBtn: false
};
export default EntertainerViewCard;
