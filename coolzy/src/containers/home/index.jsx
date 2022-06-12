import { React } from 'react';
import { Helmet } from 'react-helmet';

import { Navbar, Slider, Footer, FeaturedProduct, Product } from '../../components/index';

const Home = () => {
    


    return (
        <div className='home__container'>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Slider />
            <Navbar />
            <FeaturedProduct />
            <Product />
            <Footer />
        </div>
    )
}

export default Home
