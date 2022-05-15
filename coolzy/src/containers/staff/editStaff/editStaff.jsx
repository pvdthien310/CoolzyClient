import React, { useState, useEffect } from 'react'
import { styles } from './styles'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { Switch } from '@mui/material';

import { CustomFillButton, CustomOutlineButton } from '../index'
import { useNavigate, useParams } from 'react-router';

import mFunction from '../../../function';
import accountApi from './../../../api/accountAPI';

const EditStaff = () => {
  const { id } = useParams()
  const [staff, setStaff] = useState({})
  const navigate = useNavigate()

  useEffect(async () => {
    await accountApi.getAccountWithID(id)
      .then((res) => {
        console.log(res.data)
        setStaff(res.data)
        setValues({
          _id: res.data._id,
          name: res.data.name,
          phoneNumber: res.data.phoneNumber,
          address: res.data.address,
          birthday: res.data.birthday,
          email: res.data.email,
          gender: res.data.gender
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id])

  const [validName, setValidName] = useState({
    flag: true,
    alert: ''
  })

  const [validEmail, setValidEmail] = useState({
    flag: true,
    alert: ''
  })

  const [validPhone, setValidPhone] = useState({
    flag: true,
    alert: ''
  })

  const [validAddress, setValidAddress] = useState({
    flag: true,
    alert: ''
  })

  const [values, setValues] = useState({
    _id: id,
    name: staff.name,
    phoneNumber: staff.phoneNumber,
    address: staff.address,
    birthday: staff.birthday,
    email: staff.email,
    gender: staff.gender
  })

  const [updateSucceeded, setUpdateSucceeded] = useState({
    status: false,
    message: ''
  })

  const handleChangeValue = (prop) => (event) => {
    console.log(event.target.value)
    if (prop !== 'gender')
      setValues({ ...values, [prop]: event.target.value });
    else {
      if (event.target.value === true)
        setValues({ ...values, gender: 'male' })
      else
        setValues({ ...values, gender: 'female' });
    }
  }


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
    }
    else {
      await accountApi.checkEmail(values.email)
        .then((res) => {
          if (res == 'Email already exists')
            setValidEmail({
              flag: false,
              alert: 'Your email is already existed'
            })
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
    }
    return check;
  }

  const modify = () => {
    console.log(values)
    if (validate()) {
      accountApi.createNewAccount(values)
        .then((res) => {

        })
        .catch((err) => { console.log(err) })
    }
  }

  return (
    <div>
      <div style={styles.container}>
        <Stack direction="column">
          <Typography variant="h6">Modify staff</Typography>
          <Grid container sx={{ p: 2 }}>
            <Grid xs={4} item >
              <Typography variant="body1">Name: </Typography>
            </Grid>
            <Grid xs={8} item>
              {
                validName.flag === true ?
                  <TextField id="standard-basic" variant="standard" onChange={handleChangeValue('name')} value={values.name}/>
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
                  <TextField id="standard-basic" label="Email" variant="standard" onChange={handleChangeValue('email')} value={values.email} />
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
                  <TextField id="standard-basic" label="Phone" variant="standard" onChange={handleChangeValue('phoneNumber')} value={values.phoneNumber}/>
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
                  <TextField id="standard-basic" label="Address" variant="standard" onChange={handleChangeValue('address')} value={values.address}/>
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
                defaultValue={values.birthday}
                onChange={handleChangeValue('birthday')}
              />
            </Grid>

            <Stack direction="row" sx={{ width: '100%', mt: 3, p: 1, justifyContent: 'end', alignItems: 'center' }}>
              <CustomFillButton onClick={modify}>Modify</CustomFillButton>
              <CustomOutlineButton onClick={() => navigate(-1)}>Cancel</CustomOutlineButton>
            </Stack>
          </Grid>
        </Stack>
      </div>
    </div>
  )

}


export default EditStaff

