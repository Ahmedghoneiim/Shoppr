import React, { useContext, useEffect, useState } from "react";
import Style from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";


export default function ProductDetails() {

  let { addProductToCart } = useContext(CartContext);
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
      // console.log(response);
    }
    else
    {
      setLoading(false);

      toast.error(response.data.message);
    }
    // console.log(response);
  }


  let { id,category } = useParams();

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    arrows:false,
  };

  const [ProductDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  function getProductDetails(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        // console.log(data.data);
        setProductDetails(data.data);
      })
      .catch((error) => {});
  }

  function getRelatedProducts(category) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/`)
      .then(({ data }) => {
        let allProducts = data.data;
        let related = allProducts.filter((product)=> product.category.name == category);
        // console.log(related);
        setRelatedProducts(related);
      })
      .catch((error) => {

      });
  }
  
  useEffect(() => {
    getProductDetails(id);
    getRelatedProducts(category) ;
  }, [ id, category]);

  return (
    <>
      <div className="row md:w-[95%] w-[95%] mx-auto ">
        <div className="md:w-[25%] w-full">

          <Slider {...settings} >
          {ProductDetails?.images.map((src, index)=> <img key={index} src={src} alt={ProductDetails?.title} />)}
          </Slider>

        </div>

        <div className="md:w-[70%] text-center md:text-start ps-4 md:pt-0 pt-4">
          <h1 className="text-lg font-normal text-green-500">
            {ProductDetails?.title}
          </h1>
          <p className="text-gray-700 mt-4 font-light">
            {ProductDetails?.description}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-green-500">
              {ProductDetails?.price}
              <span className="font-normal ms-1">EGP</span>{" "}
            </span>
            <span className="text-lg font-normal text-green-500 py-2">
              {ProductDetails?.ratingsAverage}{" "}
              <i className="fas fa-star text-yellow-300" />
            </span>
          </div>
          <div className="btn-cart w-full flex flex-col justify-center items-center">
                  <button onClick={ ()=> addProduct(ProductDetails?.id)} className="btn cart shadow-md">
                  {currentProductId === ProductDetails?.id && loading? <i className="fas fa-spinner fa-spin"></i> : <i className="fa fa-shopping-basket " aria-hidden="true"></i>}
                    <span>Add to Cart</span>
                  </button>
                </div>
        </div>
      </div>

    
    </>
  );
}
