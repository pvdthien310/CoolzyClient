import React, { useState, useEffect } from 'react'
import { Stack, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import './styles.css'

import categoryApi from './../../../api/categoryAPI';

const AddProduct = () => {
    const [listCategory, setListCategory] = useState()

    const tabTheme = createTheme({
        palette: {
            primary: {
                main: '#272727'
            },
        },
    })

    const [data, setData] = useState({
        name: '',
        brand: '',
        price: '',
        categoryId: '',
        description: '',
        sizes: [
            {
                id: 0,
                name: 'S',
                quantity: 0
            },
            {
                id: 1,
                name: 'M',
                quantity: 0
            },
            {
                id: 2,
                name: 'L',
                quantity: 0
            },
        ]
    })

    const handleChange = (prop) => (event) => {
        setData({ ...data, [prop]: event.target.value });
    };

    useEffect(() => {
        const getCategories = () => {
            categoryApi.getAll().then(res => {
                if (res.status == 200) {
                    console.log(res.data)
                    setListCategory(res.data)
                }
            })
                .catch(err => console.log(err))
        }

        getCategories()
    }, [])

    useEffect(() => {
        console.log(data)
    }, [data])
    return (
        <ThemeProvider theme={tabTheme}>
            <Grid container spacing={2} columns={9}>

                <Grid item xs={5} >
                    <Item>
                        <ProductImages />
                    </Item>

                </Grid>

                <Grid item xs={4} >
                    <Item>
                        <Stack>
                            <TextField label="Name" variant="standard" value={data.name} onChange={handleChange('name')} />
                            <TextField label="Brand" variant="standard" value={data.brand} onChange={handleChange('brand')} sx={{ marginTop: 2 }} />
                            <TextField label="Price" variant="standard" value={data.price} onChange={handleChange('price')} sx={{ marginTop: 2 }} />
                            {listCategory && <Autocomplete
                                onChange={(event, value) => {
                                    setData({ ...data, categoryId: value._id })

                                }}
                                disablePortal
                                options={listCategory}
                                getOptionLabel={(option) => option.name}
                                isOptionEqualToValue={(option, value) => option.id === value._id}
                                sx={{ width: 300, marginTop: 2 }}
                                renderInput={(params) => <TextField {...params} variant="standard" label="Category" />}
                            />
                            }
                            <TextField label="Description" variant="standard" sx={{ marginTop: 2 }} />

                            <Typography sx={{ marginTop: 2 }}>Sizes</Typography>
                            <AmountSize />
                        </Stack>

                    </Item>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'start',
    margin: 5
}));

const ProductImages = (imgList) => {
    return (
        <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
            <SwiperSlide>
                <Stack >
                    <img src="https://product.hstatic.net/1000378196/product/z2596904682306_9aae9bca908ae414669d93acf4c06b0b_79ff477757e348fcbcae5c10cf43d7d8_master.jpg" alt='' />
                </Stack>
            </SwiperSlide>

            <SwiperSlide>
                <Stack>
                    <img src="https://product.hstatic.net/1000378196/product/z2596904682306_9aae9bca908ae414669d93acf4c06b0b_79ff477757e348fcbcae5c10cf43d7d8_master.jpg" alt='' />
                </Stack>
            </SwiperSlide>

            <SwiperSlide>
                <Stack>
                    <img src="https://product.hstatic.net/1000378196/product/z2596904682306_9aae9bca908ae414669d93acf4c06b0b_79ff477757e348fcbcae5c10cf43d7d8_master.jpg" alt='' />
                </Stack>
            </SwiperSlide>

            <SwiperSlide>
                <Stack>
                    <img src="https://product.hstatic.net/1000378196/product/z2596904682306_9aae9bca908ae414669d93acf4c06b0b_79ff477757e348fcbcae5c10cf43d7d8_master.jpg" alt='' />
                </Stack>
            </SwiperSlide>
        </Swiper>
    )
}

const AmountSize = () => {
    const data = [
        {
            id: 0,
            name: 'S',
            quantity: 0
        },
        {
            id: 1,
            name: 'M',
            quantity: 0
        },
        {
            id: 2,
            name: 'L',
            quantity: 0
        },
    ]
    return (
        <Stack sx={{ marginTop: 0.5 }}>
            {
                data.map((item, i) => (
                    <SizeItem item={item} key={i} />
                ))
            }
        </Stack>
    )
}

const SizeItem = ({ item }) => {
    return (
        <Grid container spacing={2} columns={10} sx={{ alignItems: 'center' }}>
            <Grid item xs={0.5} >
                <p>{item.name}</p>
            </Grid>

            <Grid item xs={0} >
                <IconButton >
                    <KeyboardArrowLeftRoundedIcon fontSize="inherit" />
                </IconButton>
            </Grid>

            <Grid item xs={0} >
                <Input placeholder="" sx={{ width: 40 }} />
            </Grid>

            <Grid item xs={0} >
                <IconButton>
                    <ChevronRightRoundedIcon fontSize="inherit" />
                </IconButton>
            </Grid>

        </Grid>

    )
}
export default AddProduct;