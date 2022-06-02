import * as React from 'react';
import { useDispatch } from 'react-redux'
// import { getAllInvoice } from '../../redux/slices/invoiceSlice';
import { unwrapResult } from '@reduxjs/toolkit';
// import Row from '../../components/InvoiceRow';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { tableCellClasses } from '@mui/material/TableCell';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getAllOrder } from './../../redux/slices/orderSlice';
import Row from './../../components/ordersRow/index';
import { Box, Stack } from '@mui/material';

import { styles } from './style'

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
        <div>
            <Box sx={{ mt: 2, ml: 25, }}>
                <Grid container spacing={2} >
                    <Grid xs={10} item>
                        <div >
                            <TableContainer component={Paper} sx={{ marginTop: 2, width: '100%' }}>
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell />
                                            <StyledTableCell>
                                                <Typography variant="button" sx={styles.title}>Invoice ID</Typography>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <Typography variant="button" sx={styles.title}>Customer ID</Typography>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <Typography variant="button" sx={styles.title}>Date</Typography>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <Typography variant="button" sx={styles.title}>Total</Typography>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <Typography variant="button" sx={styles.title}>Status</Typography>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <Typography variant="button" sx={styles.title}>Print out</Typography>
                                            </StyledTableCell>
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
                            </TableContainer>
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
export default OrderManager