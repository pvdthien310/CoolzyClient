import React, { useState, useEffect } from 'react'
import { styles } from './styles'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { Switch } from '@mui/material';
import Button from '@mui/material/Button';

import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const NewStaff = () => {
  const [validName, setValidName] = useState({
    check: true,
    alert: ''
  })

  const [validEmail, setValidEmail] = useState({
    check: true,
    alert: ''
  })

  const [validPhone, setValidPhone] = useState({
    check: true,
    alert: ''
  })

  const [validAddress, setValidAddress] = useState({
    check: true,
    alert: ''
  })

  const [values, setValues] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    birthday: '',
    email: '',
    password: '',
    gender: '',

  })

  const [updateSucceeded, setUpdateSucceeded] = useState({
    status: false,
    message: ''
  })

  const handleChangeValue = (prop) => (event) => {
    if (prop == 'gender') {
      if (event.target.value === true)
        setValues({ ...values, [prop]: 'male' })
      else
        setValues({ ...values, [prop]: 'female' })
    }
    else
      setValues({ ...values, [prop]: event.target.value });
      
    setUpdateSucceeded({
      status: false,
      message: ''
    })
  };

  return (
    <div>
      <div style={styles.container}>
        <Stack direction="column">
          <Typography variant="h6">New staff</Typography>
          <Grid container>

            <Grid xs={4} item >
              <Typography variant="body1">Name: </Typography>
            </Grid>
            <Grid xs={8} item>
              {
                validName.check === true ?
                  <TextField id="standard-basic" label="Name" variant="standard" onChange={handleChangeValue('name')} />
                  : <TextField id="standard-basic" label="Name" variant="standard" error helperText={validName.alert} onChange={handleChangeValue('name')}
                  />
              }
            </Grid>

            <Grid xs={4} item >
              <Typography variant="body1">Email: </Typography>
            </Grid>
            <Grid xs={8} item>
              {
                validEmail.check === true ?
                  <TextField id="standard-basic" label="Email" variant="standard" onChange={handleChangeValue('email')} />
                  : <TextField id="standard-basic" label="Email" variant="standard" error helperText={validEmail.alert} onChange={handleChangeValue('email')}
                  />
              }
            </Grid>


            <Grid xs={4} item >
              <Typography variant="body1">Phone number: </Typography>
            </Grid>
            <Grid xs={8} item>
              {
                validPhone.check === true ?
                  <TextField id="standard-basic" label="Phone" variant="standard" onChange={handleChangeValue('phoneNumber')} />
                  : <TextField id="standard-basic" label="Phone" variant="standard" error helperText={validPhone.alert} onChange={handleChangeValue('phoneNumber')}
                  />
              }
            </Grid>

            <Grid xs={4} item >
              <Typography variant="body1">Address: </Typography>
            </Grid>
            <Grid xs={8} item>
              {
                validAddress.check === true ?
                  <TextField id="standard-basic" label="Address" variant="standard" onChange={handleChangeValue('address')} />
                  : <TextField id="standard-basic" label="Address" variant="standard" error helperText={validAddress.alert} onChange={handleChangeValue('address')}
                  />
              }
            </Grid>

            <Grid xs={4} item >
              <Typography variant="body1">Male: </Typography>
            </Grid>
            <Grid xs={8} item>
              <Switch defaultChecked onChange={handleChangeValue('gender')} />
            </Grid>

            <Grid xs={4} item >
              <Typography variant="body1">Birthday: </Typography>
            </Grid>
            <Grid xs={8} item>
              <TextField className="profile-information__item__content"
                variant="standard"
                type="date"
                format="yyyy-MM-dd"
                sx={{
                  borderRadius: '0.5',
                  input: { color: '#000', marginLeft: 10, marginX: 0.4 },
                  // backgroundColor: 'rgb(9, 24, 48)',
                  // label: { color: 'rgb(153, 153, 153)', fontSize: 15 }
                }}
                InputLabelProps={{
                  color: "#fff",
                  style: { color: "#000" },
                  shrink: true,
                }}

                InputProps={{
                  style: { color: "#000" },
                }}
                ///defaultValue=
                onChange={handleChangeValue('birthday')}
              />
            </Grid>

            <Stack direction="row">
              <CustomFillButton>Add</CustomFillButton>
              <CustomOutlineButton>Cancel</CustomOutlineButton>
            </Stack>
          </Grid>
        </Stack>
      </div>
    </div>
  )
}


export default NewStaff

const CustomFillButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(grey[900]),
  backgroundColor: grey[900],
  '&:hover': {
    backgroundColor: grey[700],
  },
  padding: '6px 35px',
  marginLeft: '20px',
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