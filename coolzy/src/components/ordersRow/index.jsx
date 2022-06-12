import * as React from 'react';
import { useDispatch } from 'react-redux'
import ReactToPrint from 'react-to-print';
// import { updateInvoice } from '../../redux/slices/invoiceSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';


import CusInfo from './../ordersCusInfo/index';

import Header from '../CounterHeader';
import MainDetails from '../CounterMainDetails';
import ClientDetails from '../CounterClientDetails';
import Dates from '../CounterDates';
import TablePrint from '../CounterTablePrint';
import Notes from '../CounterNotes';
import Footer from '../CounterFooter';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import CircularProgress from '@mui/material/CircularProgress';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import { Modal } from '@mui/material';
import { Stack } from '@mui/material';
import TableOrderItem from '../ordersTableItem';
import { currentUser } from '../../redux/selectors';
import ProdInfo from './../ordersProdInfo/index';
import { updateOrder } from '../../redux/slices/orderSlice';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const steps = ['Preparing', 'Shipping', 'Delivered'];

const Row = (props) => {

    const componentRef = React.useRef()
    const handlePrint = () => {
        window.print()
    }
    const _currentUser = useSelector(currentUser)

    const { row } = props;
    const [open, setOpen] = React.useState(false);

    //for open backdrop
    const [openBackdrop, setOpenBackdrop] = React.useState(false);
    const handleCloseBackdrop = () => {
        setOpenBackdrop(false);
    };
    const handleToggleBackdrop = () => {
        setOpenBackdrop(!openBackdrop);
    };

    //Get customer information
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const openHover = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    //Get product information
    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const handleClickProductId = (event) => {
        setAnchorEl2(event.currentTarget)
    }
    const handleProductPopoverOpen = (event) => {
        setAnchorEl2(event.currentTarget);
    };
    const handleProductPopoverClose = () => {
        setAnchorEl2(null);
    };
    const openProductHover = Boolean(anchorEl2);
    const id2 = open ? 'simple-popover' : undefined;


    //Execute process of managing invoice
    const [disablePaid, setDisablePaid] = React.useState(false)

    const [status, setStatus] = React.useState(row.status)

    const [dataForUpdate, setDataForUpdate] = React.useState({
        _id: row._id,
        total: row.total,
        status: row.status
    })

    //for snackbar
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const [updating, setUpdating] = React.useState(false)

    const dispatch = useDispatch()

    React.useEffect(() => {
        if (updating === true) {
            setOpenBackdrop(true)
        } else {
            setOpenBackdrop(false)
        }
    }, [updating])

    const handleClickPaidInvoice = async () => {
        setUpdating(true)
        let temp = dataForUpdate
        try {
            if (status === "preparing") {
                temp = {
                    ...dataForUpdate,
                    status: "shipping",
                    total: Total()
                }
                setStatus("shipping");
            } else {
                temp = {
                    ...dataForUpdate,
                    status: "shipped",
                    total: Total()
                }
                setStatus("shipped");
            }
            const resultAction = await dispatch(updateOrder(temp))
            const originalPromiseResult = unwrapResult(resultAction)
            console.log(originalPromiseResult)
            setActiveStep(activeStep + 1)
            setUpdating(false)
            setOpenSnackbar(true)
            setDisablePaid(false)
        } catch (rejectedValueOrSerializedError) {
            // handle error here
            console.log(rejectedValueOrSerializedError.message);
        }
    }

    function Total() {
        let total = 0;
        for (let i = 0; i < row.items.length; i++) {
            total = total + Number(row.items[i].total)
        }
        return total;
    }

    const [orderTotal, setOrderTotal] = React.useState(0)

    React.useEffect(() => {
        if (orderTotal === 0) {
            setOrderTotal(Total())
        }
    }, [])

    const [openModalBill, setOpenModalBill] = React.useState(false)
    const closeModalBill = () => {
        setOpenModalBill(false)
    }

    const [activeStep, setActiveStep] = React.useState(0);

    React.useEffect(() => {
        let t = false
        const setActive = () => {
            if (row.status === "preparing") {
                setActiveStep(1)
            } else if (row.status === "shipping") {
                setActiveStep(2)
            } else {
                setActiveStep(3)
            }
        }
        if (t === false) {
            setActive()
            t = true
        }
    }, [])

    return (

        <React.Fragment >
            <TableRow sx={{ '& > *': { borderBottom: 'set' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        // sx={{ backgroundColor: '#141E26' }}
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon sx={{ color: 'black' }} /> : <KeyboardArrowDownIcon sx={{ color: 'black' }} />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>
                    {row._id}
                </TableCell>
                <TableCell align="center">
                    <Button
                        aria-describedby={id}
                        onClick={handleClick}
                        variant="text"
                    >
                        <p style={{ color: 'green', fontSize: '13px', fontStyle: 'normal' }}>{row.email}</p>
                    </Button>
                    <Popover
                        id={id}
                        open={openHover}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <CusInfo email={row.email} />
                    </Popover>
                </TableCell>
                <TableCell align="center" style={{ color: 'black' }}>{row.date}</TableCell>
                <TableCell align="center" style={{ color: 'black', fontWeight: 'bold' }}>{orderTotal}</TableCell>
                <TableCell align="center">
                    <Box sx={{ width: '100%' }}>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel sx={{ fontSize: '7px' }}>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <div>
                            <React.Fragment>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    {activeStep !== steps.length ? (
                                        <Button onClick={handleClickPaidInvoice} sx={{ fontSize: '9px' }} >
                                            Done
                                        </Button>
                                    ) : (
                                        null
                                    )}
                                </Box>
                            </React.Fragment>
                        </div>
                    </Box>
                </TableCell>
                {status === "shipped" ? (
                    <TableCell align="center" width="auto">
                        <Button sx={{ color: 'green' }} onClick={() => setOpenModalBill(true)}>Print</Button>
                    </TableCell>
                ) : (
                    <TableCell align="center" sx={{ fontStyle: 'italic' }}>
                        <Typography>Execute</Typography>
                    </TableCell>
                )}
            </TableRow>
            <TableRow sx={{ '& > *': { borderBottom: 'set', backgroundColor: 'white' } }}>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, backgroundColor: 'white', marginLeft: '10%' }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h7" style={{ fontWeight: 'bold', color: 'black', textDecoration: 'underline', fontStyle: 'italic' }} gutterBottom component="div">
                                Details:
                            </Typography>
                            <Typography variant="h8" style={{ fontWeight: 'bold', color: 'black' }} gutterBottom component="div">
                                Paid by: {row.method}
                            </Typography>
                            <Typography variant="h8" style={{ fontWeight: 'bold', color: 'black' }} gutterBottom component="div">
                                Ship to: {row.address}
                            </Typography>
                            <Typography variant="h8" style={{ fontWeight: 'bold', color: 'black' }} gutterBottom component="div">
                                Contact to: {row.phone}
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: 'bold', color: 'black' }}>Product ID</TableCell>
                                        <TableCell align="center" style={{ color: 'black' }}>Amount</TableCell>
                                        <TableCell align="center" style={{ color: 'black' }}>Total price (USD)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.items.map((detailsRow) => (
                                        detailsRow._itemid != null ? (
                                            <TableRow key={detailsRow._itemid}>
                                                <TableCell component="th" scope="row">
                                                    <Button
                                                        aria-describedby={id}
                                                        onClick={handleProductPopoverOpen}
                                                        style={{ fontWeight: 'bold', color: 'black', fontStyle: 'italic' }}
                                                    >
                                                        {detailsRow._itemid}
                                                    </Button>
                                                    <Popover
                                                        id={id}
                                                        open={openProductHover}
                                                        anchorEl={anchorEl2}
                                                        anchorOrigin={{
                                                            vertical: 'top',
                                                            horizontal: 'right',
                                                        }}
                                                        onClose={handleProductPopoverClose}
                                                    // disableRestoreFocus
                                                    >
                                                        <ProdInfo productID={detailsRow._itemid} />
                                                    </Popover>
                                                </TableCell>
                                                <TableCell align="center">{detailsRow.quantity}</TableCell>
                                                <TableCell align="center" style={{ fontWeight: 'bold', color: 'black' }}>{detailsRow.total}</TableCell>
                                            </TableRow>
                                        ) : (
                                            null
                                        )
                                    )
                                    )}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Updated successfully !
                </Alert>
            </Snackbar>
            <Modal
                open={openModalBill}
                onClose={closeModalBill}

            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '45%',
                    height: 'auto',
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    p: 4,
                    boxShadow: 5,
                    borderRadius: 10,
                }}
                >
                    <Stack ref={componentRef} sx={{ paddingTop: '3rem' }} direction="column" width="100%">
                        <Stack direction="row" width="100%" sx={{ marginRight: '2rem', backgroundColor: 'grey' }}>
                            <Stack direction="column" width="100%">
                                <Header handlePrint={handlePrint} />
                                <Dates
                                    invoiceDate={row.date}
                                />
                            </Stack>
                            <Stack direction="column" width="100%">
                                <h1
                                    style={{
                                        fontSize: '30px',
                                        fontWeight: 'bold',
                                        letterSpacing: '0.1rem',

                                        color: 'black'
                                    }}
                                >
                                    Coolzy
                                </h1>
                            </Stack>
                        </Stack>
                        {/* <div style={{ height: '0.5px', backgroundColor: 'grey', marginLeft: '3rem', marginRight: '3rem' }}> </div> */}
                        <Stack direction="row" width="100%" sx={{ marginRight: '2rem', marginTop: '1.5rem', backgroundColor: 'grey' }}>
                            <Stack width="50%">
                                <ClientDetails
                                    clientName={row.name}
                                    clientAddress={row.address}
                                />
                            </Stack>
                            <Stack>
                                <MainDetails contact={_currentUser.phoneNumber} name={"Printed by " + _currentUser.name}
                                    address={"Coolzy Store"} />
                            </Stack>
                        </Stack>

                        <TableOrderItem
                            list={row.items}
                            total={orderTotal}
                        />
                        <Notes notes="Online" />
                        <div style={{ marginLeft: '2rem', marginRight: '2rem', height: '1px', backgroundColor: 'gray' }}></div>
                        <Footer
                            name={"Printed by " + _currentUser.name}
                            email={"Printer Email: " + _currentUser.email}
                            phone={"Printer phone: " + _currentUser.phoneNumber}
                        />
                    </Stack>
                    <ReactToPrint
                        trigger={() => (
                            <Button style={{ marginTop: '5%', width: '50%', marginLeft: '50%' }} variant="outlined">
                                Print / Download
                            </Button>
                        )}
                        content={() => componentRef.current}
                    // onAfterPrint={() => AfterPrint()}
                    />
                </Box>
            </Modal>
        </React.Fragment >
    )
}

export default Row