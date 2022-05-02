import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './containers/home';
import ProductDetail from './containers/productDetails'

function App() {

    return (
        <Routes>
            <Route path="/" element={
                <div>
                    <Home />
                </div>
            } />

            <Route path="/productDetail/:category/:id" element={
                <div>
                    <ProductDetail />
                </div>
            }/>

        </Routes>
    );
}

export default App;