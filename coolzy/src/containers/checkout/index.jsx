import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'

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

// import Paypal from './../../components/Paypal/index';
// import { CheckEmail, CheckPhoneNumber } from './../LoginAndRegister/ValidationDataForAccount'
// import { isSignedIn_user, currentUser, cartListSelector } from '../../redux/selectors';
// import { deleteCartById, getAllCart } from '../../redux/slices/cartSlice';
// import { unwrapResult } from '@reduxjs/toolkit';
// import { getAllProduct, getProductWithID } from '../../redux/slices/productSlice';
// import { accountSlice } from '../../redux/slices/accountSlice';
// import moment from 'moment'
// import { addInvoice } from "../../redux/slices/invoiceSlice";
// import { addInvoiceItem } from "../../redux/slices/invoiceItemSlice";
import emailApi from '../../api/emailAPI';

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

const Checkout = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    //const isSignedIn = useSelector(isSignedIn_user)

    const [isHideCompleteButton, setIsHideCompleteButton] = useState("flex")

    const [openPaymentMethodScreen, setOpenPaymentMethodScreen] = useState(false)
    const [openPayOnline, setOpenPayOnline] = useState(false)

    const [listCart, setListCart] = useState([])
    const [listProd, setListProd] = useState([])

    //const _guestCart = useSelector(cartListSelector)

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

    useEffect(() => {
        const fetchYourCart = async () => {
         ///   if (localStorage.getItem('role') === 'customer') {
                let temp = []
                let listCart = []
                let listProd = []
               // try {
                    //const resultAction = await dispatch(getAllCart())
                    //const originalPromiseResult = unwrapResult(resultAction)
                  //  temp = originalPromiseResult
                //    for (let i = 0; i < temp.length; i++) {
                  //      if (temp[i].email === _currentUser.email) {
                       //     listCart.push(temp[i])
                           // const resultAction2 = await dispatch(getProductWithID(temp[i].productId))
                           // const originalPromiseResult2 = unwrapResult(resultAction2)
                      //      listProd.push(originalPromiseResult2)
                    //    }
                  //  }
                  //  await setListCart(listCart)
                  //  await setListProd(listProd)
                  //  await CountTotal(listCart, listProd)
                  //  await MakePurchaseUnit(listCart, listProd)
                // } catch (rejectedValueOrSerializedError) {
                //     alert(rejectedValueOrSerializedError)
                // }
            // } else {
            //     let temp = _guestCart
            //     let listCart = []
            //     let listProd = []
            //     for (let i = 0; i < temp.length; i++) {
            //         if (temp.productid != 'undefined') {
            //             listCart.push(temp[i])
            //             const resultAction2 = await dispatch(getProductWithID(temp[i].productid))
            //             const originalPromiseResult2 = unwrapResult(resultAction2)
            //             listProd.push(originalPromiseResult2)
            //         }
            //     }
            //     await setListCart(listCart)
            //     await setListProd(listProd)
            //     await CountTotal(listCart, listProd)
            //     await MakePurchaseUnit(listCart, listProd)
            // }
        }
        fetchYourCart()
    }, [])

    const [purchaseUnits, setPurchaseUnits] = useState([])

    const MakePurchaseUnit = async (listCart, listProd) => {
        let sample = []
        let amountObj = {
            currency_code: "USD",
            value: 0,
        }
        for (let i = 0; i < listCart.length; i++) {
            for (let j = 0; j < listProd.length; j++) {
                if (listProd[j].productId === listCart[i].productId) {
                    amountObj = {
                        ...amountObj,
                        value: Number(listCart[i].quantity) * Number(listProd[j].price)
                    }
                    let temp = {
                        description: listProd[j].name,
                        reference_id: listProd[j].productId,
                        amount: amountObj
                    }
                    sample.push(temp)
                }
            }
        }
        setPurchaseUnits(...purchaseUnits, sample)
    }

    const [subTotal, setSubTotal] = useState(0)

    const CountTotal = async (_cart, prList) => {
        let newTotal = 0
        await _cart.map((item) => {
            let rs = prList.find((ite) => ite.productId == item.productId)
            if (rs != undefined)
                newTotal = newTotal + Number(Number(rs.price) * Number(item.quantity))
        })
        setSubTotal(newTotal)
    }

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
    ///const _currentUser = useSelector(currentUser)
   // const [name, setName] = useState(_currentUser.name)
   // const [phoneNumber, setPhoneNumber] = useState(_currentUser.phoneNumber)

    //for guest
    const [guestName, setGuestName] = useState('')
    const [guestPhoneNum, setGuestPhoneNum] = useState('')
    const [email, setEmail] = useState('')

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
            const resProvince = await fetch('https://sheltered-anchorage-60344.herokuapp.com/province')
            const resProv = resProvince.json()
            setProvinceList(await resProv)
        }
        getProvinceList()
    }, [])

    function handleChangeProvince(event) {
        setProvince(event.target.value)
    }
    //get district
    useEffect(() => {
        const getDistrict = async () => {
            const resDistrict = await fetch(`https://sheltered-anchorage-60344.herokuapp.com/district/?idProvince=${province.idProvince}`)
            const resDis = resDistrict.json()
            setDistrictList(await resDis)
        }
        getDistrict()
    }, [province])

    function handleChangeDistrict(event) {
        setDistrict(event.target.value)
    }

    //get commune
    useEffect(() => {
        const getCommune = async () => {
            const reCommune = await fetch(`https://sheltered-anchorage-60344.herokuapp.com/commune/?idDistrict=${district.idDistrict}`)
            const resCom = reCommune.json()
            setCommuneList(await resCom)
        }
        getCommune()
    }, [district])

    async function handleChangeCommune(event) {
        setCommune(event.target.value)
    }

    function handleClickToCart(event) {
        event.preventDefault();
        ///if (localStorage.getItem('role') === 'customer') {
            navigate('/myplace/mycart')
      ///  } else {
       ///   if     navigate('/guestCart')
      //  }
    }

    const handleLogOut = () => {
       // dispatch(accountSlice.actions.logout());
        localStorage.setItem('role', '')
        localStorage.setItem('idUser', '')
        localStorage.setItem('cart', JSON.stringify([]));
        navigate(0)
    }

    const handleChangeAddress = async (e) => {
        setAddressShip(e.target.value)
    }

    const handleToPayment = async () => {
        // if (name === '' || phoneNumber === '' || addressShip === '') {
        //     setOpenSnackbar(true)
        // } else {
        //     if (province === null || district === null && commune === null) {
        //         setOpenSnackbar(true)
        //     } else {
        //         const temp = addressShip + ', ' + commune.name + ', ' + district.name + ', ' + province.name
        //         setBigAddress(temp)
        //         setOpenPaymentMethodScreen(true)
        //         // await MakePurchaseUnit()
        //         // console.log(purchaseUnits)
        //     }
        // }
    }

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
        navigate('/')
    }

    const [openBackdrop, setOpenBackdrop] = useState(false);
    const handleCloseBackdrop = async () => {
        handleCloseConfirm()
        if (localStorage.getItem('role') === "customer") {
            for (let i = 0; i < listCart.length; i++) {
                try {
                 //   const resultAction = await dispatch(deleteCartById(listCart[i]))
                 //   const originalPromiseResult = unwrapResult(resultAction)
                } catch (rejectedValueOrSerializedError) {
                    alert(rejectedValueOrSerializedError);
                }
            }
        } else {
            localStorage.setItem('cart', JSON.stringify([]));
        }
        setOpenBackdrop(false);
        setPlacedOrderSuccessfully(true)
    };

    const handleAgreeCOD = () => {
        setOpenBackdrop(true)
        MakeInvoice();
    }

    const [invoiceId, setInvoiceId] = useState(' ')

    const MakeInvoice = async () => {
      //  var m = moment().format('H mm')
      //  var date = moment().format('D/M/YYYY')
        let tempID = ''
      ///  if (localStorage.getItem('role') === "customer") {
            let temp = {
                moneyReceived: '0',
                isChecked: false,
                isPaid: false,
              //  date: date + ' ' + m,
              //  userID: _currentUser.userID,
                branchID: 'da198f71-813b-47f8-9ded-331b358d4780'
            }

            try {
             //   const resultAction = await dispatch(addInvoice(temp))
            //    const originalPromiseResult = unwrapResult(resultAction)
             //   setInvoiceId(originalPromiseResult.data.invoiceID)
            } catch (rejectedValueOrSerializedError) {
                alert(rejectedValueOrSerializedError)
            }
        // } else {
        //     let temp = {
        //         moneyReceived: "0",
        //         isChecked: false,
        //         isPaid: false,
        //         date: date + ' ' + m,
        //         userID: "10f8e845-b0ea-47fd-9f26-7d65f1bb571a",
        //         branchID: 'da198f71-813b-47f8-9ded-331b358d4780'
        //     }

        //     try {
        //         const resultAction = await dispatch(addInvoice(temp))
        //         const originalPromiseResult = unwrapResult(resultAction)
        //         setInvoiceId(originalPromiseResult.data.invoiceID)
        //     } catch (rejectedValueOrSerializedError) {
        //         alert(rejectedValueOrSerializedError)
        //     }
        // }

    }

    useEffect(async () => {
        if (invoiceId != ' ') {
            _addInvoiceItem(invoiceId)
        }
    }, [invoiceId])

    const _addInvoiceItem = async (_invoiceId) => {
        let stringOrder = ''
        for (let i = 0; i < listCart.length; i++) {
            for (let j = 0; j < listProd.length; j++) {
                if (listCart[i].productid === listProd[j].productID) {
                    let item = {
                        invoiceID: _invoiceId,
                        productID: listProd[j].productID,
                        amount: listCart[i].amount,
                        total: Number(listCart[i].amount) * Number(listProd[j].price)
                    }
                    stringOrder = stringOrder + "\n" + `${listProd[j].name} - Quantity: ${listCart[i].amount} - Sub-cost: $${item.total} `
                    // t.push(item)
                    try {
                    //    const resultAction = await dispatch(addInvoiceItem(item))
                     //   const originalPromiseResult = unwrapResult(resultAction)
                    } catch (rejectedValueOrSerializedError) {
                        console.log(rejectedValueOrSerializedError)
                    }
                }
            }
        }

      ///  if (localStorage.getItem('role') === "customer") {
            emailApi.sendEmail({
               /// to: _currentUser.email,
                subject: "Your order information",
                text: "Thank for placing order in ComeBuy site. \n" +
                    "Your order: \n" +
                 //   `Name: ${_currentUser.name} \n` +
                 ///   `Phone: ${_currentUser.phoneNumber} \n` +
                    `COD Address: ${bigAddress}` + "\n" +
                    "-------------------------------------------------------- \n" +
                    stringOrder + "\n" +
                    "-------------------------------------------------------- \n" +
                    `Total: ${subTotal} USD` + "\n" +
                    "-------------------------------------------------------- \n" +
                    "Any wondered things. Please contact with our shop with contact below site: ComeBuy.com"
            }).then(data => {
                handleCloseBackdrop()
            })
                .catch(err => console.log(err))
        // } else {
        //     emailApi.sendEmail({
        //         to: email,
        //         subject: "Your order information",
        //         text: "Thank for placing order in ComeBuy site. \n" +
        //             "Your order: \n" +
        //             `Name: ${guestName} \n` +
        //             `Phone: ${guestPhoneNum} \n` +
        //             `COD Address: ${bigAddress}` + "\n" +
        //             "-------------------------------------------------------- \n" +
        //             stringOrder + "\n" +
        //             "-------------------------------------------------------- \n" +
        //             `Total: ${subTotal} USD` + "\n" +
        //             "-------------------------------------------------------- \n" +
        //             "Any wondered things. Please contact with our shop with contact below site: ComeBuy.com"
        //     }).then(data => {
        //         handleCloseBackdrop()
        //     })
        //         .catch(err => console.log(err))
        // }
    }


    const handlePaymentGuest = () => {
        if (guestName === '' || guestPhoneNum === '' || addressShip === '' || email === '') {
            setOpenSnackbar(true)
        } else {
            if (province != null && district != null && commune != null) {
                setOpenSnackbar(true)
            } else {
             //   if (CheckEmail(email) && CheckPhoneNumber(guestPhoneNum)) {
                //     alert("Move to payment method")
                // } else {
                //     setOpenSnackbar2(true)
                // }
            }
        }
    }

    const breadcrumbs = [
        <Link
            underline="hover"
            key="2"
            style={{
                display: 'inline-block',
                fontSize: '0.85714em',
                color: '#338dbc',
                lineHeight: '1.3em',
                cursor: 'pointer'
            }}
            onClick={handleClickToCart}
        >
            Cart
        </Link>,
        <Typography
            key="2"
            style={{
                display: 'inline-block',
                fontSize: '0.85714em',
                color: '#000D0A',
                lineHeight: '1.3em',
                fontFamily: 'sans-serif'
            }}
        >
            Cart Information
        </Typography>,
        <Typography key="3"
            style={{
                display: 'inline-block',
                fontSize: '0.85714em',
                color: '#999999',
                lineHeight: '1.3em',
                fontFamily: 'sans-serif'
            }}>
            Payment method
        </Typography>,
    ];

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
            style={{
                display: 'inline-block',
                fontSize: '0.85714em',
                color: '#338dbc',
                lineHeight: '1.3em',
                cursor: 'pointer'
            }}
            onClick={handleClickToCart}
        >
            Cart
        </Link>,
        <Link
            underline="hover"
            key="2"
            style={{
                display: 'inline-block',
                fontSize: '0.85714em',
                color: '#338dbc',
                lineHeight: '1.3em',
                fontFamily: 'sans-serif',
                cursor: 'pointer'
            }}
            onClick={handleClosePaymentMethodScreen}
        >
            Cart Information
        </Link>,
        <Typography key="3"
            style={{
                display: 'inline-block',
                fontSize: '0.85714em',
                color: '#000D0A',
                lineHeight: '1.3em',
                fontFamily: 'sans-serif'
            }}>
            Payment method
        </Typography>,
    ];

    return (
        <Grid container
            sx={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                backgroundColor: 'white',
                resize: 'none',
            }}
            spacing={2}
        >
            {/* Cart information part */}

            {openPaymentMethodScreen ? (
                <Grid item xs={7} height="100%" >
                    <Stack direction="column" spacing={2} p="2rem" paddingLeft="12em">
                        <Stack direction="column"
                            sx={{
                                paddingBottom: '1em',
                                display: 'block'
                            }}>
                            <Button
                                sx={{
                                    marginLeft: '-1.2%',
                                    color: '#333333',
                                    fontSize: '2em',
                                    fontWeight: 'normal',
                                    lineHeight: '1em',
                                    display: 'block',
                                    marginBlockStart: '0.67em',
                                    marginBlockEnd: '0.67em',
                                    background: 'white !important',
                                    fontFamily: 'sans-serif'
                                }}
                                onClick={() => navigate('/')}
                            >
                                ComeBuy
                            </Button>
                            <Stack direction="row"
                                sx={{
                                    marginTop: '-2%',
                                    listStyleType: 'none',
                                    display: 'block',
                                    marginBlockEnd: '1em',
                                }}
                            >
                                <Breadcrumbs separator="›" style={{ color: '#000D0A' }} aria-label="breadcrumb">
                                    {breadcrumbsPayment}
                                </Breadcrumbs>
                            </Stack>
                            <Stack marginTop="-3%">
                                <Typography
                                    sx={{
                                        color: '#333333',
                                        fontSize: '1.28571em',
                                        fontWeight: 'normal',
                                        lineHeight: '1em',
                                        marginBlockStart: '0.83em',
                                        marginBlockEnd: '0.83em',
                                        display: 'block',
                                        fontFamily: 'sans-serif'
                                    }}
                                >
                                    Delivery method
                                </Typography>
                            </Stack>
                            <Stack direction="row"
                                sx={{
                                    height: '2.5em',
                                    backgroundColor: '#fafafa',
                                    width: '97%',
                                    borderWidth: '1px',
                                    borderRadius: '8px',
                                    padding: '0.5em',
                                    justifyContent: 'space-between',
                                    marginTop: '0.25em'
                                }}>
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
                                    sx={{
                                        color: '#333333',
                                        fontSize: '1.28571em',
                                        fontWeight: 'normal',
                                        lineHeight: '1em',
                                        marginBlockStart: '0.83em',
                                        marginBlockEnd: '0.83em',
                                        display: 'block',
                                        fontFamily: 'sans-serif'
                                    }}
                                >
                                    Payment method
                                </Typography>
                            </Stack>
                            <Stack direction="row"
                                sx={{
                                    height: 'auto',
                                    backgroundColor: '#fafafa',
                                    width: '97%',
                                    borderWidth: '1px',
                                    borderRadius: '8px',
                                    padding: '1.15em',
                                    marginTop: '0.25em'
                                }}>
                                <Radio
                                    checked={selectedPayMethod === 'Pay on delivery'}
                                    onChange={handleChangePayMethod}
                                    value="Pay on delivery"
                                    name="radio-buttons"
                                    size="medium"
                                />
                                <img style={{
                                    marginRight: '10px',
                                    display: 'flex',
                                    alignSelf: 'center',
                                    width: '50px',
                                    height: '50px'
                                }}
                                    src="https://hstatic.net/0/0/global/design/seller/image/payment/cod.svg?v=1"
                                />
                                <Typography sx={{ marginTop: '0.5em' }}>Pay on delivery</Typography>
                            </Stack>

                            <Stack direction="column"
                                sx={{
                                    height: 'auto',
                                    backgroundColor: '#fafafa',
                                    width: '97%',
                                    borderWidth: '1px',
                                    borderRadius: '8px',
                                    padding: '1.15em',
                                    marginTop: '0.25em'
                                }}>
                                <Stack direction="row">
                                    <Radio
                                        checked={selectedPayMethod === 'Pay online'}
                                        onChange={handleChangePayMethod}
                                        value="Pay online"
                                        name="radio-buttons"
                                        size="medium"
                                    />
                                    <img style={{
                                        marginRight: '10px',
                                        display: 'flex',
                                        alignSelf: 'center',
                                        width: '50px',
                                        height: '50px'
                                    }}
                                        src="https://hstatic.net/0/0/global/design/seller/image/payment/other.svg?v=1"
                                    />
                                    <Typography sx={{ marginTop: '0.5em' }}>Pay online</Typography>
                                </Stack>
                                {openPayOnline ? (
                                    <>
                                        <hr style={{ height: '1px', width: '100%', backgroundColor: 'black' }}></hr>
                                        <Typography sx={{
                                            textAlign: 'center',
                                            whiteSpace: 'pre-line',
                                            paddingLeft: '2em',
                                            paddingRight: '2em',
                                            color: '#737373',
                                            fontSize: '14px'
                                        }}
                                        >
                                            VIETCOMBANK -
                                            VONG MINH HUYNH -
                                            Bank Account Number: 1234567896 -
                                            PGD TP HCM -
                                            Transfer content : Your name-Phone number-Product ID
                                        </Typography>
                                        <Typography sx={{
                                            textAlign: 'center',
                                            whiteSpace: 'pre-line',
                                            paddingLeft: '2em',
                                            paddingRight: '2em',
                                            color: '#737373',
                                            fontSize: '14px'
                                        }}
                                        >
                                            TECHCOMBANK -
                                            PHAM VO DI THIEN -
                                            Bank Account Number : 1852654970 -
                                            PGD TP HCM -
                                            Transfer content : Your name-Phone number-Product ID
                                        </Typography>

                                        <Typography sx={{
                                            textAlign: 'center',
                                            whiteSpace: 'pre-line',
                                            paddingLeft: '2em',
                                            paddingRight: '2em',
                                            color: '#737373',
                                            fontSize: '14px',
                                            fontWeight: 'bold',
                                            marginTop: '1.2em'
                                        }}
                                        >
                                            OR:
                                        </Typography>
                                        <div style={{ width: '50%', marginTop: '1.2em', alignSelf: 'center' }}>
                                            {/* <Paypal _bigAddress={bigAddress} _guestEmail={email} _guestName={guestName} _guestPhoneNumber={guestPhoneNum} cartList={listCart} prodList={listProd} purchases={purchaseUnits} /> */}
                                        </div>
                                    </>
                                ) : (null)}
                            </Stack>

                            <Grid spacing={2} container sx={{ width: '100%', position: 'relative', marginTop: '2rem' }}>
                                <Grid item xs={6}>
                                    <a onClick={handleClosePaymentMethodScreen}
                                        style={{
                                            textDecoration: 'none',
                                            color: '#338dbc',
                                            transition: 'color 0.2s ease-in-out',
                                            display: 'inline-block',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            fontFamily: 'sans-serif',
                                            lineHeight: '1.5em',
                                            marginLeft: '1.2em'
                                        }}
                                    >
                                        Back to cart information
                                    </a>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button onClick={handleCompleteOrder} variant="contained" sx={{ fontSize: '14px', display: `${isHideCompleteButton}` }} size="large">
                                        Complete order
                                    </Button>
                                </Grid>
                            </Grid>
                        </Stack>
                    </Stack>
                </Grid>
            ) : (
                localStorage.getItem('role') === 'customer' ? (
                    <Grid item xs={7} height="100%" >
                        <Stack direction="column" spacing={2} p="2rem" paddingLeft="12em">
                            <Stack direction="column"
                                sx={{
                                    paddingBottom: '1em',
                                    display: 'block'
                                }}>
                                <Button
                                    sx={{
                                        marginLeft: '-1.2%',
                                        color: '#333333',
                                        fontSize: '2em',
                                        fontWeight: 'normal',
                                        lineHeight: '1em',
                                        display: 'block',
                                        marginBlockStart: '0.67em',
                                        marginBlockEnd: '0.67em',
                                        background: 'white !important',
                                        fontFamily: 'sans-serif'
                                    }}
                                    onClick={() => navigate('/')}
                                >
                                    ComeBuy
                                </Button>
                                <Stack direction="row"
                                    sx={{
                                        marginTop: '-2%',
                                        listStyleType: 'none',
                                        display: 'block',
                                        marginBlockEnd: '1em',
                                    }}
                                >
                                    <Breadcrumbs separator="›" style={{ color: '#000D0A' }} aria-label="breadcrumb">
                                        {breadcrumbs}
                                    </Breadcrumbs>
                                </Stack>
                                <Stack marginTop="-3%">
                                    <Typography
                                        sx={{
                                            color: '#333333',
                                            fontSize: '1.28571em',
                                            fontWeight: 'normal',
                                            lineHeight: '1em',
                                            marginBlockStart: '0.83em',
                                            marginBlockEnd: '0.83em',
                                            display: 'block',
                                            fontFamily: 'sans-serif'
                                        }}
                                    >
                                        Cart Information
                                    </Typography>
                                </Stack>
                                <Stack direction="row" sx={{ width: '100%', position: 'relative' }} >
                                    {/* <Avatar sx={{ height: '70px', width: '70px' }} alt="" src={_currentUser.avatar} /> */}
                                    <Stack direction="column" marginLeft="0.1em">
                                        <p
                                            style={{
                                                marginBlockStart: '1em',
                                                marginBlockEnd: '1em',
                                                display: 'block',
                                                marginBottom: '0.75em',
                                                lineHeight: '1.5em',
                                                fontSize: '14px',
                                                fontFamily: 'sans-serif',
                                                marginTop: '0.1%',
                                                marginLeft: '1.2em'
                                            }}
                                        >
                                            {/* {_currentUser.name} ({_currentUser.email}) */}
                                            </p>
                                        <a
                                            onClick={handleLogOut}
                                            style={{
                                                textDecoration: 'none',
                                                color: '#338dbc',
                                                transition: 'color 0.2s ease-in-out',
                                                display: 'inline-block',
                                                cursor: 'pointer',
                                                fontSize: '14px',
                                                fontFamily: 'sans-serif',
                                                lineHeight: '1.5em',
                                                marginLeft: '1.2em'
                                            }}
                                        >
                                            Log out
                                        </a>
                                    </Stack>
                                </Stack>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    // label={_currentUser.name != '' ? null : 'Full name'}
                                    variant="outlined"
                                    sx={{
                                        color: '#333333',
                                        fontFamily: 'sans-serif',
                                        marginTop: '1em'
                                    }}
                                    // value={name}
                                    // onChange={(e) => setName(e.target.value)}
                                />
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    // label={_currentUser.phoneNumber != '' ? null : 'Phone number'}
                                    variant="outlined"
                                    // value={phoneNumber}
                                    // onChange={(e) => setPhoneNumber(e.target.value)}
                                    sx={{
                                        color: '#333333',
                                        fontFamily: 'sans-serif',
                                        marginTop: '1.2rem'
                                    }} />
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Your address"
                                    variant="outlined"
                                    onChange={handleChangeAddress}
                                    sx={{
                                        color: '#333333',
                                        fontFamily: 'sans-serif',
                                        marginTop: '1.3rem'
                                    }}
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
                                            <a onClick={() => navigate('/myplace/mycart')}
                                                style={{
                                                    textDecoration: 'none',
                                                    color: '#338dbc',
                                                    transition: 'color 0.2s ease-in-out',
                                                    display: 'inline-block',
                                                    cursor: 'pointer',
                                                    fontSize: '14px',
                                                    fontFamily: 'sans-serif',
                                                    lineHeight: '1.5em',
                                                    marginLeft: '1.2em'
                                                }}
                                            >
                                                My Cart
                                            </a>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button onClick={handleToPayment} variant="contained" sx={{ fontSize: '14px' }} size="large">
                                                Continue to payment method
                                            </Button>
                                        </Grid>
                                    </Grid>

                                </Grid>
                            </Stack>
                        </Stack>
                    </Grid>
                ) : (
                    // Guest
                    <Grid item xs={7} height="100%" >
                        <Stack direction="column" spacing={2} p="2rem" paddingLeft="12em">
                            <Stack direction="column"
                                sx={{
                                    paddingBottom: '1em',
                                    display: 'block'
                                }}>
                                <Button
                                    onClick={() => navigate('/')}
                                    sx={{
                                        marginLeft: '-1.2%',
                                        color: '#333333',
                                        fontSize: '2em',
                                        fontWeight: 'normal',
                                        lineHeight: '1em',
                                        display: 'block',
                                        marginBlockStart: '0.67em',
                                        marginBlockEnd: '0.67em',
                                        background: 'white !important',
                                        fontFamily: 'sans-serif'
                                    }}

                                >ComeBuy
                                </Button>
                                <Stack direction="row"
                                    sx={{
                                        marginTop: '-2%',
                                        listStyleType: 'none',
                                        display: 'block',
                                        marginBlockEnd: '1em',
                                    }}
                                >
                                    <Breadcrumbs separator="›" style={{ color: '#000D0A' }} aria-label="breadcrumb">
                                        {breadcrumbs}
                                    </Breadcrumbs>
                                </Stack>
                                <Stack marginTop="-3%">
                                    <Typography
                                        sx={{
                                            color: '#333333',
                                            fontSize: '1.28571em',
                                            fontWeight: 'normal',
                                            lineHeight: '1em',
                                            marginBlockStart: '0.83em',
                                            marginBlockEnd: '0.83em',
                                            display: 'block',
                                            fontFamily: 'sans-serif'
                                        }}
                                    >
                                        Cart Information
                                    </Typography>
                                </Stack>
                                <p
                                    style={{
                                        marginBlockStart: '1em',
                                        marginBlockEnd: '1em',
                                        display: 'block',
                                        marginBottom: '0.75em',
                                        lineHeight: '1.5em',
                                        fontSize: '14px',
                                        fontFamily: 'sans-serif',
                                        marginTop: '0.1%'
                                    }}
                                >
                                    Did you have an account ?
                                    <a onClick={() => navigate('/login')}
                                        style={{
                                            textDecoration: 'none',
                                            color: '#338dbc',
                                            transition: 'color 0.2s ease-in-out',
                                            display: 'inline-block',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            fontFamily: 'sans-serif',
                                            lineHeight: '1.5em',
                                            marginLeft: '0.5%'
                                        }}
                                    >
                                        Sign in
                                    </a>
                                </p>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Full name"
                                    variant="outlined"
                                    value={guestName}
                                    onChange={(e) => setGuestName(e.target.value)}
                                    sx={{
                                        color: '#333333',
                                        fontFamily: 'sans-serif',
                                        marginTop: '1em'
                                    }}
                                />
                                <Grid spacing={2} container sx={{ width: '100%', position: 'relative', marginTop: '0.25rem' }}>
                                    <Grid item xs={8}>
                                        <TextField
                                            fullWidth
                                            id="outlined-basic"
                                            label="Email"
                                            variant="outlined"
                                            onChange={(e) => setEmail(e.target.value)}
                                            sx={{
                                                color: '#333333',
                                                fontFamily: 'sans-serif',
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            id="outlined-basic"
                                            label="Phone number"
                                            variant="outlined"
                                            onChange={(e) => setGuestPhoneNum(e.target.value)}
                                            sx={{
                                                color: '#333333',
                                                fontFamily: 'sans-serif',
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Your address"
                                    variant="outlined"
                                    onChange={handleChangeAddress}
                                    sx={{
                                        color: '#333333',
                                        fontFamily: 'sans-serif',
                                        marginTop: '1.3rem'
                                    }}
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
                                            <a onClick={() => navigate('/guestCart')}
                                                style={{
                                                    textDecoration: 'none',
                                                    color: '#338dbc',
                                                    transition: 'color 0.2s ease-in-out',
                                                    display: 'inline-block',
                                                    cursor: 'pointer',
                                                    fontSize: '14px',
                                                    fontFamily: 'sans-serif',
                                                    lineHeight: '1.5em',
                                                    marginLeft: '1.2em'
                                                }}
                                            >
                                                My Cart
                                            </a>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <Button onClick={handleToPayment} variant="contained" sx={{ fontSize: '14px' }} size="large">
                                                Continue to payment method
                                            </Button>
                                        </Grid>
                                    </Grid>

                                </Grid>
                            </Stack>
                        </Stack>
                    </Grid>
                )
            )}

            {/* Cart visualization part */}
            <Grid sx={{
                backgroundColor: '#fafafa',
                left: 0,
                backgroundPosition: 'left top',
                boxShadow: '1px 0 0 #e1e1e1 inset'
            }} height="auto" item xs={5}>
                {localStorage.getItem('role') === 'customer' ? (
                    <Stack direction="column" spacing={2} p="2rem" paddingRight="6em">
                        {listCart.map((cart) => (
                            <Stack
                                sx={{
                                    backgroundColor: '#F2F2F2',
                                    borderRadius: '8px',
                                    padding: '1em',
                                    boxShadow: '0px 6px 6px -3px rgb(0 0 0 / 20%), 0px 10px 14px 1px rgb(0 0 0 / 14%), 0px 4px 18px 3px rgb(0 0 0 / 12%)'
                                }}
                                direction="row"
                                width="100%">
                                {listProd.map((prod) =>
                                    prod.productID === cart.productid ? (
                                        <img style={{
                                            width: '7em',
                                            height: '7em',
                                            borderRadius: '8px',
                                            background: '#fff',
                                            position: 'relative'
                                        }}
                                            alt={prod.name}
                                            src={prod.productimage[0].imageURL}
                                        />
                                    ) : (
                                        null
                                    )
                                )}
                                <Stack direction="column">
                                    <Typography sx={{ marginLeft: '1em', marginTop: '1em' }}>{cart.product.name}</Typography>
                                    <Typography sx={{ marginLeft: '1em', marginTop: '0.75em' }}> Quantity: {cart.amount}</Typography>
                                </Stack>
                                {listProd.map((prod) =>
                                    prod.productID === cart.productid ? (
                                        <Typography sx={{ alignSelf: 'flex-end', fontWeight: 600 }}> ${Number(prod.price) * Number(cart.amount)}</Typography>
                                    ) : (null)
                                )}
                            </Stack>
                        ))}
                        <div style={{ height: '1px', width: '100%', backgroundColor: '#BFBFBF' }}></div>
                        <Grid container width="100%" spacing={1}>
                            <Grid item xs={8.5}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Discount code"
                                    variant="outlined"
                                    // onChange={handleChangeAddress}
                                    sx={{
                                        color: '#333333',
                                        fontFamily: 'sans-serif',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={3.5} sx={{ height: '100%' }}>
                                <Button variant="contained" sx={{ fontSize: '14px', backgroundColor: 'gray', marginTop: '0.5em', width: '100%', height: '100%' }}>
                                    Use
                                </Button>
                            </Grid>
                        </Grid>
                        <div style={{ height: '1px', width: '100%', backgroundColor: '#BFBFBF' }}></div>
                        <Stack direction="column" width="100%">
                            <Typography sx={{
                                color: '#333333',
                                fontFamily: 'sans-serif', fontWeight: 300
                            }}
                            >RARE MEMBER
                            </Typography>
                            <Stack direction="row" width="100%">
                                <DiamondIcon sx={{ width: '17px', height: '17px' }} />
                                <Typography sx={{
                                    color: '#333333',
                                    fontFamily: 'sans-serif',
                                    fontSize: '13px',
                                    marginLeft: '0.5em'
                                }}>
                                    MEMBER - 0 point(s)
                                </Typography>
                            </Stack>
                        </Stack>
                        <div style={{ height: '1px', width: '100%', backgroundColor: '#BFBFBF' }}></div>
                        <Stack direction="row" width='100%' justifyContent="space-between">
                            <Typography sx={{ marginTop: '1.2em', color: 'gray' }}>Temporary cost</Typography>
                            <Typography sx={{
                                color: '#333333',
                                fontWeight: 600,
                                marginTop: '1.2em'
                            }}
                            >
                                ${subTotal}
                            </Typography>
                        </Stack>
                        <Stack direction="row" width='100%' justifyContent="space-between">
                            <Typography sx={{ color: 'gray', marginTop: '-0.5em' }}>Delivery cost</Typography>
                            <Typography sx={{
                                color: '#333333',
                                fontWeight: 800,
                                marginTop: '-0.5em'
                            }}
                            >
                                $2.00
                            </Typography>
                        </Stack>
                        <div style={{ height: '1px', width: '100%', backgroundColor: '#BFBFBF' }}></div>

                        <Stack direction="row" width='100%' justifyContent="space-between">
                            <Typography sx={{ color: 'gray', marginTop: '1.2em' }}>Total cost</Typography>
                            <Typography sx={{
                                color: '#333333',
                                fontWeight: 600,
                                marginTop: '1.2em',
                                fontSize: '20px'
                            }}
                            >
                                {subTotal + 2} USD
                            </Typography>
                        </Stack>
                    </Stack>
                ) : (
                    <Stack direction="column" spacing={2} p="2rem" paddingRight="6em">
                        {listCart.map((cart) => (
                            <Stack
                                sx={{
                                    backgroundColor: '#F2F2F2',
                                    borderRadius: '8px',
                                    padding: '1em',
                                    boxShadow: '0px 6px 6px -3px rgb(0 0 0 / 20%), 0px 10px 14px 1px rgb(0 0 0 / 14%), 0px 4px 18px 3px rgb(0 0 0 / 12%)'
                                }}
                                direction="row"
                                width="100%">
                                {listProd.map((prod) =>
                                    prod.productID === cart.productid ? (
                                        <img style={{
                                            width: '7em',
                                            height: '7em',
                                            borderRadius: '8px',
                                            background: '#fff',
                                            position: 'relative'
                                        }}
                                            alt={prod.name}
                                            src={prod.productimage[0].imageURL}
                                        />
                                    ) : (
                                        null
                                    )
                                )}
                                <Stack direction="column">
                                    {listProd.map((prod) =>
                                        prod.productID === cart.productid ? (
                                            <Typography sx={{ marginLeft: '1em', marginTop: '1em' }}>{prod.name}</Typography>
                                        ) : (
                                            null
                                        )
                                    )}
                                    <Typography sx={{ marginLeft: '1em', marginTop: '0.75em' }}> Quantity: {cart.amount}</Typography>
                                </Stack>
                                {listProd.map((prod) =>
                                    prod.productID === cart.productid ? (
                                        <Typography sx={{ alignSelf: 'flex-end', fontWeight: 800 }}> ${Number(prod.price) * Number(cart.amount)}</Typography>
                                    ) : (null)
                                )}
                            </Stack>
                        ))}
                        <div style={{ height: '1px', width: '100%', backgroundColor: '#BFBFBF' }}></div>
                        <Grid container width="100%" spacing={1}>
                            <Grid item xs={8.5}>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Discount code"
                                    variant="outlined"
                                    // onChange={handleChangeAddress}
                                    sx={{
                                        color: '#333333',
                                        fontFamily: 'sans-serif',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={3.5} sx={{ height: '100%' }}>
                                <Button variant="contained" sx={{ fontSize: '14px', backgroundColor: 'gray', marginTop: '0.5em', width: '100%', height: '100%' }}>
                                    Use
                                </Button>
                            </Grid>
                        </Grid>
                        <div style={{ height: '1px', width: '100%', backgroundColor: '#BFBFBF' }}></div>
                        <Stack direction="column" width="100%">
                            <Typography sx={{
                                color: '#333333',
                                fontFamily: 'sans-serif', fontWeight: 300
                            }}
                            >RARE MEMBER
                            </Typography>
                            <Stack direction="row" width="100%">
                                <DiamondIcon sx={{ width: '17px', height: '17px' }} />
                                <Typography sx={{
                                    color: '#333333',
                                    fontFamily: 'sans-serif',
                                    fontSize: '13px',
                                    marginLeft: '0.5em'
                                }}>
                                    MEMBER - 0 point(s)
                                </Typography>
                            </Stack>
                        </Stack>
                        <div style={{ height: '1px', width: '100%', backgroundColor: '#BFBFBF' }}></div>
                        <Stack direction="row" width='100%' justifyContent="space-between">
                            <Typography sx={{ marginTop: '1.2em', color: 'gray' }}>Temporary cost</Typography>
                            <Typography sx={{
                                color: '#333333',
                                fontWeight: 800,
                                marginTop: '1.2em'
                            }}
                            >
                                ${subTotal}
                            </Typography>
                        </Stack>
                        <Stack direction="row" width='100%' justifyContent="space-between">
                            <Typography sx={{ color: 'gray', marginTop: '-0.5em' }}>Delivery cost</Typography>
                            <Typography sx={{
                                color: '#333333',
                                fontWeight: 800,
                                marginTop: '-0.5em'
                            }}
                            >
                                $2.00
                            </Typography>
                        </Stack>
                        <div style={{ height: '1px', width: '100%', backgroundColor: '#BFBFBF' }}></div>

                        <Stack direction="row" width='100%' justifyContent="space-between">
                            <Typography sx={{ color: 'gray', marginTop: '1.2em' }}>Total cost</Typography>
                            <Typography sx={{
                                color: '#333333',
                                fontWeight: 800,
                                marginTop: '1.2em',
                                fontSize: '20px'
                            }}
                            >
                                {subTotal} USD
                            </Typography>
                        </Stack>
                    </Stack>
                )}
            </Grid>

            {/* snackbar */}
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {/* {
                        _currentUser != null ?
                            ((name === '' || phoneNumber === '' || addressShip === '') ? "Please fill in completely" : "Please set your location")
                            :
                            ((guestName === '' || guestPhoneNum === '' || addressShip === '') ? "Please fill in completely" : "Please set your location")
                    } */}
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
                    {localStorage.getItem('role') === "customer" ? (
                        <DialogContentText id="alert-dialog-slide-description">
                            You are about using COD service. <br />
                            {/* Order's name: {name} <br />
                            Order's phone number: {phoneNumber} <br />
                            Order's address: {bigAddress} <br />
                            An order will be sent to your email: {_currentUser.email} <br /> */}
                            About 5 days your order will be delivered.
                        </DialogContentText>
                    ) : (
                        <DialogContentText id="alert-dialog-slide-description">
                            You are about using COD service. <br />
                            Order's name: {guestName} <br />
                            Order's phone number: {guestPhoneNum} <br />
                            Order's address: {bigAddress} <br />
                            An order will be sent to your email: {email} <br />
                            About 5 days your order will be delivered.
                        </DialogContentText>
                    )}
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
                    style={{
                        alignSelf: 'center',
                        width: '30px',
                        height: '30px',
                        borderRadius: '15px',
                        border: '1px solid #18608a',
                        backgroundColor: 'green',
                        color: 'black',
                        fontSize: '13px',
                        marginBottom: '10px',
                        fontWeight: 'bold',
                        padding: '12px 45px',
                    }}
                >
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
    )
}

export default Checkout