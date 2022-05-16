import * as React from 'react';
import { useState, useEffect } from 'react'
import SizeItem from './sizeItem';

import { Stack, Typography, Button } from "@mui/material";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import './styles.css'

import categoryApi from './../../../api/categoryAPI';
import cloudinaryApi from '../../../api/cloudinaryAPI';
import clothesApi from './../../../api/clothesAPI';

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
                name: 'XS',
                quantity: 0
            },
            {
                id: 1,
                name: 'S',
                quantity: 0
            },
            {
                id: 2,
                name: 'M',
                quantity: 0
            },
            {
                id: 3,
                name: 'L',
                quantity: 0
            },
            {
                id: 4,
                name: 'XL',
                quantity: 0
            },
            {
                id: 5,
                name: 'L',
                quantity: 0
            },
            {
                id: 6,
                name: 'XXL',
                quantity: 0
            },


        ],
        images: []
    })

    const [imgDisplays, setImgDisplays] = useState([])
    const [imgFiles, setImgFiles] = useState([])
    const sizeChange = (id, val) => {
        let sizesTemp = data.sizes.map(item => {
            if (item.id == id) {
                return { ...item, quantity: val }

            }
            return item
        })
        setData({ ...data, sizes: sizesTemp })
    }

    const handleChange = (prop) => (event) => {
        setData({ ...data, [prop]: event.target.value });
    };

    useEffect(() => {
        const getCategories = () => {
            categoryApi.getAll().then(res => {
                if (res.status == 200) {
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


    const newImageHandle = (e) => {
        if (e.target.files) {
            const listFile = []
            for (let i = 0; i < e.target.files.length; i++) {
                let reader = new FileReader();
                reader.readAsDataURL(e.target.files[i])
                reader.onloadend = () => {
                    listFile.push(reader.result);
                    if (i == e.target.files.length - 1)
                        setImgFiles(listFile)
                }
            }
        }
        setImgDisplays([...imgDisplays, e.target.files[0]])
    }

    const deleteImageHandle = (name) => {
        let imgList = imgDisplays.filter(item => item.name !== name)
        setImgDisplays(imgList)
    }

    const saveHandle = () => {
        if (checkData()) {
            cloudinaryApi.upload(JSON.stringify({ data: imgFiles })).then(res => {
                console.log(res)
            }).catch(err => console.log(err))

        }
    }
    const checkData = () => {
        if (data.name == "") {
            openAlert('Please fill out name of product')
            return false
        }
        else if (data.brand == "") {
            openAlert('Please fill out brand of product')
            return false
        }
        else if (data.price == "") {
            openAlert('Please fill out price of product')
            return false
        }
        else if (data.categoryId == "") {
            openAlert('Please choose category of product')
            return false
        }
        else if (imgDisplays.length == 0) {
            openAlert('Please insert image for product')
            return false
        }
        else if (data.description == "") {
            openAlert('Please fill out description of product')
            return false
        }
        else if (isNaN(data.price) || data.price < 0) {
            openAlert('Price invalid')
            return false
        }
        else {
            let flag = 0
            data.sizes.forEach(element => {
                if (isNaN(element.quantity) || element.quantity < 0) {
                    openAlert('Quantity of sizes invalid')
                    flag++
                }
            });
            return flag == 0
        }

    }
    const [alertObj, setAlertObj] = useState({
        message: '',
        status: false
    });


    const openAlert = (text) => {
        setAlertObj({ message: text, status: true })
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlertObj({ ...alertObj, status: false });
    };

    return (
        <ThemeProvider theme={tabTheme}>
            <Grid container spacing={2} columns={9}>

                <Grid item xs={5} >
                    <Item>
                        <ProductImages imgList={imgDisplays} deleteImageHandle={deleteImageHandle} />
                    </Item>
                </Grid>

                <Grid item xs={4} >
                    <Item>
                        <Stack>
                            <input type="file" name="file" onChange={newImageHandle} />

                            <TextField label="Name" variant="standard" value={data.name} onChange={handleChange('name')} />
                            <TextField label="Brand" variant="standard" value={data.brand} onChange={handleChange('brand')} sx={{ marginTop: 2 }} />
                            <TextField
                                label="Price"
                                variant="standard"
                                value={data.price}
                                onChange={handleChange('price')}
                                sx={{ marginTop: 2 }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }} />

                            {listCategory && <Autocomplete
                                onChange={(event, value) => {
                                    setData({ ...data, categoryId: value._id })

                                }}
                                disablePortal
                                options={listCategory}
                                getOptionLabel={(option) => option.name}
                                isOptionEqualToValue={(option, value) => option._id === value._id}
                                sx={{ width: 300, marginTop: 2 }}
                                renderInput={(params) => <TextField {...params} variant="standard" label="Category" />}
                            />
                            }
                            <TextField label="Description" variant="standard" value={data.description} onChange={handleChange('description')} sx={{ marginTop: 2 }} />

                            <Typography sx={{ marginTop: 2 }}>Sizes</Typography>
                            <AmountSize data={data.sizes} sizeChange={sizeChange} />

                            <Stack>
                                <CustomFillButton onClick={() => saveHandle()}>Save</CustomFillButton>
                            </Stack>
                        </Stack>

                    </Item>
                </Grid>

                <Snackbar open={alertObj.status} autoHideDuration={5000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" variant="filled">
                        {alertObj.message}
                    </Alert>
                </Snackbar>
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

const ProductImages = ({ imgList, deleteImageHandle }) => {
    return (
        <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
            {
                imgList.map((item, i) => (
                    <SwiperSlide key={i}>
                        <Stack >
                            <IconButton sx={{ alignSelf: 'end' }} onClick={() => deleteImageHandle(item.name)}>
                                <ClearRoundedIcon />
                            </IconButton>
                            <img src={URL.createObjectURL(item)} alt='' />

                        </Stack>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}

const CustomFillButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: grey[900],
    '&:hover': {
        backgroundColor: grey[700],
    },
    padding: '6px 35px',
    marginTop: '20px',
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

const AmountSize = ({ data, sizeChange }) => {

    return (
        <Grid container spacing={2} sx={{ marginTop: 0.5 }}>
            {
                data.map((item, i) => (
                    <SizeItem item={item} key={i} sizeChange={sizeChange} />
                ))
            }
        </Grid>
    )
}

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default AddProduct;