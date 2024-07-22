import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ClimbingBoxLoader } from "react-spinners";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";



export default function RecentProducts() {

  let { addProductToCart , setCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false)
  const [currentProductId, setCurrentProductId] = useState(false)


  async function addProduct(productId)
  {
    setCurrentProductId(productId)
    setLoading(true);
    let response  = await addProductToCart(productId);

    if(response.data.status === 'success')
    {
      toast.success(response.data.message );
      setLoading(false);
      setCart(response.data);
      // console.log(response);
    }
    else
    {
      setLoading(false);

      toast.error(response.data.message);
    }

  }


  function getRecent() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  let { data, isError, error, isLoading, isFetching } = useQuery({
    queryKey: ["recentProducts"],
    queryFn: getRecent,
      // refetchInterval:3000,
    // refetchIntervalInBackground:true,
    // staleTime:2000,
    // refetchOnWindowFocus:'always',
    // retry:6,
    // retryDelay:5000,
    // gcTime:4000,
    select:(data) => data.data.data
  });
  // console.log(data);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <ClimbingBoxLoader color="green" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-4 flex justify-center items-center">
        <h2 className="">{Error}</h2>
      </div>
    );
  }


  return (
    <>
      <div className="row">
        {data.map((product) => (
          <div key={product.id} className="md:w-1/6 w-1/2 px-4 mb-2">
            <div className="product  rounded-md my-2 py-2 px-2 flex flex-col justify-start items-center">
              <Link
                to={`/ProductDetails/${product.id}/${product.category.name}`}
              >
                <img
                  className="md:w-full md:h-[300px] h-[300px] rounded-md"
                  src={product.imageCover}
                  alt={product.title}
                />
                <span className="block font-normal text-green-500 mt-2 ">
                  {product.category.name}
                </span>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h2>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-green-500 ">
                    {product.price}
                    <span className="font-normal ms-1">EGP</span>{" "}
                  </span>
                  <span className="text-lg font-normal text-green-500">
                    {product.ratingsAverage}{" "}
                    <i className="fas fa-star text-yellow-300" />
                  </span>
                </div>
                
              </Link>
              <div className="flex flex-col justify-start items-center ">
                  <button onClick={ ()=> addProduct(product.id)} className="btn cart shadow-md ">
                    {currentProductId === product.id && loading? <i className="fas fa-spinner fa-spin"></i> : <i className="fa fa-shopping-basket " aria-hidden="true"></i>}
                      <span>Add to Cart</span>
                  </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
