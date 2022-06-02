import React, { useState, useEffect } from 'react'
import styles from './styles'
import { useSelector } from 'react-redux';

import { Typography, Button, Stack } from "@mui/material";
import { styled } from '@mui/material/styles';

const Summary = () => {
    let listCarts = useSelector(state => state.account.user.listCarts)
    const [total, setTotal] = useState()
    useEffect(() => {
        let total = 0
        if (listCarts) {
            listCarts.map(e => {
                if (e.cloth) {
                    total = (+total * 1000 + + e.cloth.price * 1000 * +e.quantity) / 1000
                }
            })

            setTotal(total)
        }

    }, [listCarts])

    return (
        <Stack sx={styles.container}>
            <Typography variant='h5'>Summary</Typography>
            <Stack direction='row' sx={styles.rowContainer}>
                <Typography>Subtotal</Typography>
                <Typography>{total}$</Typography>
            </Stack>

            <Stack direction='row' sx={styles.rowContainer}>
                <Typography>Estimated Delivery</Typography>
                <Typography> 0$</Typography>
            </Stack>

            <Stack direction='row' sx={styles.rowContainerTotal}>
                <Typography sx={{ fontWeight: 'bold' }}>Total</Typography>
                <Typography>{total}$</Typography>
            </Stack>

            <CustomFillButton>Checkout</CustomFillButton>
        </Stack>
    )
}

const CustomFillButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#272727'),
    backgroundColor: '#272727',
    '&:hover': {
        backgroundColor: '#505050',
    },
    padding: '6px 35px',

}));

export default Summary;