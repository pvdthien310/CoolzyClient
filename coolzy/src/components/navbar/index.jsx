import { React } from 'react';
import './styles.css'
import logo_png from '../../assets/logo_png.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';

const Navbar = () => {
    return (
        <div className='navbar__container'>
            <img src={logo_png} alt='logo_png' />
            <TabBar />
            {/* <IconBar /> */}
            <LoginBar />
        </div>
    )
}

const TabBar = () => {

    return (
        <div className='navbar__tab_bar__container'>
            <p>Home</p>
            <p>Store</p>
            <p>About</p>
            <p>Contact</p>
        </div>
    )
}

const IconBar = () => {

    return (
        <div className='navbar__icon_bar__container'>
            <LocalGroceryStoreOutlinedIcon sx={{ marginRight: 1, marginLeft: 1, color: '#333333' }} />
            <AccountCircleOutlinedIcon sx={{ marginRight: 1, marginLeft: 1, color: '#333333' }} />
        </div>
    )
}

const LoginBar = () => {

    let navigate = useNavigate();
    return (
        <div className='navbar__login_bar__container'>
            <p ><Link to="/login">LOGIN</Link></p>
            <CustomButton onClick={() => navigate('/register')}>REGISTER</CustomButton>

        </div>
    )
}

const CustomButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: grey[900],
    '&:hover': {
        backgroundColor: grey[700],
    },
    padding: '6px 35px',
    marginLeft: '20px',
    borderRadius: '10px'

}));

export default Navbar
