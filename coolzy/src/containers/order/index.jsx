import * as React from 'react';
import { useDispatch } from 'react-redux'
// import { getAllInvoice } from '../../redux/slices/invoiceSlice';
import { unwrapResult } from '@reduxjs/toolkit';
// import Row from '../../components/InvoiceRow';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { getAllOrder } from './../../redux/slices/orderSlice';
import Row from './../../components/ordersRow/index';
import { Box, Stack } from '@mui/material';


const BGImg = styled('img')({
    height: '100%',
    width: '100%',
    position: 'fixed',

})

const OrderManager = () => {

    const [orderList, setOrderList] = React.useState([])

    const dispatch = useDispatch()

    //for paginating
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    React.useEffect(() => {
        async function fetchInvoice() {
            if (orderList.length === 0) {
                try {
                    const resultAction = await dispatch(getAllOrder())
                    const originalPromiseResult = unwrapResult(resultAction)
                    setOrderList(originalPromiseResult)
                } catch (rejectedValueOrSerializedError) {
                    console.log(rejectedValueOrSerializedError);
                }
            }
        }
        fetchInvoice()
        return () => {
            setOrderList({});
        };
    }, [])

    return (
        <Stack direction="column"
            sx={{
                width: "100%",
                height: "100%",
                justifyItems: 'flex-start',
                alignItems: 'flex-start',
                backgroundColor: 'grey',
                overflowY: 'auto'
            }}
        >
            <Box
                sx={{
                    width: '40%',
                    height: '35%',
                    boxShadow: 10,
                    borderRadius: 3,
                    alignItems: 'center',
                    justifyItems: 'center',
                    backgroundColor: 'white'
                }}
            >
                <Stack sx={{
                    // width: "100%",
                    // height: "100%"
                    width: '40%',
                    height: '35%',
                }}>
                    <TableContainer
                        sx={{
                            backgroundColor: 'transparent',
                            padding: '2%',
                            zIndex: 0,
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            position: 'absolute'
                        }}
                        component={Paper}
                    >
                        <Typography
                            style={{
                                marginLeft: '40%',
                                marginTop: '0%',
                                marginBottom: '2%',
                                fontWeight: 800,
                                fontSize: '30px',
                                color: 'black'
                            }}
                        >
                            Orders Management
                        </Typography>
                        <Table aria-label="collapsible table">
                            <TableHead style={{ backgroundColor: '#F2F2F2', borderRadius: '15px' }}>
                                <TableRow>
                                    <TableCell />
                                    <TableCell style={{ color: '#0D0D0D', fontWeight: 'bold' }}>Invoice ID</TableCell>
                                    <TableCell align="center" style={{ color: '#0D0D0D', fontWeight: 'bold' }}>Customer ID</TableCell>
                                    <TableCell align="center" style={{ color: '#0D0D0D', fontWeight: 'bold' }}>Date</TableCell>
                                    <TableCell align="center" style={{ color: '#0D0D0D', fontWeight: 'bold' }}>Total (VND)</TableCell>
                                    <TableCell align="center" style={{ color: '#0D0D0D', fontWeight: 'bold' }}>Status</TableCell>
                                    <TableCell align="center" style={{ color: '#0D0D0D', fontWeight: 'bold' }}>Print out</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orderList
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <Row key={row._id} row={row} />
                                    ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 50]}
                            component="div"
                            style={{ color: 'white' }}
                            // count={invoiceList.length}
                            count={50}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                </Stack>
            </Box>
        </Stack >
    )
}

export default OrderManager