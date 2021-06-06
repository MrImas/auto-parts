import React, { useContext, useEffect, useState } from 'react';
import {
  Card,
  Paper,
  TableContainer,
  Table,
  TableRow,
  Typography,
  TableCell,
  TableHead,
  TableBody,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import { ErrorModal } from '../../shared/components/UIElements/ErrorModal';
import { LoadingSpinner } from '../../shared/components/UIElements/LoadingSpinner';
import { OrderItem } from '../components/OrderItem';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const HEADERS = [
  ' ',
  'Payment ID',
  'Date Of Purchase',
  'Status',
  'Total Price',
];

export const History = () => {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const [historyOfOrders, setHistoryOfOrders] = useState();
  const [isLoading, error, sendHttpRequest, clearError] = useHttpClient();

  useEffect(() => {
    const fetchHistory = async () => {
      const responseData = await sendHttpRequest(
        `http://localhost:5000/api/users/history`,
        'GET',
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setHistoryOfOrders(responseData.history);
    };
    fetchHistory();
  }, [sendHttpRequest, auth.token]);

  return (
    <Card>
      {error && <ErrorModal error={error} clearError={clearError} />}
      <div className={classes.root}>
        {isLoading && <LoadingSpinner />}
        {historyOfOrders && (
          <>
            <Typography variant='h2'>HISTORY</Typography>
            <Typography variant='h5'>
              You have {historyOfOrders.length} orders
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    {HEADERS.map((header, index) => (
                      <TableCell key={index}>{header}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {historyOfOrders.map((order) => (
                    <OrderItem key={order.id} order={order} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </div>
    </Card>
  );
};
