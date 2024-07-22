import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import style from './Categories.module.css';
import { ClimbingBoxLoader } from "react-spinners";

export default function Categories() {

const [recentCategories, setRecentCategories] = useState([]);

function getRecentCategories() {
    axios
        .get(`https://ecommerce.routemisr.com/api/v1/categories`)
        .then(({ data }) => {
            // console.log(data.data);
            setRecentCategories(data?.data); 
        })
        .catch((error) => {
            console.error("Error fetching brands", error);
        });
}

useEffect(() => {
    getRecentCategories();
}, []);


if (!Array.isArray(recentCategories) || recentCategories.length === 0) {
    return <div className='py-4 w-full flex justify-center'>
        <ClimbingBoxLoader color='green' />
    </div>;
}

return <>

<div className="flex justify-center px-16 pt-10">
            <h1 className="text-green-600 font-semibold  rounded-md p-2 text-2xl md:text-3xl ">
                <span className="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded-lg shadow-lg">Categories</span>
            </h1>
        </div>
    <div className="row ">
        {recentCategories?.map((category) => ( 
            <div key={category._id} className="md:w-1/5 w-1/2">
                <div className={`${style.categories}  border-green-600 rounded-md flex flex-col justify-start items-center shadow-md`} >
                    <Link to={`/CategoriesDetails/${category?._id}`}>
                        <img 
                            className='category-img mt-3'
                            src={category?.image}
                            alt={category?.name}
                        />
                    </Link>
                        <h3 className='font-normal text-lg text-green-600 mt-2'>{category?.name}</h3>
                </div>
            </div>
        ))}
    </div>




</>
}