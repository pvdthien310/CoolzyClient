import './App.css';

import Home from './containers/home';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ProfileManage } from './containers/ProfileManage';

import Login from './containers/login';
import Register from './containers/register/index';

function App() {

    return (
        <Routes>
            <Route path="/manageProfile" element={<ProfileManage />} />
            <Route path="/" element={
                <Home />
            } />

            <Route path="/login" element={
                <Login />
            } />

            <Route path="/register" element={
                <Register />
            } />

        </Routes>
    );
}

export default App;