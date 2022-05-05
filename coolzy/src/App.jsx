import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './containers/home';
import ProductDetail from './containers/productDetails'
import Login from './containers/login';
import Register from './containers/register/index';

function App() {

    return (
        <Routes>
            <Route path="/" element={
                <div>
                    <Home />
                </div>
            } />

            <Route path="/productDetail/:categoryId/:id" element={
                <div>
                    <ProductDetail />
                </div>
            }/>
            
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