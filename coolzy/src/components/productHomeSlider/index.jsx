import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import clothesApi from './../../api/clothesAPI';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/navigation"
import { Pagination, FreeMode, Navigation } from "swiper";

import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';

import './style.css'
const ProductHomeSlider = props => {

    const [productItems, setProductItems] = useState([]);
    const [productType, setProductType] = useState(props.category);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [viewMoreVisible, setViewMoreVisible] = useState(true)


    useEffect(() => {
        const getProductsType = () => {
            setProductType(props.category)
        }

        getProductsType();

        console.log(productType)

        const getProducts = async () => {
            await clothesApi.getByCategory(productType)
                .then(res => {
                    setProductItems(res.data)

                })
                .catch(err => console.log(err))

                if (productItems.length > 5) {
                    setProductItems(productItems.slice(0, 4))
                }
        }

        getProducts();
        console.log(productItems);


    }, [props]);

    return (
        <div className="product-slider__container" id={props.typeFilm}>

            <div className="product-slider__container__header">
                <h3 className="product-slider__container__header__title">
                    {productType}
                </h3>


            </div>


            <div className="product-slider__container__content">
                {viewMoreVisible &&
                    <Box textAlign="right" sx={{marginRight: 5}} > 
                        <ViewMoreButton typeFilm={props.typeFilm}></ViewMoreButton>
                    </Box>
                }
                <Swiper className="product-slider__container__content__swiper"
                    slidesPerView={5}
                    centeredSlides={true}
                    freeMode
                    modules={[Pagination, Navigation, FreeMode]}
                >
                    {
                        productItems.map((item, i) => (
                            <SwiperSlide key={i}>
                                <SlideItem item={item} />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>

            </div>
        </div>
    );
}

const SlideItem = props => {
    const item = props.item;
    const background = item.images[0]
    console.log(background)
    // const dispatch = useDispatch();
    // const data = useSelector(movieSelector)
    const navigate = useNavigate();

    const openBooking = () => {
        navigate(`/booking/${props.item._id}`)
    }

    const GoToDetails = () => {
        navigate(`/productDetail/${props.item.category}/${props.item._id}`);
    }
    return (
        <div className="product-slider__item__container" >
            {/* <div className="product-slider__item__container__hoverItem">
                <button className="product-slider__item__container__hoverItem__buyTicketBtn" onClick={openBooking}>Booking</button>

            </div> */}
            <img className="product-slider__item__container__img" src={background} alt={item.name} onClick={GoToDetails} />

            <label className="product-slider__item__container__title" onClick={GoToDetails}>{item.name}</label>

            <div className="product-slider__item__container__price">{item.price}</div>
        </div>
    )
}



export const ViewMoreButton = (props) => {
    const btnTheme = createTheme({
        shape: {
            borderRadius: 20
        },
        palette: {
            primary: {
                main: '#000',
                outline: '#000',
            }
        },
    })

    const navigate = useNavigate();

    const onClick = () => {
        navigate(`/productDetails//${props.category}}`);
    }

    const btnStyles = {
        paddingX: 5, 
        paddingY: 0.8 ,
        '&:hover':{
            fontWeight: 'bold',
        }
    }
    return (
        <div className='typeOfFilm__container__content__viewMore'>
            <ThemeProvider theme={btnTheme} >
                <Button sx={btnStyles} variant="outlined" onClick={onClick} >View more</Button>
            </ThemeProvider>
        </div >
    )
}
export default ProductHomeSlider