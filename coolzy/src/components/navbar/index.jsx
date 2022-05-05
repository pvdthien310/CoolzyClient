import { React } from 'react';
import './styles.css'
import logo_png from '../../assets/logo_png.png'

import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    return (
        <div className='navbar__container'>
            <img src={logo_png} alt='logo_png' />
            <TabBar />
            <IconBar />
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

    const navigate = useNavigate()

    const accountClick = () => {
       navigate('/manageProfile')
    }
    return (
        <div className='navbar__icon_bar__container'>
            <IconButton>
                <LocalGroceryStoreOutlinedIcon sx={{ marginRight: 1, marginLeft: 1, color: '#333333' }} />
            </IconButton>
            <IconButton onClick={accountClick}>
                <AccountCircleOutlinedIcon  sx={{ marginRight: 1, marginLeft: 1, color: '#333333' }} />
            </IconButton>
        </div>
    )
}

export default Navbar
