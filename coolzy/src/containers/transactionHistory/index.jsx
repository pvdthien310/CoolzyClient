import { Typography, Stack, CircularProgress, Card, Grid } from "@mui/material";
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
                setMyHistory(originalPromiseResult.filter(ite => ite.email == _currentUser.email))
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
            <Grid item xs={6} sx={{ p: 2 }}>
                <Typography variant="h5" sx={{ width: '100%', alignSelf: 'center' }}>History</Typography>
                {
                    _currentUser && myHistory ?
                        <Stack>
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
            <Grid item xs={6}>
                {
                    selectedOrder &&
                    <Stack sx={{ justifyContent: 'center' }}>
                        <Typography variant="h5" sx={{ width: '100%', alignSelf: 'center' }}>Order Item List</Typography>
                        {
                            selectedOrder.items.map((item, i) => (
                                <OrderItemCard key={i} item={item}>
                                </OrderItemCard>
                            ))
                        }
                    </Stack>
                }
            </Grid>
        </Grid>
    )
}

export default TransactionHistory;