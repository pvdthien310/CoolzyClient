import React, { useState, useEffect } from "react";
import './styles.css'
import logo_png from '../../assets/logo_png.png'
import mFunction from "../../function";

import { decode } from 'base-64'
import { encode } from 'base-64'

import accountApi from '../../api/accountAPI'
import JWTApi from "../../api/jwtAPI";

import { AiOutlineGoogle } from 'react-icons/ai'
import { FaFacebookF } from 'react-icons/fa'
import { BiError } from 'react-icons/bi'

import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Input from '@mui/material/Input';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from "@mui/material/colors";
import { styled } from '@mui/material/styles';

import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';

import Loading from '../../components/Loading/loading'

const Login = () => {
    const backgroundLink = 'https://images.unsplash.com/photo-1462392246754-28dfa2df8e6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'

    const txtFieldThem = createTheme({
        palette: {
            primary: {
                main: grey[900]
            }
        },
        text: grey
    })

    let navigate = useNavigate();
    const dispatch = useDispatch()

    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false,
        isLoading: false,
        rememberAccount: false
    });

    const [emailErrVisible, setEmailErrVisible] = useState(false)
    const [emailWarningVisible, setEmailWarningVisible] = useState(false)
    const [passwordErrVisible, setPasswordErrVisible] = useState(false)

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const checkBoxChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.checked });
    }
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const loginHandle = async () => {
        checkInfo().then(res => {
            if (res) {
                setValues({ ...values, isLoading: true })
                JWTApi.login(values.email, values.password)
                    .then(res => {
                        setValues({ ...values, isLoading: false })
                        if (res.data == "Email not exist") {
                            setEmailWarningVisible(true)
                            setPasswordErrVisible(false)
                            return
                        }
                        else if (res.data == "Password incorrect") {
                            setEmailWarningVisible(false)
                            setPasswordErrVisible(true)
                            return
                        }
                        else {
                            setEmailWarningVisible(false)
                            setPasswordErrVisible(false)

                            localStorage.setItem("logged", true)
                            if (!values.rememberAccount) {
                                localStorage.setItem("rememberAccount", false)
                                localStorage.setItem(encode("rememberEmail"), encode(values.email))
                            }
                            else {
                                localStorage.setItem("rememberAccount", true)
                                localStorage.setItem(encode("rememberEmail"), encode(values.email))
                                localStorage.setItem(encode("rememberPassword"), encode(values.password))
                            }

                            dispatch(userSlice.actions.update(res.data))
                            navigate('/')
                            return
                        }
                    }).catch(err => console.log(err))
            }
        })

    }

    const checkInfo = async () => {

        if (!mFunction.validateEmail(values.email)) {
            setEmailErrVisible(true)
            return false
        }
        else {
            setEmailErrVisible(false)
        }

        if (!mFunction.validatePassword(values.password)) {
            setPasswordErrVisible(true)
            return false

        }
        else {
            setPasswordErrVisible(false)
        }

        return true

    }

    const getAccount = () => {
        if (localStorage.getItem('logged') == 'true') {
            navigate('/')
            return
        }

        if (localStorage.getItem('rememberAccount') == 'true') {
            setValues({
                ...values,
                rememberAccount: true,
                email: decode(localStorage.getItem(encode('rememberEmail'))),
                password: decode(localStorage.getItem(encode('rememberPassword')))
            })
        }
        else {
            setValues({
                ...values,
                rememberAccount: false,
                email: '',
                password: ''
            })

        }
    }
    // useEffect(getAccount, [])

    return (
        <div className="login__container" style={{ backgroundImage: `url(${backgroundLink})` }}        >
            <Helmet>
                <title>Login</title>
            </Helmet>

            <div className='login__form'>
                <div className="login__form__container">
                    <div className="login__form__title">
                        <img style={{ width: 40 }} src={logo_png} alt="logo_png" />
                        <h2>LOGIN</h2>
                    </div>

                    <ThemeProvider theme={txtFieldThem}>
                        <TextField
                            id="filled-basic"
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
                    {emailWarningVisible && <Message message="Email do not register" type="warning" />}

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
                    {passwordErrVisible && <Message message="Password is incorrect" type="err" />}

                    <div className="login__form__remember__container">
                        <a>Forgot your password?</a>

                        <div className="login__form__remember">
                            <p>Remember me</p>
                            <input type='checkbox' checked={values.rememberAccount} onChange={checkBoxChange('rememberAccount')} />
                        </div>
                    </div>

                    <CustomButton onClick={loginHandle}>Login</CustomButton>

                    <hr style={{ marginBottom: 60, marginTop: 20 }} />

                    <div className="login__form__socialMedia" >
                        <AiOutlineGoogle size={23} />
                        <p>Login with Google</p>
                    </div>

                    <div className="login__form__socialMedia">
                        <FaFacebookF size={21} />
                        <p>Login with Facebook</p>
                    </div>

                    <div className="login__form__register">
                        <p>You don't have account? </p>
                        <a ><Link to="/register">Register</Link></a>

                    </div>

                </div>
            </div>
            {values.isLoading && <Loading />}
        </div>
    )
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

export default Login
