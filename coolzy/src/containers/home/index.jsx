import { React } from 'react';

import Navbar from '../../components/navbar';
import Slider from './../../components/slider/index';
import Footer from './../../components/footer/index';
import Brand from '../../components/brand';
import Product from '../../components/product';

const Home = () => {

    return (
        <div className='home__container'>

            <Slider />
            <Navbar />
            <Brand />
            <Product />
            <Footer />
        </div>
    )
}

export default Home
