import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const DuvLiveModal = ({
  actionText,
  actionFn,
  body,
  children,
  className,
  closeModalText,
  title
}) => {
  const [modal, setModal] = useState(false);
  return (
    <div>
      <div onClick={() => setModal(!modal)}>{children}</div>
      <Modal
        className={className}
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <ModalHeader toggle={() => setModal(!modal)}>{title}</ModalHeader>
        <ModalBody>{body}</ModalBody>
        <ModalFooter>
          {actionText && (
            <Button color="btn btn-success btn-transparent" onClick={actionFn}>
              {actionText}
            </Button>
          )}
          <Button
            color="btn btn-danger btn-transparent"
            onClick={() => setModal(!modal)}
          >
            {closeModalText}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

DuvLiveModal.propTypes = {
  actionFn: PropTypes.func,
  actionText: PropTypes.string,
  body: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  closeModalText: PropTypes.string,
  title: PropTypes.string.isRequired
};

DuvLiveModal.defaultProps = {
  actionFn: () => {},
  actionText: '',
  className: '',
  closeModalText: 'Close'
};

export default DuvLiveModal;
