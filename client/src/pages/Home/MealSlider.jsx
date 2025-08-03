import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { Autoplay, EffectCards } from 'swiper/modules';

function BookSlider() {
    return (
        <div className='HomeSlider'>
            <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[Autoplay, EffectCards]}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                className="mySwiper"
            >
                <SwiperSlide></SwiperSlide>
                <SwiperSlide></SwiperSlide>
                <SwiperSlide></SwiperSlide>
                <SwiperSlide></SwiperSlide>
                <SwiperSlide></SwiperSlide>
                <SwiperSlide></SwiperSlide>
                <SwiperSlide></SwiperSlide>
                <SwiperSlide></SwiperSlide>
                <SwiperSlide></SwiperSlide>
            </Swiper>
        </div>
    )
}

export default BookSlider;
