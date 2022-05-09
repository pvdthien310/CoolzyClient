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


const BGImg = styled('img')({
    height: '100%',
    width: '100%',
    position: 'fixed',

})

const OrdersManagement = () => {

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
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
            }}
        >
            {console.log(orderList)}
            <BGImg src='https://images.unsplash.com/photo-1562869327-575fcdd475f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' />
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
                        fontWeight: 'bold',
                        fontSize: '30px',
                        color: '#F2F2F2'
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
                            {/* <TableCell align="center" style={{ color: '#0D0D0D', fontWeight: 'bold' }}>Is Checked ?</TableCell> */}
                            {/* <TableCell align="center" style={{ color: '#0D0D0D', fontWeight: 'bold' }}>Recieved&nbsp;(USD)</TableCell> */}
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
                    style={{ color: '#F2F2F2' }}
                    // count={invoiceList.length}
                    count={50}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

            </TableContainer>
        </div>
    )
}

export default OrdersManagement