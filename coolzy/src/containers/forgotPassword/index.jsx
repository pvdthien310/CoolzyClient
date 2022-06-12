import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom'
import './styles.css'

import logo_png from '../../assets/logo_png.png'

import { BiError } from 'react-icons/bi'

import accountApi from "../../api/accountAPI";
import EmailApi from '../../api/emailAPI'
import mFunction from "../../function";

import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from "@mui/material/colors";
import { styled } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";

const ForgotPassword = () => {
    let navigate = useNavigate();
    const backgroundLink = 'https://images.unsplash.com/photo-1462392246754-28dfa2df8e6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'

    const [emailErrVisible, setEmailErrVisible] = useState(false)
    const [emailWarningVisible, setEmailWarningVisible] = useState(false)

    const [passwordErrVisible, setPasswordErrVisible] = useState(false)

    const [confirmPasswordErrVisible, setConfirmPasswordErrVisible] = useState(false)

    const [verifyCode, setVerifyCode] = useState('')

    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false,
        confirmPassword: '',
        showConfirmPassword: false,
        confirmVerify: '',
        isLoading: false,
        correctVerify: true
    });


    const forgotHandle = async () => {
        checkInfo()
            .then(res => {
                if (res) sendMail()
            })
    }

    const checkInfo = async () => {

        let errEmail = false;
        let errPassword = false;
        let errConfirmPassword = false;

        if (!mFunction.validateEmail(values.email)) {
            setEmailErrVisible(true)
            errEmail = true
        }
        else {
            setEmailErrVisible(false)
            errEmail = false
        }

        if (!mFunction.validatePassword(values.password)) {
            setPasswordErrVisible(true)
            errPassword = true
        }
        else {
            setPasswordErrVisible(false)
            errPassword = false
        }

        if (values.password != values.confirmPassword) {
            setConfirmPasswordErrVisible(true)
            errConfirmPassword = true;
        }
        else {
            setConfirmPasswordErrVisible(false)
            errConfirmPassword = false
        }

        if (!errEmail && !errPassword && !errConfirmPassword) {
            let flag = false;
            await accountApi.checkEmail(values.email)
                .then(res => {
                    console.log(res)
                    if (res != 'Email already exists') {
                        setEmailWarningVisible(false)
                        flag = true
                    }
                    else {
                        setEmailWarningVisible(true)
                        flag = false;
                    }
                })
                .catch(err => {
                    console.log(err)
                })

            return flag
        }
        else {
            return false
        }

    }

    const sendMail = () => {
        setValues({
            ...values,
            isLoading: true
        })

        let verifyCode = mFunction.makeId(6);
        console.log(verifyCode)
        setVerifyCode(verifyCode);

        var mailOptions = {
            to: values.email,
            subject: 'Verify account',
            text: 'Thanks for using Coolzy, your verify code is: ' + verifyCode
        };

        EmailApi.sendVerify(mailOptions)
            .then(res => {
                setValues({
                    ...values,
                    isLoading: false
                })
                handleClickOpenDialog()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const txtFieldThem = createTheme({
        palette: {
            primary: {
                main: grey[900]
            }
        },
        text: grey
    })

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleClickShowConfirmPassword = () => {
        setValues({
            ...values,
            showConfirmPassword: !values.showConfirmPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [openDialog, setOpenDialog] = useState(false)

    const handleClickOpenDialog = () => {
        setValues({
            ...values,
            correctVerify: true
        })

        setOpenDialog(true);
        clearTimer(getDeadTime());
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleResendMail = () => {
        sendMail()
    }

    const handleConfirmDialog = () => {
        if (verifyCode == values.confirmVerify) {
            setValues({ ...values, correctVerify: true })
            setOpenDialog(false);
            updatePassword();
        }
        else {
            setValues({ ...values, correctVerify: false })
        }
    };

    const updatePassword = () => {
        const account = {
            email: values.email,
            password: values.password,

        }
        accountApi.updatePassword(account)
            .then(res => {
                if (res.status == 200) {
                    setAlertStatus(true)
                    navigate('/login')
                }
            })
            .catch(err => console.log(err))
    }

    //--------------------countdown--------------------//
    const Ref = useRef(null);
    const [timer, setTimer] = useState('00:00');

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 * 60 * 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }

    const startTimer = (e) => {
        let { total, hours, minutes, seconds }
            = getTimeRemaining(e);
        if (total >= 0) {
            setTimer(
                // (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }

    const clearTimer = (e) => {
        setTimer('01:00');
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }

    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + 60);
        return deadline;
    }

    const CustomButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(grey[900]),
        backgroundColor: grey[900],
        '&:hover': {
            backgroundColor: grey[700],
        },
        padding: '8px 0px',
        marginTop: '15px',
        borderRadius: '10px'

    }));

    const [alertStatus, setAlertStatus] = useState(false)
    const handleCloseAlert = () => {
        setAlertStatus(false)
    }
    return (
        <div className="register" style={{ backgroundImage: `url(${backgroundLink})` }} >
            <Helmet >
                <title>Forgot password</title>
            </Helmet>

            <div className="register__form__container">
                <div className="register__form__title">
                    <img style={{ width: 40 }} src={logo_png} alt="logo_png" />
                    <h2 style={{ color: '#000' }}>FORGOT PASSWORD</h2>
                </div>

                <ThemeProvider theme={txtFieldThem}>
                    <TextField
                        label="Email"
                        variant="standard"
                        color="primary"
                        text='primary'
                        sx={{
                            marginTop: 2,
                            borderRadius: 0.2,
                            input: { color: '#272727', marginLeft: 1, marginX: 0.4 },
                            label: { color: '#272727', marginLeft: 1, marginX: 0.4 }
                        }}
                        value={values.email}
                        onChange={handleChange('email')} />
                </ThemeProvider>

                {emailErrVisible && <Message message="Invalid email" type="err" />}
                {emailWarningVisible && <Message message="Email is already used" type="warning" />}

                <ThemeProvider theme={txtFieldThem}>
                    <FormControl variant="standard"
                        sx={{
                            marginY: 3,
                            backgroundColor: '#fff',
                            borderRadius: 0.5,
                        }}>
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            sx={{ color: '#272727', fontSize: 15, }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        sx={{ color: "rgb(153, 153, 153)", marginRight: 0.3 }}
                                    >
                                        {values.showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </ThemeProvider>

                {passwordErrVisible && <Message message="Password has least 6 character" type="err" />}

                <ThemeProvider theme={txtFieldThem}>
                    <FormControl
                        sx={{
                            marginY: 0.5,
                            backgroundColor: '#fff',
                            borderRadius: 0.5,
                        }}
                        variant="standard">
                        <InputLabel htmlFor="filled-adornment-password">Confirm password</InputLabel>
                        <Input
                            type={values.showConfirmPassword ? 'text' : 'password'}
                            value={values.confirmPassword}
                            onChange={handleChange('confirmPassword')}
                            sx={{ color: '#272727', fontSize: 15, }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowConfirmPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        sx={{ color: "rgb(153, 153, 153)", marginRight: 0.3 }}

                                    >
                                        {values.showConfirmPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </ThemeProvider>


                {confirmPasswordErrVisible && <Message message="Confirm password is not correct" type="err" />}

                <CustomButton onClick={forgotHandle}>Confirm</CustomButton>

                <div className="register__form__register">
                    <p>Had you have account already? </p>
                    <p ><Link to="/login">Login</Link></p>

                </div>

            </div>

            <Snackbar open={alertStatus} autoHideDuration={5000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity='success' variant="filled">
                    Change password successful
                </Alert>
            </Snackbar>

            {/* -----------------------dialog custom--------------------- */}

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle sx={{ color: '#040C18' }}>Xác nhận email</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Coolzy has already sent you a email. Please check and confirm your verify code below.
                    </DialogContentText>
                    {values.correctVerify ?
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Verify code"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={values.confirmVerify}
                            onChange={handleChange('confirmVerify')}
                        />
                        :
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Verify code"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={values.confirmVerify}
                            onChange={handleChange('confirmVerify')}
                            error
                        />}

                </DialogContent>

                <DialogActions>

                    <p>{timer}</p>

                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    {timer == '00:00' ?
                        <Button onClick={handleResendMail}>Resend</Button>
                        :
                        <Button disabled>Resend</Button>
                    }

                    {timer == '00:00' ?
                        <Button disabled >Confirm</Button>
                        :
                        <Button onClick={handleConfirmDialog} >Confirm</Button>
                    }
                </DialogActions>
            </Dialog>

            {
                values.isLoading &&
                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', top: 0, left: 0, right: 0, bottom: 0 }} >
                    <CircularProgress />
                </div>
            }
            
        </div>
    )
}

const Message = props => {
    const mess = props.message;
    const type = props.type

    return (
        <div className="login__form__message" style={{ color: type == 'err' ? 'rgb(192, 7, 7)' : '#e9be00' }}>
            <BiError size={15} />
            <p>{mess}</p>
        </div >
    )
}

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default ForgotPassword