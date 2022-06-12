import React, { useState, useEffect } from 'react'
import styles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import cartApi from '../../../api/cartAPI';

import { Typography, Button, Stack, Grid, CircularProgress, Alert, Snackbar, Backdrop } from "@mui/material";
import CartItem from './cartItem';
import accountApi from './../../../api/accountAPI';
import { accountSlice } from '../../../redux/slices/accountSlices';
import { addFav, getAllFav } from './../../../redux/slices/favoriteSlice';
import { unwrapResult } from '@reduxjs/toolkit';

const ListCart = () => {
    const dispatch = useDispatch()
    let userId = useSelector(state => state.account.user._id)
    let userEmail = useSelector(state => state.account.user.email)

    useEffect(() => {
        if (userId) {
            let temp = []
            accountApi.getAccountWithID(userId).then(res => {
                if (res.status == 200) {
                    dispatch(accountSlice.actions.updateCart(res.data.listCarts))
                }
            })
        }

    }, [userId])

    const [openBackdrop, setOpenBackdrop] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [favoriteList, setFavoriteList] = useState([])

    const fetchYourFavorite = async (listFavorite) => {
        let temp = []
        try {
            const resultAction = await dispatch(getAllFav())
            const originalPromiseResult = unwrapResult(resultAction)
            temp = originalPromiseResult
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].email === userEmail) {
                    listFavorite.push(temp[i])
                }
            }
            setIsLoading(false)
        } catch (rejectedValueOrSerializedError) {
            return rejectedValueOrSerializedError
        }
    }

    useEffect(() => {
        if (isLoading === true) {
            let listFavorite = []
            fetchYourFavorite(listFavorite)
            setFavoriteList(listFavorite)
        }
    }, [])

    let listCarts = useSelector(state => state.account.user.listCarts)
    const [cartList, setCartList] = useState([])

    const [alertObj, setAlertObj] = useState({
        message: '',
        status: false,
        type: 'error'
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlertObj({ ...alertObj, status: false });
    };

    const removeHandle = (id) => {
        cartApi.deleteByUserId(userId, id).then(res => {
            if (res.status == 200) {
                dispatch(accountSlice.actions.deleteCart(id))
            }
            else {
                console.log(res.status)
            }
        }).catch(err => console.log(err))

    }
    const handleMoveToFavorite = async (value) => {
        setOpenBackdrop(true)
        console.log(value)
        let isExisted = false;
        favoriteList.map(i => {
            if (i.clotheid === value.clothId) {
                isExisted = true;
            }
        })
        if (isExisted === true) {
            setOpenBackdrop(false)
            setAlertObj({
                ...alertObj,
                message: 'This product was in your favorite',
                status: true,
                type: 'warning'
            })
        } else {
            let temp = {
                email: userEmail,
                clotheid: value.clothId
            }
            try {
                const resultAction = await dispatch(addFav(temp))
                const originalPromiseResult = unwrapResult(resultAction)
                removeHandle(value.id)
                setOpenBackdrop(false)
                setAlertObj({
                    ...alertObj,
                    message: 'Added to favorite successfully',
                    status: true,
                    type: 'success'
                })
                setFavoriteList([...favoriteList, temp])
            } catch (rejectedValueOrSerializedError) {
                return rejectedValueOrSerializedError
            }
        }
    }

    return (
        <Stack sx={styles.container}>
            <Typography variant='h5'>Carts </Typography>
            {listCarts && listCarts.map((item, index) => (
                <CartItem key={index} handleMoveToFav={handleMoveToFavorite} item={item} />
            ))}
            <Snackbar open={alertObj.status} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alertObj.type} variant="filled">
                    {alertObj.message}
                </Alert>
            </Snackbar>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Stack>
    )
}

export default ListCart;