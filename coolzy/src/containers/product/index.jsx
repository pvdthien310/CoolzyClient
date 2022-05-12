import { Button, Stack, Typography } from "@mui/material";
import { Route, Routes, useNavigate } from "react-router-dom";
import AddProduct from "./addProduct";
import EditProduct from "./editProduct";
import DisplayProduct from './displayProduct';
import './styles.css'

import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const ProductManager = () => {
    const navigate = useNavigate()
    return (
        <div className="product_manager">

            <div className="product_manager__button">
                <CustomFillButton onClick={() => navigate('manager/product/add')}>New</CustomFillButton>
                <CustomOutlineButton onClick={() => navigate('manager/product/edit')}>Edit</CustomOutlineButton>
            </div>

            <Routes>
                <Route path="manager/product/:categoryId" element={<DisplayProduct />}></Route>
                <Route path="manager/product/add" element={<AddProduct />}></Route>
                <Route path="manager/product/edit" element={<EditProduct />}></Route>
            </Routes>
        </div>

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

export default ProductManager;