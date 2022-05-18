import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import Loading from './../../../components/Loading/loading';
import SizeItem from '../../../components/sizeItem';

import { Stack, Typography, Button } from "@mui/material";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';

import PublicIcon from '@mui/icons-material/Public';
import PublicOffIcon from '@mui/icons-material/PublicOff';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import categoryApi from './../../../api/categoryAPI';
import clothesApi from './../../../api/clothesAPI';
import invoiceAPI from '../../../api/orderAPI';

const EditProduct = () => {
    let navigate = useNavigate()
    const { productId } = useParams();
    const [data, setData] = useState()

    const [published, setPublished] = useState()
    const [listCategory, setListCategory] = useState()
    const [loading, setLoading] = useState(false)
    const tabTheme = createTheme({
        palette: {
            primary: {
                main: '#272727'
            },
        },
    })

    const [imgDisplays, setImgDisplays] = useState([])
    const sizeChange = (id, val) => {
        let sizesTemp = data.size.map(item => {
            if (item.id == id) {
                return { ...item, quantity: val }
            }
            return item
        })
        setData({ ...data, size: sizesTemp })
    }

    useEffect(() => {
        const getCategories = () => {
            categoryApi.getAll().then(res => {
                if (res.status == 200) {
                    setListCategory(res.data)
                }
            })
                .catch(err => console.log(err))
        }

        const getProduct = () => {
            clothesApi.getById(productId).then(res => {
                if (res.status == 200) {
                    setData(res.data)
                    setImgDisplays(res.data.images)
                    setPublished(res.data.published)
                }
            }).catch(err => console.log(err))
        }

        getCategories()
        getProduct()

    }, [productId])

    const saveHandle = () => {
        let count = 0;
        data.size.forEach(element => {
            count += element.quantity
        });

        if (count == 0) {
            openAlert('Please fill out sizes of product', 'error')
            return false
        }
        else {
            setLoading(true)
            clothesApi.update({ _id: productId, size: data.size }).then(res => {
                if (res.status = 200) {
                    openAlert('Update new product successful', 'success')
                    setLoading(false)
                }
            }).catch(err => console.log(err))
        }

    }

    const [alertObj, setAlertObj] = useState({
        message: '',
        status: false,
        type: 'error'
    });

    const openAlert = (text, type) => {
        setAlertObj({ message: text, status: true, type: type })
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlertObj({ ...alertObj, status: false });
    };

    const publishHandle = () => {

        clothesApi.update({ _id: productId, published: !published }).then(res => {
            if (res.status == 200) {
                setPublished(!published)
            }
        })
            .catch(err => console.log(err))
    }

    const deleteHandle = () => {

        invoiceAPI.productExisted(productId).then(res => {
            if (res.data == false) {
                clothesApi.delete(productId).then(res => {
                    if (res.status == 200) {
                        navigate('/manager/product/all')
                    }
                })
            }
            else {
                clothesApi.update({ _id: productId, isAvailable: false }).then(res => {
                    if (res.status == 200) navigate('/manager/product/all')
                })
                    .catch(err => console.log(err))

            }
        }).catch(err => console.log(err))
    }

    const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
    const handleClickOpenConfirmDelete = () => {
        setOpenConfirmDelete(true);
    };
    const handleCloseConfirmDelete = () => {
        setOpenConfirmDelete(false);
    };
    const handleConfirmDelete = () => {
        setOpenConfirmDelete(false);
        deleteHandle()
    };

    const [openConfirmPublish, setOpenConfirmPublish] = useState(false);
    const handleClickOpenConfirmPublish = () => {
        setOpenConfirmPublish(true);
    };
    const handleCloseConfirmPublish = () => {
        setOpenConfirmPublish(false);
    };
    const handleConfirmPublish = () => {
        setOpenConfirmPublish(false);
        publishHandle()
    };

    return (
        <ThemeProvider theme={tabTheme}>
            <div>
                <Stack direction='row' justifyContent='flex-end' alignItems='center'>
                    {published ?
                        <Tooltip title="Product is being published">
                            <IconButton onClick={() => handleClickOpenConfirmPublish()}>
                                <PublicIcon />
                            </IconButton>
                        </Tooltip>
                        :
                        <Tooltip title="Product is not published">
                            <IconButton onClick={() => handleClickOpenConfirmPublish()}>
                                <PublicOffIcon />
                            </IconButton>
                        </Tooltip>
                    }

                    <Tooltip title="Delete product">
                        <IconButton onClick={() => handleClickOpenConfirmDelete()}>
                            <ClearRoundedIcon />
                        </IconButton>
                    </Tooltip>

                </Stack>

                <div>
                    {data && listCategory &&
                        <Grid container spacing={2} columns={8}>

                            <Grid item xs={5} >
                                <Item>
                                    <ProductImages imgList={imgDisplays} />
                                </Item>
                            </Grid>

                            <Grid item xs={3} >
                                <Item>
                                    <Stack>

                                        <Typography sx={{ fontSize: 10, color: '#787878' }} >Name</Typography>
                                        <Typography  >{data.name}</Typography>

                                        <Typography sx={{ marginTop: 1.5, fontSize: 10, color: '#787878' }} >Brand</Typography>
                                        <Typography  >{data.brand}</Typography>

                                        <Typography sx={{ marginTop: 1.5, fontSize: 10, color: '#787878' }} >Price</Typography>
                                        <Typography  >${data.price}</Typography>

                                        <Typography sx={{ marginTop: 1.5, fontSize: 10, color: '#787878' }} >Category</Typography>
                                        <Typography  >{listCategory.find(e => e.id == data.categoryId).name}</Typography>

                                        <Typography sx={{ marginTop: 1.5, fontSize: 10, color: '#787878' }} >Description</Typography>
                                        <Typography  >{data.description}</Typography>

                                        <Typography sx={{ marginTop: 1.5, fontSize: 10, color: '#787878' }} >Sizes</Typography>
                                        <AmountSize data={data.size} sizeChange={sizeChange} />

                                        <Stack>
                                            <CustomOutlineButton disabled={published} onClick={() => saveHandle()}>Save</CustomOutlineButton>
                                        </Stack>
                                    </Stack>

                                </Item>
                            </Grid>

                            <Snackbar open={alertObj.status} autoHideDuration={5000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity={alertObj.type} variant="filled">
                                    {alertObj.message}
                                </Alert>
                            </Snackbar>

                            {
                                loading && <Loading />
                            }

                        </Grid>
                    }
                </div>

                <Dialog
                    open={openConfirmDelete}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCloseConfirmDelete}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Confirm delete"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Are you sure you want to delete this product?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseConfirmDelete}>Cancel</Button>
                        <Button onClick={handleConfirmDelete}>Confirm</Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={openConfirmPublish}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCloseConfirmPublish}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Confirm publish"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Are you sure you want to change the publishing status of your product?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseConfirmPublish}>Cancel</Button>
                        <Button onClick={handleConfirmPublish}>Confirm</Button>
                    </DialogActions>
                </Dialog>
            </div>

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

const ProductImages = ({ imgList }) => {

    return (
        <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
            {
                imgList && imgList.map((item, i) => (
                    <SwiperSlide key={i}>
                        <Stack >
                            <ImageItem item={item} />

                        </Stack>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}

const ImageItem = ({ item }) => {
    let url = ''

    try {
        url = URL.createObjectURL(item)
    }
    catch (err) {
        url = item
    }

    return (
        <img src={url} alt='' />
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
    marginTop: '20px',
    borderRadius: '5px'

}));
const AmountSize = ({ data, sizeChange }) => {

    return (
        <Grid container spacing={2} sx={{ marginTop: 0.5 }}>
            {
                data && data.map((item, i) => (
                    <SizeItem item={item} key={i} sizeChange={sizeChange} />
                ))
            }
        </Grid>
    )
}

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default EditProduct;