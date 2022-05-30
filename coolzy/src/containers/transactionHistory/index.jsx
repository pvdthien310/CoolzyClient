import { Typography, Stack, CircularProgress, Grid } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderCard from "../../components/orderCard";
import OrderItemCard from "../../components/orderItemCard";
import { currentUser } from "../../redux/selectors";
import { getAllOrder } from "../../redux/slices/orderSlice";

const TransactionHistory = () => {
    const _currentUser = useSelector(currentUser)
    const dispatch = useDispatch()
    const [myHistory, setMyHistory] = useState(null)
    const [selectedOrder, setSelectedOrder] = useState(null)

    const ChooseItem = (item) => { setSelectedOrder(item) }

    useEffect(() => {
        async function getTransactionHistory() {
            try {
                const resultAction = await dispatch(getAllOrder())
                const originalPromiseResult = unwrapResult(resultAction)
                setMyHistory(originalPromiseResult.reverse().filter(ite => ite.email == _currentUser.email))
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
        <Grid container>
            <Grid item xs={6} sx={{ p: 2, justifyContent: 'center', alignItems: 'center', backgroundColor:'white' }}>
                <Typography variant="h5" fontWeight={'bold'} sx={{m: 2}}>History</Typography>
                {
                    _currentUser && myHistory ?
                        <Stack sx={{p: 2 }}>
                            {
                                myHistory.map((item, i) => (
                                    <OrderCard key={i} order={item} handleChooseItem={ChooseItem}>

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
                <Typography variant="h5" fontWeight={'bold'} sx={{m: 2}}>Order Item List</Typography>
                {
                    selectedOrder ?
                    <Stack sx={{ justifyContent: 'center' }}>
                        {
                            selectedOrder.items.map((item, i) => (
                                <OrderItemCard key={i} item={item}>
                                </OrderItemCard>
                            ))
                        }
                    </Stack>:
                    <Stack sx={{p:3}}>Choose Order To Show ! </Stack>
                }
            </Grid>
        </Grid>
    )
}

export default TransactionHistory;