import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box';
import { Stack, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from "@mui/material/colors";

import { encode } from 'base-64'
import { Helmet } from 'react-helmet';
import mFunction from '../../function';
import './profile.css'
import Footer from '../../components/footer'
import Navbar from '../../components/navbar'
import { useSelector, useDispatch } from 'react-redux';
import accountApi from '../../api/accountAPI';
import { accountSlice, updateAccount } from '../../redux/slices/accountSlices';
import Message from '../../components/Message';
import Loading from './../../components/Loading/loading';
import { Success } from '../../components/alert/alert';
import { unwrapResult } from '@reduxjs/toolkit';
import { currentUser } from './../../redux/selectors';

export const ProfileManage = () => {
    const TextFieldTheme = createTheme({
        shape: {
            borderRadius: 20
        },
        palette: {
            primary: grey
        },
        text: grey
    })
    const ButtonTheme = createTheme({
        shape: {
            borderRadius: 20
        },
        palette: {
            primary: grey
        },
    })

    const _currentUser = useSelector(currentUser)
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false)

    const [, refresh] = useState()

    const [updateSucceeded, setUpdateSucceeded] = useState({
        status: false,
        message: ''
    })

    useEffect(() => {
        console.log(_currentUser)
    }, [])

    useEffect(() => {
        refresh()
    }, [_currentUser])

    useEffect(() => {
    }, [updateSucceeded])

    //#region INFORMATION NOTE
    const [nameNote, setNameNote] = useState({
        visible: false,
        type: '',
        message: ''
    })

    const [contactNote, setContactNote] = useState({
        visible: false,
        type: '',
        message: ''
    })

    const [IDNote, setIDNote] = useState({
        visible: false,
        type: '',
        message: ''
    })

    const [addressNote, setAddressNote] = useState({
        visible: false,
        type: '',
        message: ''
    })

    const [birthdayNote, setBirthdayNote] = useState({
        visible: false,
        type: '',
        message: ''
    })

    const [emailNote, setEmailNote] = useState({
        visible: false,
        type: '',
        message: ''
    })

    //#endregion

    //#region PASSWORD NOTE
    const [oldPasswordNote, setOldPasswordNote] = useState({
        visible: false,
        type: '',
        message: ''
    })

    const [newPasswordNote, setNewPasswordNote] = useState({
        visible: false,
        type: '',
        message: ''
    })

    const [repeatNewPasswordNote, setRepeatNewPasswordNote] = useState({
        visible: false,
        type: '',
        message: ''
    })
    //#endregion

    const [values, setValues] = useState({
        _id: _currentUser._id,
        name: _currentUser.name,
        phoneNumber: _currentUser.phoneNumber,
        address: _currentUser.address,
        birthday: _currentUser.birthday,
        email: _currentUser.email,
        password: _currentUser.password,
        gender: _currentUser.gender,

    })

    const [passwords, setPasswords] = useState({
        old: _currentUser.password,
        new: '',
        repeatNew: ''
    })

    const handleChangeInformation = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        setUpdateSucceeded({
            status: false,
            message: ''
        })

    };

    const handleChangePasswords = (prop) => (event) => {
        setPasswords({ ...passwords, [prop]: event.target.value })
        setUpdateSucceeded({
            status: false,
            message: ''
        })
    }

    const validatePassword = () => {
        let check = true;

        //#region OLD
        if (passwords.old == '' || passwords.old === undefined) {
            setOldPasswordNote({
                ...oldPasswordNote,
                type: 'warning',
                message: 'Please enter your old password',
                visible: true
            })
            check = false;
        }
        else if (encode(passwords.old) != _currentUser.password) {
            setOldPasswordNote({
                ...oldPasswordNote,
                type: 'err',
                message: 'Your input is different from your current password',
                visible: true
            })
            check = false;
        }
        else {
            setOldPasswordNote({ ...oldPasswordNote, visible: false })
        }

        //#endregion

        //#region NEW
        if (passwords.new == '' || passwords.new === undefined) {
            setNewPasswordNote({
                ...newPasswordNote,
                type: 'warning',
                message: 'Please enter your new password',
                visible: true
            })
            check = false;
        } else if (!mFunction.validatePassword(passwords.new)) {
            setNewPasswordNote({
                ...newPasswordNote,
                type: 'err',
                message: 'Password must have at least 6 characters',
                visible: true
            })
            check = false;
        } else if (passwords.old == passwords.new) {
            setNewPasswordNote({
                ...newPasswordNote,
                type: 'err',
                message: 'New password must be different from old password',
                visible: true
            })

            check = false;
        }
        else {
            setNewPasswordNote({ ...newPasswordNote, visible: false })
        }
        //#endregion

        //#region REPEAT
        if (passwords.repeatNew == '' || passwords.repeatNew === undefined) {
            setRepeatNewPasswordNote({
                ...repeatNewPasswordNote,
                type: 'warning',
                message: 'Please enter your new password again',
                visible: true
            })
            check = false;
        }
        else if (!mFunction.validatePassword(passwords.repeatNew)) {
            setRepeatNewPasswordNote({
                ...repeatNewPasswordNote,
                type: 'err',
                message: 'Password must have at least 6 characters',
                visible: true
            })
            check = false;
        }
        else if (passwords.new != passwords.repeatNew) {
            setRepeatNewPasswordNote({
                ...repeatNewPasswordNote,
                type: 'err',
                message: 'Repeat password must be same as new password',
                visible: true
            })
            check = false;
        }
        else {
            setRepeatNewPasswordNote({ ...repeatNewPasswordNote, visilbe: false })
        }

        //#endregion

        console.log(passwords)
        return check;
    }

    const changePassword = async () => {
        const temp = {
            ...values,
            password: encode(passwords.repeatNew)
        }
        console.log(temp)
        if (validatePassword()) {
            setIsLoading(true)
            try {
                const resultAction = await dispatch(updateAccount(temp))
                const originalPromiseResult = unwrapResult(resultAction)
                setIsLoading(false)
                setUpdateSucceeded({
                    status: true,
                    message: 'Update your password successfully!'
                })
                setValues({
                    ...values,
                    password: encode(passwords.repeatNew)
                })
            } catch (rejectedValueOrSerializedError) {
                if (rejectedValueOrSerializedError != null) {
                    setUpdateSucceeded({
                        status: true,
                        message: 'Sorry! There are something wrong with your request'
                    })
                }
            }
        }
    }

    const validateInformation = () => {
        let check = true;
        if (values.name == "" || values.name === undefined) {
            setNameNote({
                ...nameNote,
                type: 'warning',
                message: 'Please enter your name',
                visible: true
            })

            check = false;
        } else (setNameNote({ ...nameNote, visible: false }))

        if (values.phoneNumber == '' || values.phoneNumber === undefined) {
            setContactNote({
                ...contactNote,
                type: 'warning',
                message: 'Please enter your phone number',
                visible: true
            })
            check = false;
        } else if (!mFunction.validatePhoneNumber(values.phoneNumber)) {
            setContactNote({
                ...contactNote,
                type: 'err',
                message: 'Your input is not a valid phone number format',
                visible: true
            })
            check = false;
        }
        else (setContactNote({ ...contactNote, visible: false }))


        if (values.address == '' || values.address === undefined) {
            setAddressNote({
                ...addressNote,
                type: 'warning',
                message: 'Please enter your address',
                visible: true
            })
            check = false;
        } else { setAddressNote({ ...addressNote, visible: false }) }

        if (values.birthday == '' || values.birthday === undefined) {
            setBirthdayNote({
                ...birthdayNote,
                type: 'warning',
                message: 'Please enter your birthday',
                visible: true
            })
            check = false;
        } else { setBirthdayNote({ ...birthdayNote, visible: false }) }

        return check
    }
    const [name, setName] = useState(_currentUser.name)
    const [phoneNumber, setPhoneNumber] = useState(_currentUser.phoneNumber)
    const [address, setAddress] = useState(_currentUser.address)
    const [birthday, setBirthday] = useState(_currentUser.birthday)
    const [email, setEmail] = useState(_currentUser.email)


    const editProfile = async () => {
        if (validateInformation()) {
            setIsLoading(true)
            try {
                const resultAction = await dispatch(updateAccount(values))
                const originalPromiseResult = unwrapResult(resultAction)
                setIsLoading(false)
                setUpdateSucceeded({
                    status: true,
                    message: 'Update your profile successfully!'
                })
            } catch (rejectedValueOrSerializedError) {
                if (rejectedValueOrSerializedError != null) {
                    setUpdateSucceeded({
                        status: true,
                        message: 'Sorry! There are something wrong with your request'
                    })
                }
            }
        }
    }

    return (
        <Stack direction="column" spacing={2} sx={{ backgroundColor: '#F0F8FF' }}>
            <Navbar />
            <Helmet>
                <title>Profile</title>
            </Helmet>
            {/* <div className="profile__background">
                <div className="color__gradient"></div>
            </div> */}

            <div className="profile"  >
                <div className="profile-container">
                    <div className="profile-information">
                        <Typography variant='h5' sx={{ fontWeight: 600 }} >ACCOUNT INFORMATION</Typography>

                        <div className="line"></div>

                        <div className="profile-information__item">
                            <div className="profile-information__item__title">Name</div>
                            <ThemeProvider theme={TextFieldTheme}>
                                <TextField className="profile-information__item__content"
                                    variant="standard"
                                    sx={{
                                        borderRadius: '0.5',
                                        input: { color: 'black', marginLeft: 10, marginX: 0.4 },
                                        icons: { color: 'black' },
                                        color: 'black'
                                    }}
                                    // value={values.name}
                                    defaultValue={name}
                                    onChange={handleChangeInformation('name')}
                                />
                            </ThemeProvider>
                            {nameNote.visible &&
                                <div className="profile-information__item__note">
                                    <Message message={nameNote.message} type={nameNote.type} />
                                </div>
                            }
                        </div>

                        <div className="profile-information__item">
                            <div className="profile-information__item__title">Phone number</div>
                            <ThemeProvider theme={TextFieldTheme}>
                                <TextField className="profile-information__item__content"
                                    variant="standard"
                                    sx={{
                                        borderRadius: '0.5',
                                        input: { color: 'black', marginLeft: 10, marginX: 0.4 },
                                        //backgroundColor: 'rgb(9, 24, 48)',
                                        // label: { color: 'rgb(153, 153, 153)', fontSize: 15 }
                                    }}
                                    // value={_currentUser.phoneNumber}
                                    defaultValue={phoneNumber}
                                    onChange={handleChangeInformation('phoneNumber')}
                                />
                            </ThemeProvider>

                            {contactNote.visible &&
                                <div className="profile-information__item__note">
                                    <Message message={contactNote.message} type={contactNote.type}></Message>
                                </div>
                            }
                        </div>

                        <div className="profile-information__item">
                            <div className="profile-information__item__title">Address</div>
                            <ThemeProvider theme={TextFieldTheme}>
                                <TextField className="profile-information__item__content"
                                    variant="standard"
                                    sx={{
                                        borderRadius: '0.5',
                                        input: { color: 'black', marginLeft: 10, marginX: 0.4 },
                                        //backgroundColor: 'rgb(9, 24, 48)',
                                        // label: { color: 'rgb(153, 153, 153)', fontSize: 15 }
                                    }}
                                    defaultValue={address}
                                    onChange={handleChangeInformation('address')} F
                                />
                            </ThemeProvider>
                            {addressNote.visible &&
                                <div className="profile-information__item__note">
                                    <Message message={addressNote.message} type={addressNote.type} />
                                </div>
                            }
                        </div>

                        <div className="profile-information__item">
                            <div className="profile-information__item__title">Birthday</div>
                            <ThemeProvider theme={TextFieldTheme}>
                                <TextField className="profile-information__item__content"
                                    variant="standard"
                                    type="date"
                                    format="yyyy-MM-dd"
                                    sx={{
                                        borderRadius: '0.5',
                                        input: { color: 'black', marginLeft: 10, marginX: 0.4 },
                                        // backgroundColor: 'rgb(9, 24, 48)',
                                        // label: { color: 'rgb(153, 153, 153)', fontSize: 15 }
                                    }}
                                    InputLabelProps={{
                                        color: "#fff",
                                        style: { color: "#ffff" },
                                        shrink: true,
                                    }}

                                    InputProps={{
                                        style: { color: "#ffff" },
                                    }}
                                    defaultValue={birthday}
                                    onChange={handleChangeInformation('birthday')}
                                />
                            </ThemeProvider>

                            {birthdayNote.visible &&
                                <div className="profile-information__item__note">
                                    <Message type={birthdayNote.type} message={birthdayNote.message} />
                                </div>
                            }
                        </div>

                        <div className="profile-information__item">
                            <div className="profile-information__item__title">Email</div>
                            <ThemeProvider theme={TextFieldTheme}>
                                <TextField className="profile-information__item__content"
                                    variant="standard"
                                    sx={{
                                        borderRadius: '0.5',
                                        input: { color: 'black', marginLeft: 10, marginX: 0.4 },
                                        // backgroundColor: 'rgb(9, 24, 48)',
                                        // label: { color: 'rgb(153, 153, 153)', fontSize: 15 }
                                    }}
                                    defaultValue={email}
                                    onChange={handleChangeInformation('email')}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </ThemeProvider>
                        </div>

                        <Box textAlign='center' >
                            {/* <ThemeProvider theme={ButtonTheme}> */}
                            <Button variant="contained"
                                sx={{
                                    borderRadius: '15px',
                                    backgroundColor: 'black',
                                    width: '150px',
                                    padding: 1,
                                    marginTop: 3
                                }}
                                onClick={editProfile}
                            >SAVE CHANGES</Button>
                            {/* </ThemeProvider> */}
                        </Box>
                    </div>

                    <div className="clear"></div>
                </div>

                <div className="password-information">
                    <Typography variant='h5' sx={{ fontWeight: 600 }}>CHANGE YOUR PASSWORD</Typography>
                    <div className="line"></div>
                    <div className="password-information__item">
                        <div className="password-information__item__title">Old password</div>
                        <ThemeProvider theme={TextFieldTheme}>
                            <TextField className='password-information__item__txtfield'
                                type="password"
                                variant='standard'
                                autoComplete="current-password"
                                sx={{
                                    borderRadius: '0.5',
                                    input: { color: 'black', marginLeft: 10, marginX: 0.4 },
                                    // backgroundColor: 'rgb(9, 24, 48)',
                                    // label: { color: 'rgb(153, 153, 153)', fontSize: 15 }
                                }}
                                onChange={handleChangePasswords('old')}
                            />
                        </ThemeProvider>
                        {oldPasswordNote.visible &&
                            <div className="password-information__item__note">
                                <Message type={oldPasswordNote.type} message={oldPasswordNote.message} ></Message>
                            </div>
                        }
                    </div>

                    <div className="password-information__item">
                        <div className="password-information__item__title">New password</div>
                        <ThemeProvider theme={TextFieldTheme}>
                            <TextField className='password-information__item__txtfield'
                                type="password"
                                variant='standard'
                                autoComplete="current-password"
                                sx={{
                                    borderRadius: '0.5',
                                    input: { color: 'black', marginLeft: 10, marginX: 0.4 },
                                    // backgroundColor: 'rgb(9, 24, 48)',
                                    // label: { color: 'rgb(153, 153, 153)', fontSize: 15 }
                                }}
                                onChange={handleChangePasswords('new')}
                            />
                        </ThemeProvider>
                        {newPasswordNote.visible &&
                            <div className="password-information__item__note">
                                <Message message={newPasswordNote.message} type={newPasswordNote.type}></Message>
                            </div>
                        }
                    </div>

                    <div className="password-information__item">
                        <div className="password-information__item__title">Repeat new password</div>
                        <ThemeProvider theme={TextFieldTheme}>
                            <TextField className='password-information__item__txtfield'
                                type="password"
                                variant='standard'
                                autoComplete="current-password"
                                sx={{
                                    borderRadius: '0.5',
                                    input: { color: 'black', marginLeft: 10, marginX: 0.4 },
                                    //backgroundColor: 'rgb(9, 24, 48)',
                                    // label: { color: 'rgb(153, 153, 153)', fontSize: 15 }
                                }}
                                onChange={handleChangePasswords('repeatNew')}
                            />
                        </ThemeProvider>
                        {repeatNewPasswordNote.visible &&
                            <div className="password-information__item__note">
                                <Message type={repeatNewPasswordNote.type} message={repeatNewPasswordNote.message}></Message>
                            </div>
                        }
                    </div>

                    <Box textAlign='center'>
                        {/* <ThemeProvider theme={ButtonTheme}> */}
                        <Button variant="contained"
                            className='password-information__btnChange'
                            sx={{
                                borderRadius: '15px',
                                backgroundColor: 'black',
                                width: '150px',
                                padding: 1,
                                marginTop: 3
                            }}
                            onClick={changePassword}
                        >CHANGE PASSWORD</Button>
                        {/* </ThemeProvider> */}
                    </Box>
                </div>
            </div >
            <Footer />

            {isLoading && <Loading />}
            <Success message={updateSucceeded.message} status={updateSucceeded.status} />
        </Stack >
    )
}
