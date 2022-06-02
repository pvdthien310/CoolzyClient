import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Home from './containers/home';
import ProductDetail from './containers/productDetails'
import Login from './containers/login';
import Register from './containers/register/index';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from './redux/selectors';
import MainManager from './containers/manager';
import { Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import accountApi from './api/accountAPI';
import JWTApi from './api/jwtAPI';
import { decode, encode } from 'base-64';
import { accountSlice } from './redux/slices/accountSlices';
import { ProfileManage } from './containers/ProfileManage';
import Checkout from './containers/checkout/index'
import TransactionHistory from './containers/transactionHistory';
import FavoritePage from './containers/favorite/index';
import About from './containers/about/index'
import Contact from './containers/contact/index'

function App() {
    const _currentUser = useSelector(currentUser)
    const [logged, setLogged] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const checkLogged = () => {
        let logged = localStorage.getItem('logged')
        let remember = localStorage.getItem('rememberAccount')

        setLogged(logged)
        if (remember == 'true' && logged == 'true' && _currentUser == '') {
            let email = decode(localStorage.getItem(encode("rememberEmail")))
            let password = decode(localStorage.getItem(encode("rememberPassword")))

            JWTApi.login(email, password)
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

    return (
        <Routes>
            <Route path="/manageProfile" element={<ProfileManage />} />
            {/* <Route path="/ordersManagement" element={<OrdersManagement />} /> */}
            <Route path="/" element={
                <Home />
            } />

            <Route path="/productDetail/:categoryId/:id" element={
                <div>
                    <ProductDetail />
                </div>
            } />

            {_currentUser != "" &&
                <Route path="*" element={
                    _currentUser != "" && _currentUser.role != 'Customer' ? <MainManager /> : <Home />
                } />
            }
            <Route path="/login" element={
                <Login />
            } />

            <Route path="/register" element={
                <Register />
            } />

            <Route path="/checkout" element={
                <Checkout />
            }/>
            <Route path="/history" element={
                <TransactionHistory />
            } />

            <Route path="/favorite" element={
                <FavoritePage />
            } />

            <Route path="/about" element={
                <About/>
            }/>

            <Route path="/contact" element={
                <Contact/>
            }/>
        </Routes>
    );
}

export default App;