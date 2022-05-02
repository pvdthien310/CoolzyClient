import { React } from 'react';
import Navbar from '../../components/navbar';
import Slider from './../../components/slider/index';
import Footer from './../../components/footer/index';
import ProductHomeSlider from './../../components/productHomeSlider/index'

const Home = () => {

    return (
        <div className='home__container'>

            <Slider />
            <Navbar />
            <ProductHomeSlider category="Pants"/>
            <Footer />
        </div>
    )
}

export default Home
