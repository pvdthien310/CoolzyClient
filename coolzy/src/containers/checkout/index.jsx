import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import { styles } from './styles'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, Stack, Typography, Link, Breadcrumbs, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Avatar } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import DiamondIcon from '@mui/icons-material/Diamond';
import Radio from '@mui/material/Radio';
import { Slide } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import accountApi from '../../api/accountAPI'
import { currentUser } from './../../redux/selectors';
import { currentListItem, isOrderFromCart } from './../../redux/selectors'
import { checkoutSlice } from '../../redux/slices/checkoutSlices';
import { accountSlice } from '../../redux/slices/accountSlices';
import { updateClothesWithID } from '../../redux/slices/clothSlice'

import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Paypal from '../../components/paypal';
import emailApi from '../../api/emailAPI';
import { unwrapResult } from "@reduxjs/toolkit";
import { addOrder } from '../../redux/slices/orderSlice'
import Helmet from 'react-helmet';

const Checkout = () => {
    const listItem = useSelector(currentListItem)
    const _isFromCart = useSelector(isOrderFromCart)
    const [listCart, setListCart] = useState([])

    useEffect(() => {
        if (listItem.length != 0)
            setListCart(listItem)
    }, [listItem])

    const navigate = useNavigate()
    const dispatch = useDispatch()
    //const isSignedIn = useSelector(isSignedIn_user)

    const [isHideCompleteButton, setIsHideCompleteButton] = useState("flex")

    const [openPaymentMethodScreen, setOpenPaymentMethodScreen] = useState(false)
    const [openPayOnline, setOpenPayOnline] = useState(false)

    const [selectedPayMethod, setSelectedPayMethod] = useState("Pay on delivery");
    const handleChangePayMethod = (event) => {
        if (event.target.value === 'Pay online') {
            setOpenPayOnline(true)
            setIsHideCompleteButton("none")
            setSelectedPayMethod(event.target.value);
        } else {
            setOpenPayOnline(false)
            setIsHideCompleteButton("flex")
            setSelectedPayMethod(event.target.value);
            MakePurchaseUnit()
        }
    };

    const _currentUser = useSelector(currentUser)

    const [purchaseUnits, setPurchaseUnits] = useState([])

    const MakePurchaseUnit = async () => {
        let sample = []
        let unitAmountObj = {
            currency_code: "USD",
            value: 0,
        }
        for (let i = 0; i < listCart.length; i++) {
            unitAmountObj = {
                ...unitAmountObj,
                value: listCart[i].total
            }
            let temp = {
                name: listCart[i].product.name + " - " + listCart[i].size,
                unit_amount: unitAmountObj,
                quantity: listCart[i].quantity
            }
            sample.push(temp)

        }
        setPurchaseUnits(...purchaseUnits, sample)
    }

    const [subTotal, setSubTotal] = useState(0)

    useEffect(() => {
        const CountTotal = () => {
            let newTotal = 0
            listCart.map((value) => {
                newTotal = newTotal + value.total
                console.log(newTotal)
            })
            setSubTotal(newTotal)
        }

        if (listCart.length != 0)
            CountTotal()
    }, [listCart])

    //for snackbar
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    //for snackbar 2
    const [openSnackbar2, setOpenSnackbar2] = useState(false);
    const handleCloseSnackbar2 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar2(false);
    };

    //for customer is member
    const [name, setName] = useState(_currentUser.name)
    const [phoneNumber, setPhoneNumber] = useState(_currentUser.phoneNumber)

    //general information
    const [addressShip, setAddressShip] = useState('')

    const [province, setProvince] = useState({})
    const [provinceList, setProvinceList] = useState([])

    const [district, setDistrict] = useState({})
    const [districtList, setDistrictList] = useState([])

    const [commune, setCommune] = useState({})
    const [communeList, setCommuneList] = useState([])

    const [bigAddress, setBigAddress] = useState('')

    //get province
    useEffect(() => {
        const getProvinceList = async () => {
            await fetch('https://sheltered-anchorage-60344.herokuapp.com/province')
                .then(res => res.json()).then((data) => setProvinceList(data))
        }
        getProvinceList()
    }, [])

    function handleChangeProvince(event) {
        setProvince(event.target.value)
    }
    //get district
    useEffect(() => {
        const getDistrict = async () => {
            await fetch(`https://sheltered-anchorage-60344.herokuapp.com/district/?idProvince=${province.idProvince}`)
                .then(res => res.json())
                .then((data) => setDistrictList(data))
        }
        getDistrict()
    }, [province])

    function handleChangeDistrict(event) {
        setDistrict(event.target.value)
    }

    //get commune
    useEffect(() => {
        const getCommune = async () => {
            await fetch(`https://sheltered-anchorage-60344.herokuapp.com/commune/?idDistrict=${district.idDistrict}`)
                .then(res => res.json())
                .then((data) => setCommuneList(data))
        }
        getCommune()
    }, [district])

    async function handleChangeCommune(event) {
        setCommune(event.target.value)
    }

    useEffect(() => {
        setBigAddress(addressShip + ", " + commune.name + ", " + district.name + ", " + province.name)
    }, [addressShip, province, district, commune])

    function handleClickToCart(event) {
        event.preventDefault();
    }

    const handleChangeAddress = async (e) => {
        setAddressShip(e.target.value)
    }

    const [data, setData] = useState({})
    const handleToPayment = () => {
        if (name === '' || phoneNumber === '' || addressShip === '') {
            setOpenSnackbar(true)
        } else {
            if (province === null || district === null && commune === null) {
                setOpenSnackbar(true)
            } else {
                let listItem = []
                let total = 0

                listCart.forEach((item) => {
                    let obj = {
                        _itemid: item.product._id,
                        size: item.size,
                        quantity: item.quantity,
                        total: item.total
                    }

                    listItem.push(obj)

                    total += item.total
                })

                setData({
                    ...data,
                    email: _currentUser.email,
                    phone: phoneNumber,
                    name: name,
                    address: bigAddress,
                    status: 'preparing',
                    items: listItem,
                    total: total,
                    method: 'Cash'
                })

            }
        }
    }

    useEffect(async () => {
        if (data.email != null || data.email != undefined) {
            setOpenPaymentMethodScreen(true)
            await MakePurchaseUnit()
            console.log(data)
        }
    }, [data])

    const [openConfirm, setOpenConfirm] = useState(false);
    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };
    const handleCompleteOrder = () => {
        setOpenConfirm(true)

    }

    const [placedOrderSuccessfully, setPlacedOrderSuccessfully] = useState(false)

    const handleClosePlacedOrderSuccessfully = () => {
        setPlacedOrderSuccessfully(false)
        navigate('/history')
    }

    const [openBackdrop, setOpenBackdrop] = useState(false);
    const handleCloseBackdrop = async () => {
        handleCloseConfirm()
        setOpenBackdrop(false);
        setPlacedOrderSuccessfully(true)
    };

    const handleAgreeCOD = async () => {
        setOpenBackdrop(true)
        setOpenConfirm(false);

        setData({ ...data, method: 'Cash' })

        const subtractQuantity = async () => {
            //redux
            let newList = []
            listCart.forEach((item) => {
                let product = item.product
                let listProductSize = product.size
                let _newListProductSize = []

                for (let i = 0; i < listProductSize.length; i++) {
                    if (listProductSize[i].size == item.size) {
                        let size = {
                            size: item.size,
                            quantity: listProductSize[i].quantity - item.quantity
                        }
                        _newListProductSize.push(size)
                    }
                    else
                        _newListProductSize.push(listProductSize[i])
                }

                newList.push({
                    ...product,
                    size: _newListProductSize
                })

            })

            console.log(newList)

            newList.forEach(async (product) => {
                try {
                    const resultAction = await dispatch(updateClothesWithID(product))
                    const originalPromiseResult = unwrapResult(resultAction)
                } catch (rejectedValueOrSerializedError) {
                    alert(rejectedValueOrSerializedError);
                }
            })

        }

        const sendEmail = () => {
            let stringOrder = ''

            listCart.forEach((item) => {
                stringOrder += "\n"
                stringOrder += item.product.name + "\n"
                    + "\n- Size: " + item.size
                    + "\n- Quantity: " + item.quantity
                    + "\n- Price: " + item.product.price + " USD"
                    + "\n- Total: " + item.total + " USD"
                stringOrder += "\n"
            })

            emailApi.sendVerify({
                to: data.email,
                subject: "Your order information",
                text: "Thank for placing an order in Coolzy site. \n" +
                    "Your order: \n" +
                    `Name: ${data.name} \n` +
                    `Phone: ${data.phone} \n` +
                    `COD Address: ${data.address}` + "\n" +
                    "-------------------------------------------------------- \n" +
                    stringOrder + "\n" +
                    "-------------------------------------------------------- \n" +
                    `Ship: 2 USD` + "\n" +
                    `Total: ${data.total} USD` + "\n" +
                    "-------------------------------------------------------- \n" +
                    "Any wondered things. Please contact with our shop with contact below site: coolzy.com"
            }).then(data => {

            })
                .catch(err => console.log(err))
        }

        const makeOrder = async () => {

            try {
                const resultAction = await dispatch(addOrder(data))
                const originalPromiseResult = unwrapResult(resultAction)
                setOpenBackdrop(false)

                navigate('/history');

            } catch (rejectedValueOrSerializedError) {
                alert(rejectedValueOrSerializedError);
            }


        }

        const updateCart = async () => {
            dispatch(accountSlice.actions.update({
                ..._currentUser,
                listCarts: []
            }))

            await accountApi.updateAccount({
                ..._currentUser,
                listCarts: []
            })
                .then((res) => {
                })
                .catch((error) => {

                })
        }

        await subtractQuantity()

        if (_isFromCart)
            await updateCart()
        sendEmail()

        await makeOrder()

    }

    const handleClosePaymentMethodScreen = () => {
        setAddressShip('')
        setProvince(null)
        setDistrict(null)
        setCommune(null)
        setOpenPaymentMethodScreen(false)
    }
    const breadcrumbsPayment = [
        <Link
            underline="hover"
            key="2"
            style={{ display: 'inline-block', fontSize: '0.85714em', color: '#338dbc', lineHeight: '1.3em', cursor: 'pointer' }}
            onClick={handleClickToCart}
        >
            Cart
        </Link>,
        <Link
            underline="hover"
            key="2"
            style={{ display: 'inline-block', fontSize: '0.85714em', color: '#338dbc', lineHeight: '1.3em', fontFamily: 'sans-serif', cursor: 'pointer' }}
            onClick={handleClosePaymentMethodScreen}
        >
            Cart Information
        </Link>,
        <Typography key="3"
            style={{ display: 'inline-block', fontSize: '0.85714em', color: '#000D0A', lineHeight: '1.3em', fontFamily: 'sans-serif' }}>
            Payment method
        </Typography>,
    ];



    return (
        <>
            <Helmet>
                <title>Check out</title>
            </Helmet>
            <Grid container
                sx={{ width: '100%', height: '100%', position: 'absolute', backgroundColor: 'white', resize: 'none' }}
                spacing={2}
            >
                {/* Cart information part */}

                {openPaymentMethodScreen ? (
                    <Grid item xs={7} height="100%" >
                        <Stack direction="column" spacing={2} p="2rem" paddingLeft="12em">
                            <Stack direction="column"
                                sx={{ paddingBottom: '1em', display: 'block' }}>
                                <Button
                                    sx={styles.btnCoolzy}
                                    onClick={() => navigate('/')}
                                >
                                    Coolzy
                                </Button>
                                <Stack direction="row"
                                    sx={{ marginTop: '-2%', listStyleType: 'none', display: 'block', marginBlockEnd: '1em' }}
                                >
                                    <Breadcrumbs separator="›" style={{ color: '#000D0A' }} aria-label="breadcrumb">
                                        {breadcrumbsPayment}
                                    </Breadcrumbs>
                                </Stack>
                                <Stack marginTop="-3%">
                                    <Typography
                                        sx={{ color: '#333333', fontSize: '1.28571em', fontWeight: 'normal', lineHeight: '1em', marginBlockStart: '0.83em', marginBlockEnd: '0.83em', display: 'block', fontFamily: 'sans-serif' }}
                                    >
                                        Delivery method
                                    </Typography>
                                </Stack>
                                <Stack direction="row"
                                    sx={{ height: '2.5em', backgroundColor: '#fafafa', width: '97%', borderWidth: '1px', borderRadius: '8px', padding: '0.5em', justifyContent: 'space-between', marginTop: '0.25em' }}>
                                    <Stack direction="row" sx={{ marginTop: '0.5em' }}>
                                        <Radio
                                            checked
                                            value="1"
                                            name="radio-buttons"
                                            sx={{ marginTop: '-0.5em' }}
                                        />
                                        <Typography>Delivery within 64 provinces</Typography>
                                    </Stack>
                                    <Stack sx={{ marginTop: '0.55em' }}>
                                        <Typography>2.00 USD</Typography>
                                    </Stack>
                                </Stack>
                                <Stack marginTop="2em">
                                    <Typography
                                        sx={{ color: '#333333', fontSize: '1.28571em', fontWeight: 'normal', lineHeight: '1em', marginBlockStart: '0.83em', marginBlockEnd: '0.83em', display: 'block', fontFamily: 'sans-serif' }}
                                    >
                                        Payment method
                                    </Typography>
                                </Stack>
                                <Stack direction="row"
                                    sx={{ height: 'auto', backgroundColor: '#fafafa', width: '97%', borderWidth: '1px', borderRadius: '8px', padding: '1.15em', marginTop: '0.25em' }}>
                                    <Radio
                                        checked={selectedPayMethod === 'Pay on delivery'}
                                        onChange={handleChangePayMethod}
                                        value="Pay on delivery"
                                        name="radio-buttons"
                                        size="medium"
                                    />
                                    <img style={{ marginRight: '10px', display: 'flex', alignSelf: 'center', width: '50px', height: '50px' }}
                                        src="https://hstatic.net/0/0/global/design/seller/image/payment/cod.svg?v=1"
                                    />
                                    <Typography sx={{ marginTop: '0.5em' }}>Pay on delivery</Typography>
                                </Stack>

                                <Stack direction="column"
                                    sx={{
                                        height: 'auto', backgroundColor: '#fafafa', width: '97%', borderWidth: '1px', borderRadius: '8px', padding: '1.15em', marginTop: '0.25em'
                                    }}>
                                    <Stack direction="row">
                                        <Radio
                                            checked={selectedPayMethod === 'Pay online'}
                                            onChange={handleChangePayMethod}
                                            value="Pay online"
                                            name="radio-buttons"
                                            size="medium"
                                        />
                                        <img style={{ marginRight: '10px', display: 'flex', alignSelf: 'center', width: '50px', height: '50px' }}
                                            src="https://hstatic.net/0/0/global/design/seller/image/payment/other.svg?v=1"
                                        />
                                        <Typography sx={{ marginTop: '0.5em' }}>Pay online</Typography>
                                    </Stack>
                                    {openPayOnline ? (
                                        <div style={{ width: '50%', marginTop: '1.2em', alignSelf: 'center' }}>
                                            <Paypal data={data} purchases={purchaseUnits} />
                                        </div>
                                    ) : (null)}
                                </Stack>

                                <Grid spacing={2} container sx={{ width: '100%', position: 'relative', marginTop: '2rem' }}>
                                    <Grid item xs={6}>
                                        <a onClick={handleClosePaymentMethodScreen}
                                            style={{ textDecoration: 'none', color: 'black', transition: 'color 0.2s ease-in-out', display: 'inline-block', cursor: 'pointer', fontSize: '14px', fontFamily: 'sans-serif', lineHeight: '1.5em', marginLeft: '1.2em' }}
                                        >
                                            Back to cart information
                                        </a>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <CustomFillButton onClick={handleCompleteOrder} variant="contained" sx={{ fontSize: '14px', display: `${isHideCompleteButton}` }} size="large">
                                            Complete order
                                        </CustomFillButton>
                                    </Grid>
                                </Grid>
                            </Stack>
                        </Stack>
                    </Grid>
                ) : (
                    <Grid item xs={7} height="100%" >
                        <Stack direction="column" spacing={2} p="2rem" paddingLeft="12em">
                            <Stack direction="column"
                                sx={{
                                    paddingBottom: '1em',
                                    display: 'block'
                                }}>
                                <Button
                                    sx={{ marginLeft: '-1.2%', color: '#333333', fontSize: '2em', fontWeight: 'normal', lineHeight: '1em', display: 'block', marginBlockStart: '0.67em', marginBlockEnd: '0.67em', background: 'white !important', fontFamily: 'sans-serif' }}
                                    onClick={() => navigate('/')}

                                >
                                    Coolzy
                                </Button>
                                <Stack direction="row" sx={{ width: '100%', position: 'relative' }} >
                                    {/* <Avatar sx={{ height: '70px', width: '70px' }} alt="" src={_currentUser.avatar} /> */}
                                    <Stack direction="column" marginLeft="0.1em">
                                        <p
                                            style={{ marginBlockStart: '1em', marginBlockEnd: '1em', display: 'block', marginBottom: '0.75em', lineHeight: '1.5em', fontSize: '14px', fontFamily: 'sans-serif', marginTop: '0.1%', marginLeft: '1.2em' }}
                                        >
                                            {_currentUser.name} ({_currentUser.email})
                                        </p>

                                    </Stack>
                                </Stack>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label={_currentUser.name != '' ? null : 'Full name'}
                                    variant="outlined"
                                    sx={{ color: '#333333', fontFamily: 'sans-serif', marginTop: '1em' }}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label={_currentUser.phoneNumber != '' ? null : 'Phone number'}
                                    variant="outlined"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    sx={{ color: '#333333', fontFamily: 'sans-serif', marginTop: '1.2rem' }} />
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Your address"
                                    variant="outlined"
                                    onChange={handleChangeAddress}
                                    sx={{ color: '#333333', fontFamily: 'sans-serif', marginTop: '1.3rem' }}
                                />
                                <Grid spacing={2} container sx={{ width: '100%', position: 'relative', marginTop: '1em' }}>
                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">City/Province</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={province}
                                                label="Province/City"
                                                onChange={handleChangeProvince}
                                            >
                                                {provinceList.map((province) => (
                                                    <MenuItem value={province}>{province.name}</MenuItem>
                                                )
                                                )}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">District</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={district}
                                                label="District"
                                                onChange={handleChangeDistrict}
                                            >
                                                {districtList.map((district) => (
                                                    <MenuItem value={district}>{district.name}</MenuItem>
                                                )
                                                )}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Commune</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={commune}
                                                label="Commune"
                                                onChange={handleChangeCommune}
                                            >
                                                {communeList.map((commune) => (
                                                    <MenuItem value={commune}>{commune.name}</MenuItem>
                                                )
                                                )}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid spacing={2} container sx={{ width: '100%', position: 'relative', marginTop: '2rem' }}>
                                        <Grid item xs={6}>
                                            <a onClick={() => navigate('/myCart')}
                                                style={{ textDecoration: 'none', color: 'black', transition: 'color 0.2s ease-in-out', display: 'inline-block', cursor: 'pointer', fontSize: '14px', fontFamily: 'sans-serif', lineHeight: '1.5em', marginLeft: '1.2em' }}>
                                                My Cart
                                            </a>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomFillButton onClick={handleToPayment} variant="contained" size="large">
                                                Continue to payment method
                                            </CustomFillButton>
                                        </Grid>
                                    </Grid>

                                </Grid>
                            </Stack>
                        </Stack>
                    </Grid>
                )}

                {/* Cart visualization part */}
                <Grid sx={{ backgroundColor: '#fafafa', left: 0, backgroundPosition: 'left top', boxShadow: '1px 0 0 #e1e1e1 inset' }}
                    height="auto"
                    item xs={5}>
                    {listCart.map((item) => (
                        <Stack direction="column" spacing={2} p="2rem" paddingRight="6em" >
                            <Stack direction="column" sx={styles.listCart_item}>
                                <Stack
                                    direction="row"
                                    width="100%">

                                    <img style={{
                                        width: '7em', height: '7em', borderRadius: '8px', background: '#fff', position: 'relative'
                                    }}
                                        alt={item.product.name}
                                        src={item.product.images[0]}
                                    />

                                    <Stack direction="column">
                                        <Typography sx={{ marginLeft: '1em', marginTop: '1em' }}>{item.product.name}</Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Typography sx={{ marginLeft: '1em', marginTop: '0.5em' }}> x{item.quantity}</Typography>
                                                <Typography sx={{ marginLeft: '1em', marginTop: '0.5em', fontStyle: 'italic', fontSize: '12px' }}> Size: {item.size}</Typography>
                                            </Grid>

                                            {/* <Grid item xs={8} ></Grid>

                                        <Grid item xs={4} >
                                            <Typography sx={{ fontWeight: 600 }}> {item.total} USD</Typography>
                                        </Grid> */}
                                        </Grid>
                                    </Stack>


                                </Stack>

                                <Grid container>
                                    <Grid item xs={8} ></Grid>

                                    <Grid item xs={4} >
                                        <Typography sx={{ fontWeight: 600 }}> {item.total} USD</Typography>
                                    </Grid>
                                </Grid>    
                            </Stack>                       
                        </Stack>
                    ))}


                <div style={{ height: '1px', width: '100%', backgroundColor: '#BFBFBF' }}></div>
                <Stack direction="row" width='100%' justifyContent="space-between">
                    <Typography sx={{ marginTop: '1.2em', color: 'gray' }}>Temporary cost</Typography>
                    <Typography sx={{ color: '#333333', fontWeight: 800, marginTop: '1.2em' }}
                    >
                        {subTotal} USD
                    </Typography>
                </Stack>
                <Stack direction="row" width='100%' justifyContent="space-between">
                    <Typography sx={{ color: 'gray', marginTop: '-0.5em' }}>Delivery cost</Typography>
                    <Typography sx={{ color: '#333333', fontWeight: 800, marginTop: '-0.5em' }}
                    >
                        2 USD
                    </Typography>
                </Stack>
                <div style={{ height: '1px', width: '100%', backgroundColor: '#BFBFBF' }}></div>

                <Stack direction="row" width='100%' justifyContent="space-between">
                    <Typography sx={{ color: 'gray', marginTop: '1.2em' }}>Total cost</Typography>
                    <Typography sx={{ color: '#333333', fontWeight: 800, marginTop: '1.2em', fontSize: '20px' }}
                    >
                        {subTotal + 2} USD
                    </Typography>
                </Stack>
            </Grid>

                {/* snackbar */}
                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                        {
                            _currentUser != null &&
                            ((name === '' || phoneNumber === '' || addressShip === '') ? "Please fill in completely" : "Please set your location")
                        }
                    </Alert>
                </Snackbar>

                <Snackbar open={openSnackbar2} autoHideDuration={6000} onClose={handleCloseSnackbar2}>
                    <Alert onClose={handleCloseSnackbar2} severity="warnings" sx={{ width: '100%' }}>
                        "Check your phone number and email whether it's in true type"
                    </Alert>
                </Snackbar>

                <Dialog
                    open={openConfirm}
                    TransitionComponent={Transition}
                    keepMounted
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Please check these information below carefully before placing an order"}</DialogTitle>
                    <DialogContent>

                        <DialogContentText id="alert-dialog-slide-description">
                            You are about using COD service. <br />
                            Order's name: {name} <br />
                            Order's phone number: {phoneNumber} <br />
                            Order's address: {bigAddress} <br />
                            An order will be sent to your email: {_currentUser.email} <br />
                            About 5 days your order will be delivered.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenConfirm(false)}>Disagree</Button>
                        <Button onClick={handleAgreeCOD}>Agree</Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={placedOrderSuccessfully}>
                    <DialogTitle color='success'>Placed order successfully. <br />
                        Please check your email or My orders to see your work <br />
                        Click OK to back to Main Page</DialogTitle>
                    <Button
                        onClick={handleClosePlacedOrderSuccessfully}
                        style={{ alignSelf: 'center', width: '30px', height: '30px', borderRadius: '15px', border: '1px solid #18608a', backgroundColor: 'green', color: 'black', fontSize: '13px', marginBottom: '10px', fontWeight: 'bold', padding: '12px 45px', }}>
                        OK
                    </Button>
                </Dialog>

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={openBackdrop}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Grid >
        </>
    )
}


export const CustomFillButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: grey[900],
    '&:hover': {
        backgroundColor: grey[700],
    },
    padding: '6px 35px',
    marginLeft: '20px',
    borderRadius: '5px'

}));

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6}
        ref={ref}
        variant="filled" {...props}
    />;
});
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up"
        ref={ref} {...props}
    />;
});

export default Checkout