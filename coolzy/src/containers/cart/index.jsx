import React from 'react'
import { Stack, Grid } from "@mui/material";
import { Navbar, Footer } from '../../components/index';
import Header from './header';
import ListCart from './listCart';
import Summary from './summary';

const Cart = () => {

    return (
        <Stack>
            <Navbar />
            <Header />
            <Grid container >
                <Grid item xs={8}>
                    <ListCart />
                </Grid>

                <Grid item xs={4}>
                    <Summary />
                </Grid>
            </Grid>
            <Footer />
        </Stack>
    )
}

export default Cart;