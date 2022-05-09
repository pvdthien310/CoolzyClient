import './App.css';
import { Routes, Route } from 'react-router-dom';

import Home from './containers/home';
import Login from './containers/login';
import Register from './containers/register/index';

function App() {

    return (
        <Routes>
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