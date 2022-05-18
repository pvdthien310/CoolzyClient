import { Button, Stack, Typography } from "@mui/material";
import { Route, Routes, useNavigate } from "react-router-dom";
import AddProduct from "./addProduct";
import EditProduct from "./editProduct";
import DisplayProduct from './displayProduct';
import './styles.css'

const ProductManager = () => {
    const navigate = useNavigate()
    return (
        <div className="product_manager">
            <Routes>
                <Route path="manager/product/:categoryId" element={<DisplayProduct />}></Route>
                <Route path="manager/product/add" element={<AddProduct />}></Route>
                <Route path="manager/product/edit/:productId" element={<EditProduct />}></Route>
            </Routes>
        </div>

    )
}



export default ProductManager;