import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import categoryApi from '../../api/categoryAPI';
import { categorySlice } from '../../redux/slices/categorySlice';

const CategoryManager = () => {

    let navigate = useNavigate();
    const dispatch = useDispatch()
    let data = useSelector(state => state.category.listCategory)
    useEffect(() => {
        categoryApi.getAll().then(res => {
            if (res.status == 200) {
                dispatch(categorySlice.actions.productListChange(res.data))

            }
        }).catch(err => console.log(err))
    }, [])

    return (
        <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <CategoryInput />
            {data && data.map((item, index) => (
                <CategoryItem item={item} key={index} />
            ))}
        </Stack>

    )
}

const CategoryItem = ({ item }) => {
    const dispatch = useDispatch()
    const deleteHandle = () => {
        categoryApi.deleteById(item._id).then(res => {
            if (res.status == 200) {
                dispatch(categorySlice.actions.deleteCategory(item._id))
            }
        }).catch(err => console.log(err))
    }
    return (
        <Stack direction='row' sx={{ alignItems: 'center' }}>
            <Typography sx={{ minWidth: 200 }}>{item.name}</Typography>
            <IconButton onClick={() => deleteHandle()}>
                <ClearRoundedIcon />
            </IconButton>
        </Stack>
    )
}

const CategoryInput = () => {

    const dispatch = useDispatch()
    const [newCategory, setNewCategory] = useState('')
    const sendNewCategoryHandle = () => {
        if (newCategory != '') {
            categoryApi.create({ name: newCategory }).then(res => {
                if (res.status == 200) {
                    dispatch(categorySlice.actions.addCategory(res.data))
                }
            }).catch(err => console.log(err))
        }
    }

    return (
        <OutlinedInput
            placeholder="New category"
            onKeyPress={e => {
                if (e.key === 'Enter') {
                    sendNewCategoryHandle(); setNewCategory('')
                }
            }}
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
            sx={{ fontSize: 15, width: 250, height: 45, borderRadius: 2, margin: 1 }}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        onClick={() => { sendNewCategoryHandle(); setNewCategory('') }}
                        edge="end"
                    >
                        <AddRoundedIcon />
                    </IconButton>
                </InputAdornment>
            }
        />
    )
}

export default CategoryManager;