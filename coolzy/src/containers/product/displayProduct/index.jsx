import React from 'react'
import { Typography } from "@mui/material";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import Grid from '@mui/material/Grid';

import LitsBrand from "../../../components/brandFilter";
import ProductList from './../../../components/productList';

const DisplayProduct = () => {
    const { categoryId } = useParams();

    return (
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
    )
}

export default DisplayProduct;