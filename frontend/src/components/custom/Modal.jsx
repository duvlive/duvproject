import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Image from 'components/common/utils/Image';

const DuvLiveModal = ({
  actionButtonColor,
  actionText,
  actionFn,
  body,
  cancelButtonColor,
  children,
  childrenClassName,
  className,
  closeModalText,
  title,
}) => {
  const [modal, setModal] = useState(false);
  const handleAction = () => {
    actionFn();
    setModal(!modal);
  };
  return (
    <Fragment>
      <span className={childrenClassName} onClick={() => setModal(!modal)}>
        {children}
      </span>
      <Modal
        className={className}
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        {title && (
          <ModalHeader toggle={() => setModal(!modal)}>{title}</ModalHeader>
        )}
        <ModalBody>{body}</ModalBody>
        <ModalFooter>
          {actionText && (
            <Button
              color={`btn btn-${actionButtonColor} btn-transparent`}
              onClick={handleAction}
            >
              {actionText}
            </Button>
          )}
          <Button
            color={`btn btn-${cancelButtonColor} btn-transparent`}
            onClick={() => setModal(!modal)}
          >
            {closeModalText}
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

DuvLiveModal.propTypes = {
  actionButtonColor: PropTypes.string,
  actionFn: PropTypes.func,
  actionText: PropTypes.string,
  body: PropTypes.node.isRequired,
  cancelButtonColor: PropTypes.string,
  children: PropTypes.node.isRequired,
  childrenClassName: PropTypes.string,
  className: PropTypes.string,
  closeModalText: PropTypes.string,
  title: PropTypes.node,
};

DuvLiveModal.defaultProps = {
  actionButtonColor: 'success',
  actionFn: () => {},
  actionText: '',
  cancelButtonColor: 'danger',
  childrenClassName: 'duvlive-modal',
  className: '',
  closeModalText: 'Close',
  title: null,
};

DuvLiveModal.ViewEntertainerProfile = ({ entertainer }) => (
  <DuvLiveModal
    body={
      <>
        <Image
          className="avatar--medium"
          name={(entertainer && entertainer.stageName) || ''}
          responsiveImage={false}
          rounded={false}
          src={
            (entertainer &&
              entertainer.personalDetails &&
              entertainer.personalDetails.profileImageURL) ||
            ''
          }
        />
        {(entertainer && entertainer.about) || ''}
      </>
    }
    title={entertainer && entertainer.stageName}
  >
    <button className="btn btn-info btn-sm btn-transparent">
      View Profile
    </button>{' '}
  </DuvLiveModal>
);

DuvLiveModal.ViewEntertainerProfile.propTypes = {
  entertainer: PropTypes.object.isRequired,
};

export default DuvLiveModal;
