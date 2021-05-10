import React from 'react';
import { Button } from '@material-ui/core';

const ButtonCustomized = (props) => {
  return (
    <Button
      disabled={props.disabled || false}
      type={props.type}
      variant={props.variant || 'contained'}
      size={props.size || 'large'}
      onClick={props.onClick}
      color={props.color || 'secondary'}
    >
      {props.children}
    </Button>
  );
};

export default ButtonCustomized;
