import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import CakeIcon from '@mui/icons-material/Cake';
import PhoneIcon from '@mui/icons-material/Phone';

export const createData = (staff) => {
  const email = staff.email
  const phoneNumber = staff.phoneNumber
  const name = staff.name
  const address = staff.address
  const gender = staff.gender
  const birthday = staff.birthday
  return {
    email, name, phoneNumber, gender, address, birthday
  };
}

const Row = (props) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.email}</TableCell>
        <TableCell align="right">{row.phoneNumber}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Detail
              </Typography >

              <StaffInformation data={row} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
  }).isRequired,
};

const StaffInformation = (props) => {
  const data = props.data
  return (
    <Grid container spacing={2}>
      <Grid>
        <Item item xs={1}>
          <PersonIcon />
        </Item>
      </Grid>
      <Grid item xs={4}>
        <Item>Name: </Item>
      </Grid>
      <Grid item xs={7}>
        <Item>{data.name}</Item>
      </Grid>

      <Grid>
        <Item item xs={1}>
          <EmailIcon />
        </Item>
      </Grid>
      <Grid item xs={4}>
        <Item>Email: </Item>
      </Grid>
      <Grid item xs={7}>
        <Item>{data.email}</Item>
      </Grid>

      <Grid>
        <Item item xs={1}>
          <PhoneIcon />
        </Item>
      </Grid>
      <Grid item xs={4}>
        <Item>Phone: </Item>
      </Grid>
      <Grid item xs={7}>
        <Item>{data.phoneNumber}</Item>
      </Grid>

      <Grid>
        <Item item xs={1}>
          <HomeIcon />
        </Item>
      </Grid>
      <Grid item xs={4}>
        <Item>Address: </Item>
      </Grid>
      <Grid item xs={7}>
        <Item>{data.address}</Item>
      </Grid>

      <Grid>
        <Item item xs={1}>
          <PersonIcon />
        </Item>
      </Grid>
      <Grid item xs={4}>
        <Item>Gender: </Item>
      </Grid>
      <Grid item xs={7}>
        <Item>{data.gender}</Item>
      </Grid>

      <Grid>
        <Item item xs={1}>
          <CakeIcon />
        </Item>
      </Grid>
      <Grid item xs={5}>
        <Item>Birthday: </Item>
      </Grid>
      <Grid item xs={7}>
        <Item>{data.birthday}</Item>
      </Grid>
    </Grid>
  )


}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default Row