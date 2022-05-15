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
import mFunction from '../../../function';
import accountApi from './../../../api/accountAPI';
import { useNavigate } from 'react-router';

const NewStaff = () => {
  const navigate = useNavigate()
  const [validName, setValidName] = useState({
    check: true,
    flag: ''
  })

  const [validEmail, setValidEmail] = useState({
    check: true,
    flag: ''
  })

  const [validPhone, setValidPhone] = useState({
    check: true,
    flag: ''
  })

  const [validAddress, setValidAddress] = useState({
    check: true,
    flag: ''
  })

  const [values, setValues] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    birthday: '',
    email: '',
    password: '123456',
    gender: 'male',
    role: "Staff",
    enable: true

  })

  const [updateSucceeded, setUpdateSucceeded] = useState({
    status: false,
    message: ''
  })

  const handleChangeValue = (prop) => (event) => {
    if (prop == 'gender') {

      if (event.target.checked === true)
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

  const validate = async () => {
    let check = true;
    console.log("iii: " + values.name)
    if (values.name === undefined || values.name === '') {
      setValidName({
        flag: false,
        alert: 'Please enter your name!'
      })
      check = false;
    }
    else if (!mFunction.onlyLettersAndSpaces(values.name)) {
      console.log(mFunction.containNumeric(values.name))
      setValidName({
        flag: false,
        alert: 'Invalid name!'
      })
      check = false;
    }

    if (values.email === undefined || values.email === '') {
      setValidEmail({
        flag: false,
        alert: 'Please enter email'
      })
      check = false;
    }
    else if (!mFunction.validateEmail(values.email)) {
      setValidEmail({
        flag: false,
        alert: 'Your email is not valid!'
      })
      check = false;
    }
    else {
      await accountApi.checkEmail(values.email)
        .then((res) => {
          if (res.status == 500) {
            setValidEmail({
              flag: false,
              alert: 'Your email is already existed'
            })
            check = false;
            console.log('email existed')
          }
        })

    }

    if (values.phoneNumber === undefined || values.phoneNumber === '') {
      setValidPhone({
        flag: false,
        alert: 'Please enter phone number'
      })
      check = false;
    }
    else if (mFunction.validatePhoneNumber(values.phoneNumber)) {
      setValidPhone({
        flag: false,
        alert: 'Invalid phone number!'
      })
      check = false;
    }


    if (values.address === undefined || values.address === '') {
      setValidAddress({
        flag: false,
        alert: 'Please enter address'
      })
      check = false;
    }

    return check;
  }

  const create = async () => {
    console.log(values)
    if (await validate()) {
      await accountApi.createNewAccount(values)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => { console.log(err) })
    }
  }

  return (
    <div>
      <div style={styles.container}>
        <Stack direction="column">
          <Typography variant="h6">New staff</Typography>
          <Grid container sx={{ p: 2 }}>
            <Grid xs={4} item >
              <Typography variant="body1">Name: </Typography>
            </Grid>
            <Grid xs={8} item>
              {
                validName.flag === true ?
                  <TextField id="standard-basic" label="Name" variant="standard" onChange={handleChangeValue('name')} />
                  : <TextField id="standard-basic" label="Name" variant="standard" onChange={handleChangeValue('name')} error helperText={validName.alert}
                  />
              }
            </Grid>

            <Grid xs={4} item >
              <Typography variant="body1">Email: </Typography>
            </Grid>
            <Grid xs={8} item>
              {
                validEmail.flag === true ?
                  <TextField id="standard-basic" label="Email" variant="standard" onChange={handleChangeValue('email')} />
                  : <TextField id="standard-basic" label="Email" variant="standard" onChange={handleChangeValue('email')} error helperText={validEmail.alert}
                  />
              }
            </Grid>


            <Grid xs={4} item >
              <Typography variant="body1">Phone number: </Typography>
            </Grid>
            <Grid xs={8} item>
              {
                validPhone.flag === true ?
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
                validAddress.flag === true ?
                  <TextField id="standard-basic" label="Address" variant="standard" onChange={handleChangeValue('address')} />
                  : <TextField id="standard-basic" label="Address" variant="standard" error helperText={validAddress.alert} onChange={handleChangeValue('address')}
                  />
              }
            </Grid>

            <Grid xs={4} item >
              <Typography variant="body1">Male: </Typography>
            </Grid>
            <Grid xs={8} item>
              <Switch onChange={handleChangeValue('gender')}
                defaultChecked
              // defaultChecked={
              //   staff.gender === 'male' ? true: false
              // }
              />
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

                onChange={handleChangeValue('birthday')}
              />
            </Grid>

            <Stack direction="row" sx={{ m: 2, p: 1, width: '100%', justifyContent: 'end' }}>
              <CustomFillButton onClick={create}>New</CustomFillButton>
              <CustomOutlineButton onClick={() => navigate(-1)}>Cancel</CustomOutlineButton>
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