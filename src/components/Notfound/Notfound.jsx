import React, { useEffect, useState } from 'react';
import Style from './Notfound.module.css';
import error from '../../assets/images/error.svg'

export default function Notfound() {
    const [counter, setCounter] = useState(0);
    useEffect(()=>{

    } , []);
  return <>

    <div className=" flex justify-center items-center">

      <img src={error} alt="notFound For error" />
    </div>
  </>
}
