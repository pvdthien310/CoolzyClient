import React from 'react'
import { Typography, Button } from "@mui/material";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import Grid from '@mui/material/Grid';

import { ListBrand, ProductList } from "./child";

import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import  NavBar  from '../../components/navbar/index';
import { Helmet } from 'react-helmet';
import Footer from '../../components/footer';

const ProductForCustomer = () => {
    const { categoryId } = useParams();
    const navigate = useNavigate()
    return (
        <>
        <Helmet>
            <title>Product</title>
        </Helmet>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <NavBar />
            <Grid container sx={{mt:10, mb: 10}}>
                <Grid item xs={2}>
                    <div >
                        <ListBrand />
                    </div>
                </Grid>

                <Grid item xs={10}>
                    <ProductList categoryId={categoryId} />
                </Grid>

            </Grid>
            <Footer/>
        </div >
        </>
    )
}

const CustomFillButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: grey[900],
    '&:hover': {
        backgroundColor: grey[700],
    },
    padding: '6px 35px',
    marginLeft: '20px',
    borderRadius: '10px'

}));

const CustomOutlineButton = styled(Button)(({ theme }) => ({
    color: grey[900],
    borderColor: grey[900],
    borderWidth: 1,
    borderStyle: 'solid',
    '&:hover': {
        backgroundColor: grey[900],
        color: theme.palette.getContrastText(grey[900]),
    },
    padding: '6px 35px',
    marginLeft: '20px',
    borderRadius: '10px'

}));

export default ProductForCustomer;