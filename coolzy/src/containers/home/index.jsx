import { React } from 'react';

import { Navbar, Slider, Footer, FeaturedProduct, Product } from '../../components/index';

const Home = () => {
   

    return (
        <div className='home__container'>
            <Slider />
            <Navbar />
            <FeaturedProduct />
            <Product />
            <Footer />
        </div>
    )
}

export default Home
