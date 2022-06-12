import React, { useState, useEffect } from 'react'
import styles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import cartApi from '../../../api/cartAPI';

import { Typography, Button, Stack, Grid } from "@mui/material";
import CartItem from './cartItem';
import accountApi from './../../../api/accountAPI';
import { accountSlice } from '../../../redux/slices/accountSlices';

const ListCart = () => {
    const dispatch = useDispatch()
    let userId = useSelector(state => state.account.user._id)

    useEffect(() => {
        if (userId) {
            accountApi.getAccountWithID(userId).then(res => {
                if (res.status == 200) {
                    dispatch(accountSlice.actions.updateCart(res.data.listCarts))
                }
            })
        }

    }, [userId])
    let listCarts = useSelector(state => state.account.user.listCarts)

    return (
        <Stack sx={styles.container}>
            <Typography variant='h5'>Carts </Typography>
            {listCarts && listCarts.map((item, index) => (
                <CartItem key={index} item={item} />
            ))}

        </Stack>
    )
}

export default ListCart;