import React from 'react';
import { Button, Typography } from '@material-ui/core';

import Input from '../../shared/components/FormElements/Input';
import './AddCategory.css';

export const AddCategory = () => {
  return (
    <div className='add-category'>
      <Typography variant='h6'>CATEGORY</Typography>
      <form className='category-form'>
        <Input />
        <Button variant='contained' size='large' color='secondary'>
          ADD
        </Button>
      </form>
    </div>
  );
};
