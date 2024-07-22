import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { ClimbingBoxLoader } from 'react-spinners';
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

const categoriesDetails = () => {
  const { id } = useParams(); 
  const [categoriesDetails, setCategoriesDetails] = useState(null);
  const [relatedCategories, setRelatedCategories] = useState([]);

  // Why My data didn't work here and ensure i want call Data First!

  
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
      toast.success(response.data.message);
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


useEffect(() => {
    if (id) {
      getCategoriesDetails(id);
    }
}, [id]);

useEffect(() => {
    if (categoriesDetails) {
      getRelatedCategories(categoriesDetails.name);
    }
}, [categoriesDetails]);


  function getCategoriesDetails(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
      .then(({ data }) => {
        // console.log("Categories Details Data:", data.data);
        setCategoriesDetails(data?.data)
      })
      .catch((error) => {
        console.error("Error fetching categories details", error);
      });
  }

  function getRelatedCategories(categoriesName) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        let allCategories = data.data;
        let related = allCategories.filter((product) => product.category.name == categoriesName);
        setRelatedCategories(related);
        // console.log(related);
      })
      .catch((error) => {
        console.error("Error fetching related Categories", error);
      });
  }


  if (!categoriesDetails) {
    return <div className='py-8 w-full flex justify-center'>
        <ClimbingBoxLoader color='green' />
    </div>;
}

  return (
    <>
      
      <div className="row mx-auto w-[95%]">
        {relatedCategories.length > 0 ? (
          relatedCategories.map((product) => (
            <div key={product?._id} className="md:w-1/5 w-1/2 px-4 mb-2">
              <div className="product rounded-md my-2 py-2 px-2 flex flex-col justify-start items-center">
                <Link to={`/ProductDetails/${product?._id}/${product?.category?.name}`}>
                  <img
                    className="w-full rounded-md"
                    src={product?.imageCover}
                    alt={product?.name}/>
                  <span className="block font-normal text-green-500 mt-2 ">
                  {product?.category?.name}
                  </span>
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h2>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-green-500">
                      {product?.price}
                      <span className="font-normal ms-1">EGP</span>{" "}
                    </span>
                    <span className="text-lg font-normal text-green-500 py-2">
                      {product?.ratingsAverage}{" "}
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
          ))
        ) : (
          <p>No related Categories found</p>
        )}
      </div>
    </>
  );
};

export default categoriesDetails;

