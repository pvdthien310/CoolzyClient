
import React from 'react'
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';

import Footer from '../../components/footer'
import Navbar from '../../components/navbar'

import clothesApi from './../../api/clothesAPI';

import { Helmet } from 'react-helmet';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Grid, Box, Paper, Stack, Select } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import './style.css'
import ProductPhotoSwiper from '../../components/productPhotoSwiper';

const ProductDetail = () => {
  const { id } = useParams()
  const [item, setItem] = useState({})
  const [sizeValue, setSizeValue] = useState('')
  const [quantityValue, setQuantityValue] = useState(0)

  useEffect(() => {
    const getItem = () => {
      clothesApi.getById(id)
        .then(res => setItem(res.data))
        .catch(err => console.log(err))
    }

    getItem()

    console.log(item)
    console.log(item.size)

  }, [id])

  const handleChangeSize = (event) => {
    setSizeValue(event.target.value);
  };

  const handleIncrementQuantity = () => {
    setQuantityValue(quantityValue + 1);
  };

  const handleDecrementQuantity = () => {
    setQuantityValue(quantityValue - 1);
  };

  const QuantityButton = () => {
    console.log(quantityValue)
    console.log(sizeValue.quantity)

    useEffect(() => {

    },[quantityValue])

    const style = {
      width: 10,
      height: 30,
      background: '#000',
      color: '#fff',
      fontWeight: 'bold',
      borderRadius: 10,
    }

    return (
      <>
        <ButtonGroup aria-label="small outlined button group"
          sx={{ marginLeft: 2, marginTop: 0.5 }}>
          {
            quantityValue == 1 ?
              <ThemeProvider theme={btnTheme}>
                <Button variant="contained" onClick={handleDecrementQuantity} sx={style} disable > - </Button>
              </ThemeProvider>
              :
              <ThemeProvider theme={btnTheme}>
                <Button variant="contained" onClick={handleDecrementQuantity} sx={style}> - </Button>
              </ThemeProvider>
          }

          <div className="quantity__button-text">{quantityValue}</div>

          {
            quantityValue == sizeValue.quantity ?
              <ThemeProvider theme={btnTheme}>
                <Button variant="contained" onClick={handleIncrementQuantity} sx={style} disable> + </Button>
              </ThemeProvider>
              :
              <ThemeProvider theme={btnTheme}>
                <Button variant="contained" onClick={handleIncrementQuantity} sx={style}> + </Button>
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
                  ///  value={sizeValue}
                    defaultValue={item.size[0]}
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
                        <MenuItem key={key} value={size}>{size.name}</MenuItem>
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
                    }}>Buy now</Button>
                  </ThemeProvider>
                </Stack>
              </Box>


            </Grid>

            <Grid sx={6}>

            </Grid>

          </Grid>

        </Box>
      </div>

      {/* <ProductPhotoSwiper/> */}
      <Footer />

    </div>
  )
}

export default ProductDetail