import React, { useState } from 'react';
import { TextField } from '@material-ui/core';

const InputCustomized = () => {
  const [inputValue, setInputValue] = useState('');

  const changeInputHandler = (event) => {
    setInputValue(event.target.value);
  };

  return <TextField value={inputValue} onChange={changeInputHandler} />;
};

export default InputCustomized;
