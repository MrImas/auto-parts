import React from 'react';

import Modal from './Modal';

export const ErrorModal = (props) => {
  return (
    <Modal
      open={Boolean(props.error)}
      onClose={props.clearError}
      onClickOk={props.clearError}
      title='Error Has Occured... :('
    >
      {props.error}
    </Modal>
  );
};
