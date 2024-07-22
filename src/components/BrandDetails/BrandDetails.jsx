import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";


const BrandDetails = () => {
  const { id } = useParams(); 
  const [BrandDetails, setBrandDetails] = useState(null);
  const [relatedBrands, setRelatedBrands] = useState([]);

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


  function getBrandDetails(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
      .then(({ data }) => {
        // console.log("Brand Details Data:", data);
        setBrandDetails(data?.data?.name);
      })
      .catch((error) => {
        console.error("Error fetching brand details", error);
      });
  }

  function getRelatedBrands(brandName) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        let allBrands = data?.data;
        
        let related = allBrands.filter((product) => product?.brand?.name == brandName);
        setRelatedBrands(related);
        // console.log(related);
      })
      .catch((error) => {
        console.error("Error fetching related brands", error);
      });
  }

  useEffect(() => {
    if (id) {
      getBrandDetails(id);
      getRelatedBrands(BrandDetails);
    }
    
  }, [id,BrandDetails]);

  return (
    <>
      
      <div className="row mx-auto w-[95%]">
        {relatedBrands.length > 0 ? (
          relatedBrands?.map((brand) => (
            <div key={brand?._id} className="md:w-1/5 w-1/2">
              <div className="brand rounded-md my-2 py-2 px-2 flex flex-col justify-start items-center">
                <Link to={`/ProductDetails/${brand?.id}/${brand?.category?.name}`}>
                  <img
                    className="w-full rounded-md"
                    src={brand?.imageCover}
                    alt={brand?.name}/>
                  <span className="block font-normal text-green-500 mt-2 ">
                  {brand.category.name}
                  </span>
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    {brand.title.split(" ").slice(0, 2).join(" ")}
                  </h2>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-green-500">
                      {brand?.price}
                      <span className="font-normal ms-1">EGP</span>{" "}
                    </span>
                    <span className="text-lg font-normal text-green-500 py-2">
                      {brand?.ratingsAverage}{" "}
                      <i className="fas fa-star text-yellow-300" />
                    </span>
                  </div>
                  
                </Link>
                <div className="flex flex-col justify-start items-center ">
                  <button onClick={ ()=> addProduct(brand.id)} className="btn cart shadow-md ">
                    {currentProductId === brand.id && loading? <i className="fas fa-spinner fa-spin"></i> : <i className="fa fa-shopping-basket " aria-hidden="true"></i>}
                      <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No related brands found</p>
        )}
      </div>
    </>
  );
};

export default BrandDetails;

