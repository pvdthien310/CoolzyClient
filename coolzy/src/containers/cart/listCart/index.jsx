import React, { useState, useEffect } from 'react'
import styles from './styles';
import { useSelector } from 'react-redux';
import cartApi from '../../../api/cartAPI';

import { Typography, Button, Stack, Grid } from "@mui/material";
import CartItem from './cartItem';

const ListCart = () => {
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