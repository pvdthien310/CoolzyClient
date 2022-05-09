import { Button, Stack, Typography } from "@mui/material";
import { Route, Routes, useNavigate } from "react-router-dom";
import AddProduct from "./addProduct";
import EditProduct from "./editProduct";

const ProductManager = () => {
    const navigate = useNavigate()
    return (
        <Stack>
            <Typography>Product Page</Typography>
            <Button onClick={() => navigate('/add')}>Add</Button>
            <Button onClick={() => navigate('/edit')}>Edit</Button>
            <Routes>
                <Route path="add" element={<AddProduct />}></Route>
                <Route path="edit" element={<EditProduct />}></Route>
            </Routes>
        </Stack>

    )
}

export default ProductManager;