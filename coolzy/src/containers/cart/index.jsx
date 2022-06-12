import React from 'react'
import { Stack, Grid } from "@mui/material";
import { Navbar, Footer } from '../../components/index';
import Header from './header';
import ListCart from './listCart';
import Summary from './summary';
import Helmet from 'react-helmet';

const Cart = () => {

    return (
        <Stack direction="column" sx={{ height: '100%', position: 'absolute', backgroundColor: '#F0F8FF' }}>

            <Navbar />
            <Header />
            {/* <Helmet>
                <title>Cart</title>
            </Helmet> */}
            {/* <Stack> */}


            <Grid container sx={{ height: "100%" }} >
                <Grid item xs={8}>
                    <ListCart />
                </Grid>

                <Grid item xs={4}>
                    <Summary />
                </Grid>
            </Grid>
            <Footer />
            {/* </Stack> */}

        </Stack>
    )
}

export default Cart;