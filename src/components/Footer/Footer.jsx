import React, { useEffect, useState } from 'react';
import Style from './Footer.module.css';
import master from '../../assets/card.svg';
import card from '../../assets/mastercard.svg';
import pay from '../../assets/paypal.svg';
import app from '../../assets/app-store.svg';
import google from '../../assets/google-play.svg';


export default function Footer() {
    const [counter, setCounter] = useState(0);
    useEffect(()=>{

    } , []);
  return <>
  <div className=" md:h-[45vh] h-[55vh] bg-gray-100 py-10">
    <div className="md:w-[90%] w-[90%] mx-auto">

      <div className="items">
        <p className='font-semibold'>Get the FreshCart app</p>
        <p className='text-gray-400 pt-2'>We will send you a link, open it on your phone to download the app.</p>
      </div>
      <div className=" md:flex flex justify-between items-center my-2">
        <input type="email" placeholder="Email ..." className="w-[80%]  rounded-lg px-6 py-1 bg-white focus:outline-none  border-2 focus:border-green-500 focus:ring-green-500 focus:ring-1" />
        <button className=' bg-green-500 md:px-6 px-1 py-2 rounded-lg text-white md:text-base text-[10px] font-bold'>Share App Link</button>
      </div>

      <span className="border-b-2 border-gray-200 w-full block pt-4"></span>    
      <div className="w-full flex justify-between items-center py-5">
        <div className="md:flex flex justify-center items-center gap-2">
            <h1 className='font-semibold'>Payment Partners</h1>
            <img className='w-[30px]' src={master} alt="masterCard" />
            <img className='w-[30px]' src={card} alt="masterCard" />
            <img className='w-[30px]' src={pay} alt="masterCard" />
        </div>
        

        <div className="md:flex flex justify-center items-center gap-2">
          <p className='font-semibold '>Get Deliveries with FreshCart</p>
          <img className='w-[100px]' src={app} alt="masterCard" />
          <img className='w-[100px]' src={google} alt="masterCard" />
        </div>

      </div>
      <span className="border-b-2 border-gray-200 w-full block "></span>    

    </div>
  </div>

</>
}
