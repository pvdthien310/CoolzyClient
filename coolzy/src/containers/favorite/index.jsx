//importation from libs
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

//Importation from mui
import styled from "styled-components";
import { ShoppingCartCheckoutOutlined } from '@mui/icons-material';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { Typography, Link, Stack, Breadcrumbs, Button, createFilterOptions, TextField, Grid } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

//Importation from component
import Navbar from './../../components/navbar/index';
import ProductInFavorite from './../../components/productInFavorite/index';
import { mobile } from "./responsive";

//Importation from slices, api,...
import { getAllFav, deleteFavoriteById } from './../../redux/slices/favoriteSlice';
import { currentUser } from '../../redux/selectors';
import { getClothesWithID } from '../../redux/slices/clothSlice';
// import { getProductWithID } from '../../redux/slices/productSlice';
// import { addCart } from '../../redux/slices/cartSlice';
import { Autocomplete } from '@mui/material';
import Footer from './../../components/footer/index';
import Header from '../cart/header';
import Helmet from 'react-helmet';

const Container = styled.div`
    background-color: white;
    width: 100%;
    height: 100%
`;

const Wrapper = styled.div`
  padding: 20px;
 background-color: #F2EBDF;

  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  // font-family: serif
`;

const Top = styled.div`
  display: flex;
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: center,
  ${mobile({ flexDirection: "column" })}

`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='d' ref={ref} {...props} />;
});

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const actions = [
    { icon: <ShoppingCartCheckoutOutlined />, name: 'Get all to cart' },
    { icon: <DeleteForeverOutlinedIcon />, name: 'Delete all favorite' }
];

const filter = createFilterOptions();

