import React from 'react'
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Footer from '../../components/footer'
import Navbar from '../../components/navbar'

import cartApi from './../../api/cartAPI';
import clothesApi from './../../api/clothesAPI';


import { Helmet } from 'react-helmet';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Grid, Box, Paper, Stack, Select } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch } from 'react-redux';

import './style.css'
import ProductPhotoSwiper from '../../components/productPhotoSwiper';
import { useNavigate } from 'react-router-dom';

import { checkoutSlice } from '../../redux/slices/checkoutSlices';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from './../../redux/selectors';
import { getAllFav, addFav } from './../../redux/slices/favoriteSlice';
import { unwrapResult } from '@reduxjs/toolkit';


const ProductDetail = () => {
  const { id } = useParams()
  const userId = useSelector(state => state.account.user._id)
  const [item, setItem] = useState({})
  const [sizeValue, setSizeValue] = useState('')
  const [quantityValue, setQuantityValue] = useState(1)
  const _currentUser = useSelector(currentUser)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [quantityButtonEnable, setQuantityButtonEnable] = useState({
    increase: true,
    decrease: true
  })

  useEffect(async () => {
    const getItem = async () => {
      await clothesApi.getById(id)
        .then(res => setItem(res.data))
        .catch(err => console.log(err))
    }

    await getItem()

  }, [])

  useEffect(() => {
    console.log(quantityButtonEnable)
    console.log(sizeValue.quantity)
  }, [quantityButtonEnable])

  const handleChangeSize = (event) => {
    setSizeValue(event.target.value);
  };

  const handleIncrementQuantity = () => {
    if (quantityValue < sizeValue.quantity) {
      setQuantityButtonEnable({ ...quantityButtonEnable, increase: true });
      setQuantityValue(quantityValue + 1);
      console.log(quantityValue)
    }
    else if (quantityValue == sizeValue.quantity) {
      setQuantityButtonEnable({ ...quantityButtonEnable, increase: false });
    }

  };

  const handleDecrementQuantity = () => {
    if (quantityValue > 1) {
      setQuantityButtonEnable({ ...quantityButtonEnable, decrease: true })
      setQuantityValue(quantityValue - 1);
    }
    else if (quantityValue == 1) {
      setQuantityButtonEnable({ ...quantityButtonEnable, decrease: false })
    }
  };

  const QuantityButton = () => {
    const style = {
      enable: {
        width: 10,
        height: 30,
        background: '#000',
        color: '#fff',
        fontWeight: 'bold',
        borderRadius: 10,
      }
      // ,
      // disable: {
      //   width: 10,
      //   height: 30,
      //   background: '#fff',
      //   color: '#000',
      //   fontWeight: 'bold',
      //   borderRadius: 10,
      // }
    }

    return (
      <>
        <ButtonGroup aria-label="small outlined button group"
          sx={{ marginLeft: 2, marginTop: 0.5 }}>
          {
            quantityButtonEnable.decrease == false ?
              <ThemeProvider theme={btnTheme}>
                <Button variant="contained" onClick={handleDecrementQuantity} sx={style.enable} disable > - </Button>
              </ThemeProvider>
              :
              <ThemeProvider theme={btnTheme}>
                <Button variant="contained" onClick={handleDecrementQuantity} sx={style.enable}> - </Button>
              </ThemeProvider>
          }

          <div className="quantity__button-text">{quantityValue}</div>

          {
            quantityButtonEnable.increase == false ?
              <ThemeProvider theme={btnTheme}>
                <Button variant="contained" onClick={handleIncrementQuantity} sx={style.enable} disable> + </Button>
              </ThemeProvider>
              :
              <ThemeProvider theme={btnTheme}>
                <Button variant="contained" onClick={handleIncrementQuantity} sx={style.enable}> + </Button>
              </ThemeProvider>
          }
        </ButtonGroup>
      </>
    )
  }

  const btnTheme = createTheme({
    shape: {
      borderRadius: 20
    },
    palette: {
      primary: {
        main: '#000',
        outline: '#000',
      }
    },
  })

  const buyNow = () => {

    let listCart = [
      {
        product: item,
        size: sizeValue.size,
        quantity: quantityValue,
        total: item.price * quantityValue
      }
    ]

    if (_currentUser == '')
      navigate('/login')
    else {
      dispatch(checkoutSlice.actions.setListItems(listCart))
      navigate(`/checkout/`)
    }
  }

  const addCartHandle = () => {

  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertObj({ ...alertObj, status: false });
  };

  const [alertObj, setAlertObj] = useState({
    message: '',
    status: false,
    type: 'error'
  });
  const [openBackdrop, setOpenBackdrop] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [favoriteList, setFavoriteList] = useState([])


  //task function
  const fetchYourFavorite = async (listFavorite) => {
    let temp = []
    try {
      const resultAction = await dispatch(getAllFav())
      const originalPromiseResult = unwrapResult(resultAction)
      temp = originalPromiseResult
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].email === _currentUser.email) {
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

  const handleAddToFavorite = async () => {
    setOpenBackdrop(true)
    let isExisted = false;
    favoriteList.map(i => {
      if (i.clotheid === item._id) {
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
        email: _currentUser.email,
        clotheid: item._id
      }
      console.log(temp)
      try {
        const resultAction = await dispatch(addFav(temp))
        const originalPromiseResult = unwrapResult(resultAction)
        setOpenBackdrop(false)
        setAlertObj({
          ...alertObj,
          message: 'Added to favorite successfully',
          status: true,
          type: 'success'
        })
        setFavoriteList([...favoriteList, temp])
        console.log(originalPromiseResult)
      } catch (rejectedValueOrSerializedError) {
        return rejectedValueOrSerializedError
      }
    }
  }

  return (
    <div >
      {
        item && <Helmet>
          <title>
            {item.name}
          </title>
        </Helmet>
      }

      <Navbar />

      <div className="product-detail__container">
        <Box sx={{ height: 'auto', marginTop: 20, marginBottom: 15 }}>
          <Grid container spacing={2}>
            <Grid xs={6}>
              <Box sx={{ marginLeft: 10, marginRight: 10 }}>
                <div className="product-details__container__name">{item.name}</div>
                <div className="product-details__container__price">{item.price}</div>
                <div className="product-details__container__description">{item.description}</div>

                <Stack direction="row" sx={{
                  paddingLeft: 2,
                  paddingTop: 2
                }}>
                  <div className="product-details__container__size-text">size</div>
                  <Select
                    id="demo-simple-select"
                    value={sizeValue}
                    label="Size"
                    sx={{
                      height: 40,
                      marginLeft: 2,
                      width: 100,
                      input: {
                        color: '#FFFFFF',
                      }
                    }}
                    onChange={handleChangeSize}
                  >
                    {item.size &&
                      item.size.map((size, key) => (
                        <MenuItem key={key} value={size}>{size.size}</MenuItem>
                      ))
                    }
                  </Select>

                  <div className="product-details__container__quantity-text">
                    Quantity
                  </div>
                  <QuantityButton />

                </Stack>

                <div className="product-details__container__remains">
                  Remains: {sizeValue.quantity}
                </div>

                <Divider orientation="horizontal" flexItem
                  sx={{
                    marginTop: 3,
                    marginLeft: 4,
                    marginRight: 3
                  }} />

                <Stack direction="row"
                  spacing={4}
                  justifyContent="center"
                  sx={{
                    marginTop: 3,
                  }}>
                  <ThemeProvider theme={btnTheme}>
                    <Button onClick={handleAddToFavorite} variant="outlined" sx={{
                      width: 160,
                      color: "#F54040",
                      borderColor: "#F54040",
                      fontWeight: "bold",

                    }}>Add to favorite</Button>
                  </ThemeProvider>
                  <ThemeProvider theme={btnTheme}>
                    <Button variant="outlined" sx={{
                      width: 160,
                      color: "#000",
                      borderColor: "#000",
                      fontWeight: "bold",

                    }}>Add to cart</Button>
                  </ThemeProvider>

                  <ThemeProvider theme={btnTheme}>
                    <Button variant="contained" sx={{
                      width: 160,
                      color: "#fff",
                      background: '#000',
                      fontWeight: "bold",
                    }}
                      onClick={buyNow}
                    >Buy now</Button>
                  </ThemeProvider>
                </Stack>
              </Box>


            </Grid>

            <Grid xs={6}>
              <Box xs={{ marginTop: 8 }}>
                {
                  item == null ? null :
                    <ProductPhotoSwiper images={item.images} />
                }
              </Box>
            </Grid>

          </Grid>

        </Box>
      </div>


      <Footer />

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
    </div>
  )
}

export default ProductDetail