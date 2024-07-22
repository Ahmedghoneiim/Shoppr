import React, { useEffect, useState } from 'react';
import style from './Brands.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';

export default function Brands() {
    const [recentBrands, setRecentBrands] = useState([]);

    function getRecentBrands() {
        axios
            .get(`https://ecommerce.routemisr.com/api/v1/brands`)
            .then(({ data }) => {
                // console.log(data.data);
                setRecentBrands(data.data); 
            })
            .catch((error) => {
                console.error("Error fetching brands", error);
            });
    }

    useEffect(() => {
        getRecentBrands();
    }, []);

    if (!Array.isArray(recentBrands) || recentBrands.length === 0) {
        return <div className='py-4 w-full flex justify-center'>
            <ClimbingBoxLoader color='green' />
        </div>;
    }

    return <>
        <div className="flex justify-center px-16 pt-10">
            <h1 className="text-green-600 font-semibold  rounded-md p-2 text-2xl md:text-3xl ">
                <span className="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded-lg shadow-lg">Brands</span>
            </h1>
        </div>
        

        <div className="row ">
            
            {recentBrands?.map((brand) => ( 
                <div key={brand._id} className="md:w-1/5 w-1/2">
                    <div className={`${style.brand} border-green-600 rounded-md flex flex-col justify-start items-center`} >
                        <Link to={`/BrandDetails/${brand._id}`}>
                            <img
                                src={brand?.image}
                                alt={brand?.name}
                            />
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    </>
    
}
