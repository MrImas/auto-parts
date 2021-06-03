import React, { useContext, useState } from 'react';
import {
  IconButton,
  TableRow,
  TableCell,
  Collapse,
  Box,
  Typography,
  Table,
  TableHead,
} from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import BlockIcon from '@material-ui/icons/Block';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

import { AuthContext } from '../../shared/context/auth-context';
const HEADERS = ['Product ID', 'Quantity']; //'Total Price'

export const OrderItem = (props) => {
  const auth = useContext(AuthContext);
  const { id, createdAt, status, cart } = props.order;
  const [open, setOpen] = useState(false);

  const rowClickedHandler = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size='small' onClick={rowClickedHandler}>
            {open ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
          </IconButton>
        </TableCell>
        <TableCell>{id}</TableCell>
        <TableCell>{createdAt && createdAt.split('T')[0]}</TableCell>
        <TableCell>{status}</TableCell>
        {auth.isAdmin && status === 'Awaiting' ? (
          <>
            <TableCell>
              <IconButton
                onClick={() => props.statusHandler(id, 'Declined')}
                size='small'
              >
                <BlockIcon />
              </IconButton>
            </TableCell>
            <TableCell>
              <IconButton
                onClick={() => props.statusHandler(id, 'Approved')}
                size='small'
              >
                <ThumbUpIcon />
              </IconButton>
            </TableCell>
          </>
        ) : null}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={1}>
              <Typography variant='h5'>Cart</Typography>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    {HEADERS.map((header, index) => (
                      <TableCell key={index}>{header}</TableCell>
                    ))}
                  </TableRow>
                  {cart.map((prodAndQunatityObj) => (
                    <TableRow key={prodAndQunatityObj.id}>
                      <TableCell>{prodAndQunatityObj.productId}</TableCell>
                      <TableCell>{prodAndQunatityObj.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableHead>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
