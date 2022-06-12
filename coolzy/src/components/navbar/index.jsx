import React, { useEffect, useState } from 'react';
import './styles.css'
import logo_png from '../../assets/logo_png.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import CustomMenu from '../Menu/menu';

import jwtAPI from './../../api/jwtAPI';
import accountApi from './../../api/accountAPI';

import { useSelector, useDispatch } from 'react-redux';
import { accountSlice } from '../../redux/slices/accountSlices';

import { decode } from 'base-64'
import { encode } from 'base-64'

import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { grey } from '@mui/material/colors';

const Navbar = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch()

    const [logged, setLogged] = useState(false);
    const [accountToggle, setAccountToggle] = useState(false)

    const [menuToggle, setMenuToggle] = useState(false)

    const user = useSelector(state => state.account.user)
    const accountToggleHandle = () => {
        setAccountToggle(!accountToggle)
    }
    const checkLogged = () => {
        let logged = localStorage.getItem('logged')
        let remember = localStorage.getItem('rememberAccount')

        setLogged(logged)
        if (remember == 'true' && logged == 'true' && user == '') {
            let email = decode(localStorage.getItem(encode("rememberEmail")))
            let password = decode(localStorage.getItem(encode("rememberPassword")))

            jwtAPI.login(email, password)
                .then(async res => {
                    console.log(res)
                    if (res != "Email not exist" && res != "Password incorrect") {
                        await accountApi.getAccountByEmail(email).then(res2 => {
                            dispatch(accountSlice.actions.update(res2.data))
                        }).catch(err => console.log(err))
                    }
                    else {
                        localStorage.setItem("logged", false)
                        navigate('/login')
                    }
                })
                .catch(err => console.log(err))
        }
    }

    useEffect((checkLogged), [])

    const contactClick = () => {
        navigate('/contact')
    }

    const aboutClick = () => {
        navigate('/about')
    }
    const storeClick = () => {
        navigate('/product/all')
    }
    const homeClick = () => {
        navigate('/')
    }

    return (
        <div className='navbar__container'>
            <img src={logo_png} alt='logo_png' style={{cursor: 'pointer'}} onClick={homeClick}/>
            <TabBar aboutClick={aboutClick} contactClick={contactClick} storeClick={storeClick} homeClick={homeClick}/>
            {
                user == '' ?
                    <LoginBar />
                    :
                    <IconBar />
            }

        </div>
    )
}

const TabBar = ({contactClick, aboutClick, storeClick, homeClick}) => {

    return (
        <div className='navbar__tab_bar__container'>
            <p onClick={homeClick} style={{cursor: 'pointer'}}>Home</p>
            <p onClick={storeClick} style={{cursor: 'pointer'}}>Store</p>
            <p onClick={aboutClick} style={{cursor: 'pointer'}}>About</p>
            <p onClick ={contactClick} style={{cursor: 'pointer'}}>Contact</p>
        </div>
    )
}

const IconBar = () => {
    const [accountToggle, setAccountToggle] = useState(false)
    const accountToggleHandle = () => {
        setAccountToggle(!accountToggle)
    }
    const navigate = useNavigate()
    const handleClickFavorite = () => {
        navigate('/favorite')
    }
    const handleClickCart = () => {
        navigate('/myCart')
    }
    return (
        <div className='navbar__icon_bar__container'>
            <IconButton onClick={handleClickCart} sx={{ marginTop: -1 }}>
                <LocalGroceryStoreOutlinedIcon sx={{ color: '#333333' }} />
            </IconButton>
            <IconButton onClick={handleClickFavorite} sx={{ marginTop: -1 }}>
                <FavoriteBorderIcon sx={{ color: '#333333' }} />
            </IconButton>
            {accountToggle ?

                <MenuRoundedIcon sx={{ marginRight: 1, marginLeft: 1, color: '#000', cursor: 'pointer' }} onClick={accountToggleHandle} />
                :
                <MenuRoundedIcon sx={{ marginRight: 1, marginLeft: 1, color: '#333333', cursor: 'pointer' }} onClick={accountToggleHandle} />}

            <div className='navbar__menu'>
                {accountToggle && <CustomMenu accountToggleHandle={accountToggleHandle} />}
            </div>

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
