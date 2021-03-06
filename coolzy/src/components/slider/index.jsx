import { React } from 'react';
import './styles.css'

import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";

const Slider = () => {
    SwiperCore.use([Autoplay]);

    const data = [
        {
            id: '0',
            title: 'To Details',
            description: 'From statement sleeves and low-down necklines to anything-but-basic bow accents, our newest styles are detail-oriented. Moreover, easy knit dressing echoes the effortlessness of beach days past while long, layered silhouettes transition effortlessly into fall',
            background: 'https://images.unsplash.com/photo-1503342331296-c8ca3b8dd0a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            poster: 'https://images.unsplash.com/photo-1503342394128-c104d54dba01?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
        },
        {
            id: '1',
            title: 'Stomping Ground',
            description: 'Our best-selling lug sole bootie returns and feel fresher than ever. we are kicking things off with spring top trends from vibrant hues and free-flowing',
            background: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
            poster: 'https://images.unsplash.com/photo-1531287333398-6d7bd77ef790?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
        },
        {
            id: '2',
            title: 'Experience custom clothing like never before',
            description: 'With Coolzy, choose the best of fabrics sourced from international heritage milis. Personalize your style just the way you want and we will have it in your hands',
            background: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            poster: 'https://images.unsplash.com/photo-1542596594-649edbc13630?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
        },
        {
            id: '3',
            title: 'To the tone down',
            description: 'Whether you are pairing high-hitting hemlines with oversized tops or sultry tanks with boyish bottoms, this is a toned-down approach to hot summer dressing',
            background: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            poster: 'https://images.unsplash.com/photo-1496124134604-7493ec63de68?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
        },


    ]
    return (
        <div className="slide__container">
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
            //autoplay={{ delay: 3000 }}

            >
                {
                    data.map((item, i) => (
                        <SwiperSlide key={i}>
                            <SlideItem item={item} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>

        </div>
    )
}

const SlideItem = props => {
    const item = props.item

    return (
        <div className="slide__item"
            style={{ backgroundImage: `url(${item.background})` }}
        >

            <div className="slide__item__contain">
                {/* <div className="login__color__gradient" /> */}
                <div className="slide__item__content__info">
                    <h2 className="slide__item__content__info__title">{item.title}</h2>
                    <p className="slide__item__content__info__overview">{item.description}</p>
                </div>

                <img className="slider__item__content__poster" src={item.poster} alt="" />

            </div>
        </div>
    )
}


export default Slider
