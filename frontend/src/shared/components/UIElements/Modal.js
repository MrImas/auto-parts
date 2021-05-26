import React from 'react';
import Modal, {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from '@material-ui/core';

import Button from '../FormElements/Button';

const ModalCustomized = (props) => {
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Card>
        <CardHeader title={props.title} />
        <CardContent>
          <Typography component='p'>{props.children}</Typography>
        </CardContent>
        <CardActions>
          <Button>OK</Button>
        </CardActions>
      </Card>
    </Modal>
  );
};

export default ModalCustomized;
