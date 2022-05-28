import { React } from 'react';

import { Navbar, Slider, Footer, Brand, Product } from '../../components/index';

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
