import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { accountSlice } from '../../../../redux/slices/accountSlices';

import clothesApi from './../../../../api/clothesAPI';
import cartApi from '../../../../api/cartAPI'

import { Typography, Button, Stack } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const CartItem = ({ item, handleMoveToFav }) => {
    const dispatch = useDispatch()
    let userId = useSelector(state => state.account.user._id)
    const listCarts = useSelector(state => state.account.user.listCarts)

    const [product, setProduct] = useState()
    useEffect(() => {
        if (listCarts) {
            setProduct(listCarts.find(e => e.id == item.id).cloth)
        }
    }, [listCarts, item])

    useEffect(() => {
        if (!item.cloth) {
            clothesApi.getById(item.clothId).then(res => {
                if (res.status == 200) {
                    let newCart = {
                        id: item.id,
                        cloth: res.data
                    }
                    dispatch(accountSlice.actions.updateClothCart(newCart))
                }
                else {
                    console.log(res.status)
                }
            }).catch(err => console.log(err))
        }
    }, [item.cloth])

    const [size, setSize] = useState('');
    const handleChangeSize = (event) => {
        setSize(event.target.value);

        let newCart = {
            id: item.id,
            size: event.target.value
        }

        cartApi.updateByUserId(userId, newCart).then(res => {
            if (res.status == 200) {
                dispatch(accountSlice.actions.updateSizeCart(newCart))
            }
            else {
                console.log(res.status)
            }
        }).catch(err => console.log(err))

    };

    const [quantity, setQuantity] = useState('');
    const handleChangeQuantity = (event) => {
        setQuantity(event.target.value);

        let newCart = {
            id: item.id,
            quantity: event.target.value
        }

        cartApi.updateByUserId(userId, newCart).then(res => {
            if (res.status == 200) {
                dispatch(accountSlice.actions.updateQuantityCart(newCart))
            }
            else {
                console.log(res.status)
            }
        }).catch(err => console.log(err))

    };

    const [listQuantity, setListQuantity] = useState([])

    useEffect(() => {
        if (item && product) {
            setSize(item.size)
            setQuantity(item.quantity)

            product.size.forEach(element => {
                if (element.size == item.size) {

                    let quantityList = []
                    for (let i = 0; i <= element.quantity; i++) {
                        quantityList.push(i)
                    }
                    setListQuantity(quantityList)

                    return
                }
            });
        }
    }, [product])

    useEffect(() => {
        if (item && product && size) {

            product.size.forEach(element => {
                if (element.size == size) {

                    let quantityList = []
                    for (let i = 0; i <= element.quantity; i++) {
                        quantityList.push(i)
                    }
                    setListQuantity(quantityList)

                    if (element.quantity == 0) {
                        setQuantity(0)
                        let newCart = {
                            id: item.id,
                            quantity: 0
                        }
                        dispatch(accountSlice.actions.updateQuantityCart(newCart))
                    }
                    else if (quantity > element.quantity) {
                        setQuantity(1)
                        let newCart = {
                            id: item.id,
                            quantity: 1
                        }
                        dispatch(accountSlice.actions.updateQuantityCart(newCart))
                    }
                    return
                }
            });
        }
    }, [product, size])

    const removeHandle = () => {
        cartApi.deleteByUserId(userId, item.id).then(res => {
            if (res.status == 200) {
                dispatch(accountSlice.actions.deleteCart(item.id))
            }
            else {
                console.log(res.status)
            }
        }).catch(err => console.log(err))

    }
    return (
        <Stack>
            {product &&
                <Stack direction='row'>
                    <img src={product.images[0]} alt='' style={{ height: '150px', width: '150px' }} />

                    <Stack sx={{ marginLeft: 3 }}>
                        <Typography>{product.name}</Typography>
                        <Typography sx={{ color: 'rgb(103, 103, 103)' }}>{product.brand}</Typography>

                        <Stack direction='row' sx={{ alignItems: 'center' }}>
                            <Typography sx={{ color: 'rgb(103, 103, 103)' }}>Size</Typography>
                            <Select
                                value={size}
                                onChange={handleChangeSize}
                                variant='standard'
                                sx={{ color: 'rgb(103, 103, 103)', marginLeft: 1 }}
                            >
                                {
                                    product.size.map((item, index) => (
                                        <MenuItem key={index} value={item.size}>{item.size}</MenuItem>
                                    ))
                                }
                            </Select>

                            <Typography sx={{ color: 'rgb(103, 103, 103)', marginLeft: 2 }}>Quantity</Typography>
                            <Select
                                value={quantity}
                                onChange={handleChangeQuantity}
                                variant='standard'
                                sx={{ color: 'rgb(103, 103, 103)', marginLeft: 1 }}
                            >
                                {listQuantity.map((item, index) => (
                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                ))}
                            </Select>
                        </Stack>

                        <Stack direction='row' sx={{ marginTop: 5 }}>
                            <Button variant="text" onClick={() => handleMoveToFav(item)} sx={{ color: 'rgb(103, 103, 103)', textDecoration: 'underline', }} >Move to favorite</Button>
                            <Button variant="text" sx={{ color: 'rgb(103, 103, 103)', textDecoration: 'underline', marginLeft: 2 }} onClick={() => removeHandle()}> Remove</Button>
                        </Stack>
                    </Stack>


                </Stack>
            }
            <div style={{ height: '0.1px', width: '100%', backgroundColor: 'rgb(90, 90, 90)', marginTop: '10px', marginBottom: '30px' }}></div>
        </Stack >
    )
}

export default CartItem;