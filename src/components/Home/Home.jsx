import React, { useContext, useEffect, useState } from 'react';
import { CounterContext } from '../../Context/CounterContext';
import RecentProducts from '../RecentProducts/RecentProducts';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import MainSlider from '../MainSlider/MainSlider';

export default function Home() {


  let {setCounter} = useContext(CounterContext)

  return <>
  <MainSlider/>
  <CategoriesSlider/> 
    <RecentProducts/>

  </>
}
