import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import { useSelector } from 'react-redux';
import { currentUser } from './../../redux/selectors';
import MailIcon from '@mui/icons-material/Mail';
import { Grid, TextField } from '@mui/material';
import emailApi from '../../api/emailAPI'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { styles } from './styles'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Loading from '../../components/Loading/loading'
import { Success, Error } from '../../components/alert/alert'
import Logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar';

const Contact = () => {
    const navigate = useNavigate()
    const _currentUser = useSelector(currentUser)
    const [values, setValues] = useState({
        subject: '',
        content: ''
    })

    const handleChangeValue = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    }


    const [isLoading, setIsLoading] = useState(false)

    const [updateSucceeded, setUpdateSucceeded] = useState({
        status: false,
        message: '',
        display: false
    })

    const [errorNotification, setErrorNotification] = useState({
        status: false,
        message: '',
        display: false
    })

    const sendRequest = () => {
        if (_currentUser._id !== undefined || _currentUser._id !== null) {
            setIsLoading(true)
            emailApi.sendVerify({
                to: 'coolzyproject@gmail.com',
                subject: "[REQUEST] " + values.subject,
                text: "CUSTOMER INFORMATION: \n" +
                    `- Email: ${_currentUser.email}\n` +
                    `- Name: ${_currentUser.name} \n` +
                    `- Phone: ${_currentUser.phoneNumber} \n` +
                    `- Address: ${_currentUser.address}` + "\n" +
                    "-------------------------------------------------------- \n" +
                    values.content + "\n"
            }).then(data => {
                setUpdateSucceeded({
                    status: true,
                    message: 'Send your request successfully'
                })
                setIsLoading(false)
            })
                .catch(err => {
                    console.log(err)
                    setErrorNotification({
                        status: true,
                        message: 'Sorry! There are something wrong with your request'
                    })
                    setIsLoading(false)
                })

        }

        else navigate('/login')
    }


    return (
        <Stack direction={'column'} >
            <Navbar />
            <Stack sx={{ mt: 5 }}>
                <Box textAlign="center" style={{ margin: 20, marginTop: 80 }}>
                    <Typography variant="subtitle1">Coolzy Client Service Center is available from Monday to Friday from 9 AM to 6 PM.</Typography>
                    <Typography variant="subtitle1" style={{ marginTop: 20 }}>Our Client Advisors will be delighted to assist you and provide personalized advice.</Typography>
                </Box>

                <Box style={{ marginTop: 80, marginLeft: 40, marginRight: 40 }}>
                    <Grid container spacing={10}>
                        <Grid item xs={6}>
                            <Box style={{ padding: 20, backgroundColor: 'white' }}>
                                <Stack direction="row" spacing={1}>
                                    <MailIcon />
                                    <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>WRITE US</Typography>
                                </Stack>

                                <Box style={{ backgroundColor: 'black', height: 1, marginTop: 10, marginBottom: 10 }}></Box>

                                <Typography variant="subtitle1" style={{ marginTop: 12 }}>YOUR REQUEST</Typography>

                                <Grid container>
                                    <Grid item xs={4}>
                                        <Typography variant="body1" style={{ marginTop: 20 }}>Subject: </Typography>
                                    </Grid>

                                    <Grid item xs={8}>
                                        <TextField id="standard-basic" variant="standard" onChange={handleChangeValue('subject')} style={styles.TextField} />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <Typography variant="body1" style={{ marginTop: 20 }}>Your request: </Typography>
                                    </Grid>

                                    <Grid item xs={8}>
                                        <TextField multiline id="standard-basic" variant="standard" onChange={handleChangeValue('content')} style={styles.TextField} />
                                    </Grid>
                                </Grid>

                                <Box textAlign="center">
                                    {
                                        values.subject !== '' && values.content !== '' ?
                                            <CustomFillButton onClick={sendRequest}>Send</CustomFillButton>
                                            :
                                            <CustomFillButton disable >Send</CustomFillButton>
                                    }
                                </Box>
                                <br />


                                <Box style={{ backgroundColor: 'black', height: 1, marginTop: 16, marginBottom: 10 }}></Box>

                                <Typography variant="caption" style={{ marginTop: 16 }}>By clicking on “Send” you confirm you have read the Privacy Statement and consent to the processing of your personal data by Coolzy for the purposes described in such Privacy Statement to answer to your request.</Typography>
                            </Box>
                        </Grid>

                        <Grid item container xs={6}>
                            <Grid item xs={12}>
                                <ContactUs />
                            </Grid>

                            <Grid item xs={12}>
                                <Coolzy />
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>

                {isLoading && <Loading />}
                {updateSucceeded.status && <Success message={updateSucceeded.message} status={updateSucceeded.status} />}
                {errorNotification.status && <Error message={errorNotification.message} status={errorNotification.status} />}
            </Stack>
        </Stack>

    )
}

export default Contact

export const CustomFillButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: grey[900],
    '&:hover': {
        backgroundColor: grey[700],
    },
    padding: '6px 35px',
    marginLeft: '20px',
    borderRadius: '10px'

}));

const Coolzy = () => {
    return (
        <Grid item container xs={12} >
            <Grid xs={4}></Grid>
            <Grid xs={4}>
                <img src={Logo} style={{ backgroundSize: 'cover', backgroundPosition: 'center', width: 200 }} />
            </Grid>

            <Grid xs={4}>
                <Typography variant="h3" style={{ fontWeight: 'bold', color: '#000', marginTop: 80 }}>Coolzy</Typography>
            </Grid>
        </Grid>
    )
}

export const ContactUs = () => {
    return (
        <Box style={{ padding: 20, backgroundColor: 'white' }}>
            <Stack direction="row" spacing={1}>
                <LocalPhoneIcon />
                <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>CONTACT US</Typography>
            </Stack>
            <Box style={{ backgroundColor: 'black', height: 1, marginTop: 12, marginBottom: 10 }}></Box>
            <Typography variant="body2" style={{ marginTop: 20 }}>Our Client Advisors would be delighted to assist you.</Typography>
            <Stack direction="row" spacing={1}>
                <Typography variant="body2" style={{ marginTop: 20 }}>You may contact us at </Typography>
                <Typography variant="subtitle2" style={{ fontWeight: 'bold', marginTop: 18, fontStyle: 'italic' }}> 038.3303.061</Typography>
            </Stack>
            <Typography variant="body2" style={{ marginTop: 20 }}>Or: </Typography>
            <Stack direction="row" spacing={1}>
                <Typography variant="body2" style={{ marginTop: 20 }}>Email </Typography>
                <Typography variant="subtitle2" style={{ fontWeight: 'bold', marginTop: 18, fontStyle: 'italic' }}> coolzyproject@gmail.com</Typography>
            </Stack>

            <Box style={{ backgroundColor: 'black', height: 1, marginTop: 16, marginBottom: 10 }}></Box>
            <Typography variant="caption" style={{ fontStyle: 'italic', color: 'grey', marginTop: 16 }}>Service available from Monday to Friday from 9 am to 6 pm</Typography>
        </Box>
    )
}