import {
    Typography, Stack,
    CircularProgress, Grid,
    Snackbar, Alert,
    Dialog, DialogTitle,
    DialogContent, DialogContentText,
    DialogActions, Button,
    Slide, Backdrop
} from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../../components";
import OrderCard from "../../components/orderCard";
import OrderItemCard from "../../components/orderItemCard";
import { currentUser } from "../../redux/selectors";
import { getAllOrder, updateOrder } from "../../redux/slices/orderSlice";
import Footer from '../../components/footer';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const TransactionHistory = () => {
    const _currentUser = useSelector(currentUser)
    const dispatch = useDispatch()
    const [myHistory, setMyHistory] = useState(null)
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [warn, setWarn] = useState({
        message: "",
        status: false,
        severity: ""
    })

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setWarn({
            ...warn,
            message: "",
            status: false
        });
    };

    const [openDialog, setOpenDialog] = useState(false);

    const handleNo = () => {
        setOpenDialog(false);
    };

    const [openBackdrop, setOpenBackdrop] = useState(false);

    const ChooseItem = (item) => { setSelectedOrder(item) }

    const cancelItem = (item) => {
        if (item.status === "shipping") {
            setWarn({
                ...warn,
                message: "This order has been shipping, you can not cancel it. Contact us for more information",
                status: true,
                severity: "warning"
            })
        } else {
            setSelectedOrder(item)
            setOpenDialog(true)
        }
    }

    const handleYes = async () => {
        handleNo()
        setOpenBackdrop(true)
        try {
            let temp = {
                ...selectedOrder,
                status: 'canceled'
            }
            const resultAction = await dispatch(updateOrder(temp))
            const originalPromiseResult = unwrapResult(resultAction)
            var index = myHistory.indexOf(selectedOrder)
            setOpenBackdrop(false)
            setMyHistory([
                ...myHistory.slice(0, index),
                ...myHistory.slice(index + 1, myHistory.length)
            ]);
            setWarn({
                ...warn,
                message: 'Canceled successfully',
                severity: "success",
                status: true
            })
        } catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError);
        }
    }

    useEffect(() => {
        async function getTransactionHistory() {
            try {
                const resultAction = await dispatch(getAllOrder())
                const originalPromiseResult = unwrapResult(resultAction)
                setMyHistory(originalPromiseResult.reverse().filter(ite => ite.email == _currentUser.email && ite.status != "canceled"))
            } catch (rejectedValueOrSerializedError) {
                console.log(rejectedValueOrSerializedError);
            }
        }

        getTransactionHistory()

        return () => {
            setMyHistory([]);
        };
    }, [_currentUser])
    return (
        <Stack>
            <Navbar />
            <Grid container sx={{mt: 15, mb: 10}}>
                <Grid item xs={6} sx={{ p: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                    <Typography variant="h5" fontWeight={'bold'} sx={{ m: 2 }}>History</Typography>
                    {
                        _currentUser && myHistory ?
                            <Stack sx={{ p: 2 }}>
                                {
                                    myHistory.map((item, i) => (
                                        <OrderCard key={i} handleCancelOrder={cancelItem} order={item} handleChooseItem={ChooseItem}>

                                        </OrderCard>
                                    ))
                                }
                            </Stack>
                            :
                            <Stack>
                                <CircularProgress></CircularProgress>
                            </Stack>
                    }
                </Grid>
                <Grid item xs={5} sx={{ p: 2 }}>
                    <Typography variant="h5" fontWeight={'bold'} sx={{ m: 2 }}>Order Item List</Typography>
                    {
                        selectedOrder ?
                            <Stack sx={{ justifyContent: 'center' }}>
                                {
                                    selectedOrder.items.map((item, i) => (
                                        <OrderItemCard key={i} item={item}>
                                        </OrderItemCard>
                                    ))
                                }
                            </Stack> :
                            <Stack sx={{ p: 3 }}>Choose Order To Show ! </Stack>
                    }
                </Grid>
                <Snackbar open={warn.status} autoHideDuration={5000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={warn.severity} sx={{ width: '100%' }}>
                        {warn.message}
                    </Alert>
                </Snackbar>

                <Dialog
                    open={openDialog}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleNo}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Cancelation order confirm"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Are you sure want to cancel this order ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleNo}>No</Button>
                        <Button onClick={handleYes}>Yes</Button>
                    </DialogActions>
                </Dialog>

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={openBackdrop}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>

            </Grid>

            <Footer/>
        </Stack>
    )
}

export default TransactionHistory;