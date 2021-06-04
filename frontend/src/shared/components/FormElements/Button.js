import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const ButtonCustomized = (props) => {
  if (props.to) {
    return (
      <Button
        color={props.color || 'secondary'}
        component={Link}
        size={props.size || 'large'}
        variant={props.variant || 'contained'}
        disabled={props.disabled || false}
        to={props.to}
        exact={props.exact}
        className={props.className}
        style={props.style || {}}
      >
        {props.children}
      </Button>
    );
  }
  return (
    <Button
      disabled={props.disabled || false}
      type={props.type}
      variant={props.variant || 'contained'}
      size={props.size || 'large'}
      onClick={props.onClick}
      color={props.color || 'secondary'}
      style={props.style || {}}
      className={props.className}
    >
      {props.children}
    </Button>
  );
};

export default ButtonCustomized;
