import React, { useEffect, useState } from 'react';
import Style from './MainSlider.module.css';
import mainSlider from '../../assets/images/slider-image-3.jpeg'
import slide1 from '../../assets/images/slider-image-2.jpeg'
import slide2 from '../../assets/images/slider-image-1.jpeg'
import slide3 from '../../assets/images/blog-img-1.jpeg'
import slide4 from '../../assets/images/grocery-banner-2.jpeg'
import slide5 from '../../assets/images/blog-img-2.jpeg'

import Slider from "react-slick";

export default function MainSlider() {

  var settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    arrows:false,
  };
  return <>
  <div className="row md:w-[97%] w-[97%] mx-auto">
    <div className="md:w-3/4 w-3/4">

    <Slider {...settings}>

      <img src={mainSlider} alt="Slider for Home" className='md:w-full md:h-[450px] h-[300px]' />
      <img src={slide3} alt="Slider for Home" className='md:w-full md:h-[450px] h-[300px]' />
      <img src={slide4} alt="Slider for Home" className='md:w-full md:h-[450px] h-[300px]' />
      <img src={slide5} alt="Slider for Home" className='md:w-full md:h-[450px] h-[300px]' />

    </Slider>

    </div>
    <div className="md:w-1/4 w-1/4">
    <img src={slide1} className='md:w-full md:h-[225px] h-[150px]' alt="Slider for Home" />
    <img src={slide2} className='md:w-full md:h-[225px] h-[150px]' alt="Slider for Home" />
    
    </div>
  </div>
  </>
}
