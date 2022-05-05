import { React, useEffect } from 'react';
import Navbar from '../../components/navbar';
import Slider from './../../components/slider/index';
import Footer from './../../components/footer/index';
import ProductHomeSlider from './../../components/productHomeSlider/index'
import { useState } from 'react';
import categoryApi from './../../api/categoryAPI';

const Home = () => {
    const [listCategoriesId, setListCategoriesId] = useState([])

    useEffect(() => {
        const getCategories = async () => {
            await categoryApi.getAllId()
                .then((res) => {
                    setListCategoriesId(res.data)
                    // console.log(res.data)
                    // console.log(listTypeId)
                })
                .catch((err) => console.log(err))
        }

        getCategories()

     //   console.log(listCategoriesId)

    }, [])

    return (
        <div className='home__container'>
            <Slider />
            <Navbar />

            <div>
                {
                    listCategoriesId && listCategoriesId.map((item, i) => (
                        item && <ProductHomeSlider categoryId={item}/>
                    ))
                }
            </div>

            <Footer />
        </div>
    )
}

export default Home
