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
import { Grid, InputBase, IconButton, Divider, Snackbar, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { getAllOrder } from './../../redux/slices/orderSlice';
import Row from './../../components/ordersRow/index';
import { Box, Stack } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

import { styles } from './style'
import { TextField } from '@mui/material';
import { Button } from '@mui/material';

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
                    setmasterData(originalPromiseResult)
                } catch (rejectedValueOrSerializedError) {
                    console.log(rejectedValueOrSerializedError);
                }
            }
        }
        fetchInvoice()
        return () => {
            setOrderList({});
            setmasterData({})
        };
    }, [])

    const [search, setSearch] = React.useState('')
    const [masterData, setmasterData] = React.useState([])

    const searchFilter = (text) => {
        if (text) {
            const newData = masterData.filter((item) => {
                const itemData = item.email ?
                    item.email.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setOrderList(newData);
            setSearch(text);
        } else {
            setOrderList(masterData);
            setSearch(text);
        }
    }

    const makeDate = (ostr) => {
        let temp = ostr.slice(0, 10)
        let here = new Date(ostr)
        return here;
    }

    const [fromDate, setFromDate] = React.useState('');
    const [toDate, setToDate] = React.useState('')
    const [output, setOutput] = React.useState([])
    const [changeDataBySearch, setChangeDataBySearch] = React.useState(false)

    const [openSnackbar, setOpenSnackbar] = React.useState(false)

    const handleCloseSnackbar = () => setOpenSnackbar(false)

    const handleSearch = () => {
        let temp = []
        if (new Date(fromDate) > new Date(toDate)) {
            setOpenSnackbar(true)
        } else {
            orderList.map((i) => {
                if (fromDate != '') {
                    if (toDate != '') {
                        if ((makeDate(i.date) >= new Date(fromDate)) && (makeDate(i.date) <= new Date(toDate))) {
                            temp.push(i)
                        }
                    } else {
                        if (makeDate(i.date) >= new Date(fromDate)) {
                            temp.push(i)
                        }
                    }
                } else {
                    if (toDate != '') {
                        if (makeDate(i.date) <= new Date(toDate)) {
                            temp.push(i)
                        }
                    } else {
                        setChangeDataBySearch(false)
                        return;
                    }
                }
            })
            setOutput(temp)
            setChangeDataBySearch(true)
        }
    }

    const handleRefresh = () => {
        setFromDate('')
        setToDate('')
        setChangeDataBySearch(false)
        setOrderList(masterData)
    }

    return (
        <div>
            <Box sx={{ mt: 2, ml: 15, mr: 15 }}>
                <Grid container spacing={2} >
                    <Grid xs={12} item>
                        <Stack direction="row" spacing={2}>
                            <Paper
                                component="form"
                                sx={{ p: '2px 4px 2px 2px', display: 'flex', alignItems: 'center', width: 350 }}
                            >
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="Search invoice by email"
                                    inputProps={{ 'aria-label': 'search invoice by email' }}
                                    value={search}
                                    onChange={(text) => searchFilter(text.target.value)}
                                />
                            </Paper>
                            <TextField
                                id="date"
                                label="From"
                                type="date"
                                value={fromDate}
                                sx={{
                                    width: 150,
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={e => setFromDate(e.target.value)}
                            />
                            <TextField
                                id="date"
                                label="To"
                                type="date"
                                value={toDate}
                                sx={{
                                    width: 150,
                                    ml: 3
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={e => setToDate(e.target.value)}
                            />
                            <Divider sx={{ height: 50, m: 0.5 }} orientation="vertical" />
                            <IconButton onClick={handleSearch} sx={{ p: '10px' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                            <IconButton onClick={handleRefresh} sx={{ p: '10px' }}>
                                <RefreshIcon />
                            </IconButton>
                        </Stack>
                        <div >
                            <TableContainer component={Paper} sx={{ marginTop: 2, width: '100%' }}>
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell />
                                            <StyledTableCell align='center'>
                                                <Typography variant="button" sx={styles.title}>Invoice ID</Typography>
                                            </StyledTableCell>
                                            <StyledTableCell align='center'>
                                                <Typography variant="button" sx={styles.title}>Customer ID</Typography>
                                            </StyledTableCell>
                                            <StyledTableCell align='center'>
                                                <Typography variant="button" sx={styles.title}>Date</Typography>
                                            </StyledTableCell>
                                            <StyledTableCell align='center'>
                                                <Typography variant="button" sx={styles.title}>Total (USD)</Typography>
                                            </StyledTableCell>
                                            <StyledTableCell align='center'>
                                                <Typography variant="button" sx={styles.title}>Status</Typography>
                                            </StyledTableCell>
                                            <StyledTableCell align='center'>
                                                <Typography variant="button" sx={styles.title}>Print</Typography>
                                            </StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {changeDataBySearch != true ? (
                                            orderList
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row) => (
                                                    <Row key={row._id} row={row} />
                                                ))
                                        ) : (
                                            output.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row) => (
                                                    <Row key={row._id} row={row} />
                                                ))
                                        )}
                                    </TableBody>
                                </Table>
                                <TablePagination
                                    rowsPerPageOptions={[10, 25, 50]}
                                    component="div"
                                    style={{}}
                                    count={orderList.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    sx={{ color: 'black' }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </TableContainer>
                        </div>
                    </Grid>
                </Grid>
            </Box>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="warning" sx={{ width: '100%' }}>
                    From date can not be greater than To Date
                </Alert>
            </Snackbar>
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



