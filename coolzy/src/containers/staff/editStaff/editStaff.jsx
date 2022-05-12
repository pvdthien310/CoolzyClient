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

import {CustomFillButton, CustomOutlineButton} from '../index'
import { useParams } from 'react-router';

const EditStaff = () => {
  const {id} = useParams()
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
    _id: id,
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
                  <TextField id="standard-basic" label="Name" variant="standard" />
                  : <TextField id="standard-basic" label="Name" variant="standard" error helperText={validName.alert}
                  />
              }
            </Grid>

            <Grid xs={4} item >
              <Typography variant="body1">Email: </Typography>
            </Grid>
            <Grid xs={8} item>
              {
                validEmail.check === true ?
                  <TextField id="standard-basic" label="Email" variant="standard" />
                  : <TextField id="standard-basic" label="Email" variant="standard" error helperText={validEmail.alert}
                  />
              }
            </Grid>


            <Grid xs={4} item >
              <Typography variant="body1">Phone number: </Typography>
            </Grid>
            <Grid xs={8} item>
              {
                validPhone.check === true ?
                  <TextField id="standard-basic" label="Phone" variant="standard" />
                  : <TextField id="standard-basic" label="Phone" variant="standard" error helperText={validPhone.alert}
                  />
              }
            </Grid>

            <Grid xs={4} item >
              <Typography variant="body1">Address: </Typography>
            </Grid>
            <Grid xs={8} item>
              {
                validAddress.check === true ?
                  <TextField id="standard-basic" label="Address" variant="standard" />
                  : <TextField id="standard-basic" label="Address" variant="standard" error helperText={validAddress.alert}
                  />
              }
            </Grid>

            <Grid xs={4} item >
              <Typography variant="body1">Male: </Typography>
            </Grid>
            <Grid xs={8} item>
              <Switch defaultChecked />
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
              // defaultValue={currentUser.birthday}
              //  onChange={handleChangeInformation('birthday')}
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


export default EditStaff

