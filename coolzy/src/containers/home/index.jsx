import { React } from 'react';

import Navbar from '../../components/navbar';
import Slider from './../../components/slider/index';
import Footer from './../../components/footer/index';
import Branch from '../../components/branch';
import Product from '../../components/product';

const Home = () => {

    return (
        <div className='home__container'>

            <Slider />
            <Navbar />
            <Branch />
            <Product />
            <Footer />
        </div>
    )
}

export default Home
