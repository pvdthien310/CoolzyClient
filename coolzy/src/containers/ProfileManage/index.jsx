import React from 'react'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red, grey } from "@mui/material/colors";

import { encode } from 'base-64'
import { Helmet } from 'react-helmet';
import './profile.css'
import Footer from '../../components/footer'
import Navbar from '../../components/navbar'

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
            primary: red
        },
    })

    return (
        // <div style={{ position: 'relative'}}>
        //     <Navbar />

        //     <Footer />
        // </div>
        <div className="profile__container">
            <Navbar />
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <div className="profile__background">
                <div className="color__gradient"></div>
            </div>

            <div className="profile"  >
                <div className="profile-container">
                    <div className="profile-information">
                        <div className="profile-information__title">ACCOUNT INFORMATION</div>

                        <div className="line"></div>

                        <div className="profile-information__item">
                            <div className="profile-information__item__title">Name</div>
                            <ThemeProvider theme={TextFieldTheme}>
                                <TextField className="profile-information__item__content"
                                    variant="standard"
                                    sx={{
                                        borderRadius: '0.5',
                                        input: { color: 'white', marginLeft: 10, marginX: 0.4 },
                                        icons: { color: 'white' }
                                        ///backgroundColor: 'rgb(9, 24, 48)',
                                        // label: { color: 'rgb(153, 153, 153)', fontSize: 15 }
                                    }}
                                    defaultValue="Name user"
                                // onChange={handleChangeInformation('name')}
                                />
                            </ThemeProvider>
                            {/* {nameNote.visible &&
                                <div className="profile-information__item__note">
                                    <Message message={nameNote.message} type={nameNote.type} />
                                </div>
                            } */}
                        </div>

                        <div className="profile-information__item">
                            <div className="profile-information__item__title">Contact</div>
                            <ThemeProvider theme={TextFieldTheme}>
                                <TextField className="profile-information__item__content"
                                    variant="standard"
                                    sx={{
                                        borderRadius: '0.5',
                                        input: { color: 'white', marginLeft: 10, marginX: 0.4 },
                                        //backgroundColor: 'rgb(9, 24, 48)',
                                        // label: { color: 'rgb(153, 153, 153)', fontSize: 15 }
                                    }}
                                // defaultValue={currentUser.contact}
                                // onChange={handleChangeInformation('contact')}
                                />
                            </ThemeProvider>

                            {/* {contactNote.visible &&
                                <div className="profile-information__item__note">
                                    <Message message={contactNote.message} type={contactNote.type}></Message>
                                </div>
                            } */}
                        </div>

                        <div className="profile-information__item">
                            <div className="profile-information__item__title">Indentity number</div>
                            <ThemeProvider theme={TextFieldTheme}>
                                <TextField className="profile-information__item__content"
                                    variant="standard"
                                    sx={{
                                        borderRadius: '0.5',
                                        input: { color: 'white', marginLeft: 10, marginX: 0.4 },
                                        //backgroundColor: 'rgb(9, 24, 48)',
                                        // label: { color: 'rgb(153, 153, 153)', fontSize: 15 }
                                    }}
                                // defaultValue={currentUser.identifyNumber}
                                // onChange={handleChangeInformation('identifyNumber')}
                                />
                            </ThemeProvider>
                            {/* {IDNote.visible &&
                                <div className="profile-information__item__note">
                                    <Message type={IDNote.type} message={IDNote.message}></Message>
                                </div>
                            } */}
                        </div>

                        <div className="profile-information__item">
                            <div className="profile-information__item__title">Address</div>
                            <ThemeProvider theme={TextFieldTheme}>
                                <TextField className="profile-information__item__content"
                                    variant="standard"
                                    sx={{
                                        borderRadius: '0.5',
                                        input: { color: 'white', marginLeft: 10, marginX: 0.4 },
                                        //backgroundColor: 'rgb(9, 24, 48)',
                                        // label: { color: 'rgb(153, 153, 153)', fontSize: 15 }
                                    }}
                                // defaultValue={currentUser.address}
                                // onChange={handleChangeInformation('address')}
                                />
                            </ThemeProvider>
                            {/* {addressNote.visible &&
                                <div className="profile-information__item__note">
                                    <Message message={addressNote.message} type={addressNote.type} />
                                </div>
                            } */}
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
                                        input: { color: 'white', marginLeft: 10, marginX: 0.4 },
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
                                // defaultValue={currentUser.birthday}
                                // onChange={handleChangeInformation('birthday')}
                                />
                            </ThemeProvider>

                            {/* {birthdayNote.visible &&
                                <div className="profile-information__item__note">
                                    <Message type={birthdayNote.type} message={birthdayNote.message} />
                                </div>
                            } */}
                        </div>

                        <div className="profile-information__item">
                            <div className="profile-information__item__title">Email</div>
                            <ThemeProvider theme={TextFieldTheme}>
                                <TextField className="profile-information__item__content"
                                    variant="standard"
                                    sx={{
                                        borderRadius: '0.5',
                                        input: { color: 'white', marginLeft: 10, marginX: 0.4 },
                                        // backgroundColor: 'rgb(9, 24, 48)',
                                        // label: { color: 'rgb(153, 153, 153)', fontSize: 15 }
                                    }}
                                    // defaultValue={currentUser.email}
                                    // onChange={handleChangeInformation('email')}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </ThemeProvider>
                            {/* {emailNoteVisible &&
              <div className="profile-information__item__note">
                <Message ></Message>
              </div>
            } */}
                        </div>

                        <Box textAlign='center' >
                            <ThemeProvider theme={ButtonTheme}>
                                <Button variant="contained"
                                    className='profile-information__btnSave'
                                    sx={{
                                        padding: 1,
                                        marginTop: 3
                                    }}
                                // onClick={editProfile}
                                >SAVE CHANGES</Button>
                            </ThemeProvider>
                        </Box>
                    </div>

                    <div className="clear"></div>
                </div>

                <div className="password-information">
                    <div className="password-information__title">CHANGE YOUR PASSWORD</div>
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
                                    input: { color: 'white', marginLeft: 10, marginX: 0.4 },
                                    // backgroundColor: 'rgb(9, 24, 48)',
                                    // label: { color: 'rgb(153, 153, 153)', fontSize: 15 }
                                }}
                            // onChange={handleChangePasswords('old')}
                            />
                        </ThemeProvider>
                        {/* {oldPasswordNote.visible &&
                            <div className="password-information__item__note">
                                <Message type={oldPasswordNote.type} message={oldPasswordNote.message} ></Message>
                            </div>
                        } */}
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
                                    input: { color: 'white', marginLeft: 10, marginX: 0.4 },
                                    // backgroundColor: 'rgb(9, 24, 48)',
                                    // label: { color: 'rgb(153, 153, 153)', fontSize: 15 }
                                }}
                            // onChange={handleChangePasswords('new')}
                            />
                        </ThemeProvider>
                        {/* {newPasswordNote.visible &&
                            <div className="password-information__item__note">
                                <Message message={newPasswordNote.message} type={newPasswordNote.type}></Message>
                            </div>
                        } */}
                    </div>

                    <div className="password-information__item">
                        <div className="password-information__item__title">Confirm new password</div>
                        <ThemeProvider theme={TextFieldTheme}>
                            <TextField className='password-information__item__txtfield'
                                type="password"
                                variant='standard'
                                autoComplete="current-password"
                                sx={{
                                    borderRadius: '0.5',
                                    input: { color: 'white', marginLeft: 10, marginX: 0.4 },
                                    //backgroundColor: 'rgb(9, 24, 48)',
                                    // label: { color: 'rgb(153, 153, 153)', fontSize: 15 }
                                }}
                            // onChange={handleChangePasswords('repeatNew')}
                            />
                        </ThemeProvider>
                        {/* {repeatNewPasswordNote.visible &&
                            <div className="password-information__item__note">
                                <Message type={repeatNewPasswordNote.type} message={repeatNewPasswordNote.message}></Message>
                            </div>
                        } */}
                    </div>

                    <Box textAlign='center'>
                        <ThemeProvider theme={ButtonTheme}>
                            <Button variant="contained"
                                className='password-information__btnChange'
                                sx={{
                                    padding: 1,
                                    marginTop: 3
                                }}
                            // onClick={changePassword}
                            >CHANGE PASSWORD</Button>
                        </ThemeProvider>
                    </Box>
                </div>
            </div >

            {/* {isLoading && <Loading />} */}
            {/* <Success message={updateSucceeded.message} status={updateSucceeded.status} /> */}
        </div>
        //  : <Loading />
        //         }
    )
}
