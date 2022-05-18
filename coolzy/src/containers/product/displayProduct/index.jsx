import React from 'react'
import { Typography, Button } from "@mui/material";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import Grid from '@mui/material/Grid';

import LitsBrand from "../../../components/brandFilter";
import ProductList from './../../../components/productList';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const DisplayProduct = () => {
    const { categoryId } = useParams();
    const navigate = useNavigate()
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div style={{ display: 'flex', alignSelf: 'flex-end' }}>
                <CustomFillButton onClick={() => navigate('/manager/product/add')}>New</CustomFillButton>
                {/* <CustomOutlineButton onClick={() => navigate('manager/product/edit')}>Edit</CustomOutlineButton> */}
            </div>
            <Grid container >
                <Grid item xs={2}>
                    <div >
                        <LitsBrand />
                    </div>
                </Grid>

                <Grid item xs={10}>
                    <ProductList categoryId={categoryId} />
                </Grid>

            </Grid>
        </div >
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

export default DisplayProduct;