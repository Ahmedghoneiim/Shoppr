import React, { useEffect, useState } from 'react';
import Style from './CategoriesSlider.module.css';
import Slider from "react-slick";
import axios from 'axios';

export default function CategoriesSlider() {

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 2,
    autoplay:true,
    responsive: [
      {
        breakpoint: 1024, // md breakpoint
        settings: {
          slidesToShow: 6,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768, // sm breakpoint
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640, // xs breakpoint
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

const [categories, setCategories] = useState([]);

  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        setCategories(data.data);
        // console.log(data.data);
      })
      .catch((error) => {});
  }

    useEffect(()=>{
      getCategories();
    } , []);
  return <>
  <div className="slider-container overflow-hidden mx-auto md:w-[95%] w-[95%]">
    <h2 className='py-4 text-xl text-gray-800 font-medium'>Shop Popular Categories</h2>
    <Slider {...settings}>

        {categories.map((category)=> <div key={category.name}>
          <img className='category-img md:w-full w-full cursor-pointer' src={category.image} alt={category.name} />
          <h3 className='font-light mt-2'>{category.name}</h3>
        </div>)}
    </Slider>
  </div>
  </>
}
