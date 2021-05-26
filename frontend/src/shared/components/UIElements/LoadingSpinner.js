import React from 'react';
import CircularProgerss from '@material-ui/core/CircularProgress';

export const LoadingSpinner = (props) => {
  return (
    <div>
      <CircularProgerss
        thickness={props.thickness || 5}
        size={props.size || '5rem'}
        variant={props.variant || 'indeterminate'}
      />
    </div>
  );
};
