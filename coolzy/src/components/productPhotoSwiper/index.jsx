import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./productSwiper.css"

import { FreeMode, Navigation, Thumbs } from "swiper";

const ProductPhotoSwiper = (props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
 // const listImg = props.images;
 const [listImg, setListImg] = useState([]);

  useEffect(() =>{
    console.log("hhhhhhhhhhhh")
    setListImg(props.images)
    console.log(listImg);
  },[props])

  // const listImg = [
  //   // "https://product.hstatic.net/1000378196/product/z2596904679410_73e6183a9a600f41fe77b43495827be9_a7d0ee80f42241259712fd4aa4d61659_master.jpg",
  //   // "https://product.hstatic.net/1000378196/product/z2596904682306_9aae9bca908ae414669d93acf4c06b0b_79ff477757e348fcbcae5c10cf43d7d8_master.jpg",

  //   "https://swiperjs.com/demos/images/nature-6.jpg",
  //   "https://swiperjs.com/demos/images/nature-7.jpg"
  // ]

  

  return (

    <div className="product-photo-container" >
      <Swiper
        style={{
          "--swiper-navigation-color": "#000",
          "--swiper-pagination-color": "#000",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {
        listImg && listImg.map((item, i) => (
          //console.log(item)
          <SwiperSlide>
            <img scr={item} />
          </SwiperSlide>
        ))

      }

        {/* <SwiperSlide>
          <img src="https://product.hstatic.net/1000378196/product/z2596904679410_73e6183a9a600f41fe77b43495827be9_a7d0ee80f42241259712fd4aa4d61659_master.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://product.hstatic.net/1000378196/product/z2596904682306_9aae9bca908ae414669d93acf4c06b0b_79ff477757e348fcbcae5c10cf43d7d8_master.jpg" />
        </SwiperSlide> */}

      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {
        listImg && listImg.map((item, i) => (
          <SwiperSlide key={i}>
            <img scr={item} />
          </SwiperSlide>
        ))

      }

        {/* <SwiperSlide>
          <img src="https://product.hstatic.net/1000378196/product/z2596904679410_73e6183a9a600f41fe77b43495827be9_a7d0ee80f42241259712fd4aa4d61659_master.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://product.hstatic.net/1000378196/product/z2596904682306_9aae9bca908ae414669d93acf4c06b0b_79ff477757e348fcbcae5c10cf43d7d8_master.jpg" />
        </SwiperSlide> */}

      </Swiper>
    </div>
  )
}

export default ProductPhotoSwiper