const FavoritePage = () => {

    //dispatch, selector, navigate,..
    const dispatch = useDispatch()
    const _currentUser = useSelector(currentUser)
    const navigate = useNavigate()

    //data state
    const [favoriteList, setFavoriteList] = useState([])


    //process situation states
    const [isLoading, setIsLoading] = useState(true)
    const [open, setOpen] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [isMovingToCart, setIsMovingToCart] = useState(false);
    const [openMoveToCartSuccess, setOpenMoveToCartSuccess] = useState(false)
    const [openDeleteAllSuccess, setOpenDeleteAllSuccess] = useState(false)
    const [openMoveAllSuccess, setOpenMoveAllSuccess] = useState(false)
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
    const [openConfirmMove, setOpenConfirmMove] = useState(false)
    const [subTotal, setSubTotal] = useState(0)
    const [prodList, setProdList] = useState([])

    //function middle handler
    const handleCloseMovingToCart = () => {
        setIsMovingToCart(false);
    };
    const handleToggleIsMovingToCart = () => {
        setIsMovingToCart(!isMovingToCart);
    };
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseMoveToCartSuccess = () => setOpenMoveToCartSuccess(false)
    const handleCloseDeleteAllSuccess = () => setOpenDeleteAllSuccess(false)
    const handleCloseMoveAllSuccess = () => setOpenMoveAllSuccess(false)
    const handleCloseConfirmDelete = () => setOpenConfirmDelete(false)
    const handleCloseConfirmMove = () => setOpenConfirmMove(false)
    const handleAgree = async (item) => {
        alert('dislike this product')
    }

    //task function
    const fetchYourFavorite = async (listFavorite, listProduct) => {
        let temp = []
        try {
            const resultAction = await dispatch(getAllFav())
            const originalPromiseResult = unwrapResult(resultAction)
            temp = originalPromiseResult
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].email === _currentUser.email) {
                    listFavorite.push(temp[i])
                    const resultAction2 = await dispatch(getClothesWithID(temp[i].clotheid))
                    const originalPromiseResult2 = unwrapResult(resultAction2)
                    listProduct.push(originalPromiseResult2)
                }
            }
            setIsLoading(false)
            await CountTotal(listFavorite, listProduct)
        } catch (rejectedValueOrSerializedError) {
            return rejectedValueOrSerializedError
        }
    }
    const CountTotal = async (_favorite, prList) => {
        let newTotal = 0
        await _favorite.map((item) => {
            let rs = prList.find((ite) => ite.productID == item.productid)
            if (rs != undefined)
                newTotal = newTotal + Number(Number(rs.price) * Number(item.amount))
        })
        setSubTotal(newTotal)
    }

    const handleDeleteOneFav = async (value) => {
        setIsMovingToCart(true)
        try {
            const resultAction = await dispatch(deleteFavoriteById(value._id))
            const originalPromiseResult = unwrapResult(resultAction)
            console.log(originalPromiseResult)
            var index = favoriteList.indexOf(value)
            if (index !== -1) {
                favoriteList.splice(index, 1)
            }
            handleCloseMovingToCart()
            setOpenDeleteAllSuccess(true)
        } catch (rejectedValueOrSerializedError) {
            alert(rejectedValueOrSerializedError)
        }
    }

    const handleMoveItemToMyCart = async (value) => {
        // setIsMovingToCart(true)
        // let newCart = {
        //     userID: _currentUser.userID,
        //     productID: value.productid,
        //     amount: 1
        // }
        // //addCart to db
        // try {
        //     const resultAction = await dispatch(addCart(newCart))
        //     const originalPromiseResult = unwrapResult(resultAction)
        //     console.log(originalPromiseResult)
        // } catch (rejectedValueOrSerializedError) {
        //     alert(rejectedValueOrSerializedError)
        // }
        // //delete favorite
        // try {
        //     const resultAction = await dispatch(deleteFavoriteById(value.favoriteID))
        //     const originalPromiseResult = unwrapResult(resultAction)
        //     var index = favoriteList.indexOf(value)
        //     if (index !== -1) {
        //         favoriteList.splice(index, 1)
        //     }
        //     handleCloseMovingToCart()
        //     setOpenMoveToCartSuccess(true)
        // } catch (rejectedValueOrSerializedError) {
        //     alert(rejectedValueOrSerializedError)
        // }
    }
    const handleDeleteAllFavorite = () => {
        setIsMovingToCart(true) //backdrop
        favoriteList.map((i) => {
            dispatch(deleteFavoriteById(i._id))
        }
        )
        favoriteList.splice(0, favoriteList.length)
        handleCloseMovingToCart()
        handleCloseConfirmDelete()
        setOpenDeleteAllSuccess(true)
    }
    const handleSpeedDialClick = (action) => {
        if (action.name === 'Get all to cart') {
            if (favoriteList.length != 0) {
                setOpenConfirmMove(true)
            }
        } else {
            if (favoriteList.length != 0) {
                setOpenConfirmDelete(true)
            }
        }
    }
    function handleClick(event) {
        event.preventDefault()
        navigate('/myplace')
    }

    const handleClickToHome = (event) => {
        event.preventDefault();
        navigate('/')
    }
    const gotoProductScreen = () => navigate('/productSpace')

    //useEffect..
    useEffect(() => {
        if (isLoading === true) {
            let listFavorite = []
            let listProduct = []
            fetchYourFavorite(listFavorite, listProduct)
            setFavoriteList(listFavorite)
            setProdList(listProduct)
        }
    }, [])

    //Breadcrumb
    const breadcrumbs = [
        <Link
            underline="hover"
            key="2"
            style={{ color: '#000D0A' }}
            href="/myplace"
            onClick={handleClickToHome}
        >
            Home
        </Link>,
        <Link
            underline="hover"
            key="2"
            style={{ color: '#000D0A' }}
            href="/myplace"
            onClick={handleClick}
        >
            My place
        </Link>,
        <Typography key="3" style={{ color: '#000D0A' }}>
            My Favorite
        </Typography>,
    ];

    return (
        <>
        <Helmet>
            <title>Favorite</title>
        </Helmet>
        <Stack>
            <Navbar />
            <Header />
            <Grid container >
                <Grid item xs={8}>
                    <Autocomplete
                        onChange={(event, newValue) => {
                            if (typeof newValue === 'string') {
                                return newValue
                            } else if (newValue && newValue.inputValue) {
                                return newValue.inputValue;
                            } else {
                                navigate(`/productDetail/${newValue._categoryId}/${newValue._id}`)
                            }
                        }}
                        filterOptions={(options, params) => {
                            const filtered = filter(options, params);

                            const { inputValue } = params;
                            // Suggest the creation of a new value
                            const isExisting = options.some((option) => inputValue === option.name);
                            if (inputValue !== '' && !isExisting) {
                                return filtered;
                            }
                            return filtered;
                        }}
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        id="free-solo-with-text-demo"
                        options={prodList}
                        getOptionLabel={(option) => {
                            // Value selected with enter, right from the input
                            if (typeof option === 'string') {
                                return option;
                            }
                            // Add "xxx" option created dynamically
                            if (option.inputValue) {
                                return option.inputValue;
                            }
                            // Regular option
                            return option.name;
                        }}
                        renderOption={(props, option) => <li {...props}>{option.name}</li>}
                        sx={{ width: 400, marginLeft: 41 }}
                        freeSolo
                        renderInput={(params) => (
                            <TextField {...params} label="Search your Favorite" />
                        )}
                    />
                    <Stack sx={{ marginLeft: 40, mt: 2 }}>
                        {
                            favoriteList.map((item, i) => (
                                <>
                                    <ProductInFavorite key={i} handleDeleteOneFavorite={handleDeleteOneFav} productInFavorite={item} ></ProductInFavorite>
                                    <Dialog
                                        open={open}
                                        TransitionComponent={Transition}
                                        keepMounted
                                        aria-describedby="alert-dialog-slide-description"
                                    >
                                        <DialogTitle>{"Discart"}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-slide-description">
                                                Are you sure want de-Favorite this product ?
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose}>Cancel</Button>
                                            <Button onClick={() => handleAgree(item)}>Ok</Button>
                                        </DialogActions>
                                    </Dialog>
                                </>
                            ))
                        }
                    </Stack>
                </Grid>

                <Grid item xs={4}>
                    <SpeedDial
                        ariaLabel="SpeedDial tooltip example"
                        // sx={{ marginTop: 10, marginLeft: 10 }}
                        icon={<SpeedDialIcon />}
                        direction="down"
                        sx={{ marginLeft: '-30%' }}
                    >
                        {actions.map((action) => (
                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                                onClick={() => handleSpeedDialClick(action)}
                            />
                        ))}
                    </SpeedDial>
                </Grid>
            </Grid>
            <Footer />
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isMovingToCart}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="warning" sx={{ width: '100%' }}>
                    Add some product ti your cart first
                </Alert>
            </Snackbar>

            <Snackbar open={openMoveToCartSuccess} autoHideDuration={6000} onClose={handleCloseMoveToCartSuccess}>
                <Alert onClose={handleCloseMoveToCartSuccess} severity="success" sx={{ width: '100%' }}>
                    Added to cart successfully
                </Alert>
            </Snackbar>

            <Snackbar open={openDeleteAllSuccess} autoHideDuration={6000} onClose={handleCloseDeleteAllSuccess}>
                <Alert onClose={handleCloseDeleteAllSuccess} severity="success" sx={{ width: '100%' }}>
                    Deleted favorite successfully
                </Alert>
            </Snackbar>

            <Snackbar open={openMoveAllSuccess} autoHideDuration={6000} onClose={handleCloseMoveAllSuccess}>
                <Alert onClose={handleCloseMoveAllSuccess} severity="success" sx={{ width: '100%' }}>
                    Added all to cart successfully
                </Alert>
            </Snackbar>

            <Dialog
                open={openConfirmDelete}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Confirm task</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure to delete all your favorite product ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmDelete}>Cancel</Button>
                    <Button onClick={handleDeleteAllFavorite}>Ok</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openConfirmMove}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Confirm task</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        This task is being developing
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmMove}>Ok</Button>
                </DialogActions>
            </Dialog>
        </Stack>
        </>
    );
};

export default FavoritePage;