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
  const [listImg, setListImg] = useState(props.images);

  useEffect(() => {
    setListImg(props.images)
  }, [props.images])

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
          listImg && listImg.map((item, i) => 
            
                <SwiperSlide key={i}>
                  <div>
                    <img src={item} alt="" />
                    </div>
                
            </SwiperSlide> 
             
          )
        }

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
              <img src={item} alt="" />
            </SwiperSlide>
          ))

        }

      </Swiper>
    </div>
  )
}

export default ProductPhotoSwiper