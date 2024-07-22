import React, { useContext, useEffect, useState } from "react";
import Style from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";

export default function Cart() {

  let { getLoggedUserCart , updateCartItem , removeCartItem , setCart} = useContext(CartContext);


  const [CartDetails, setCartDetails] = useState(null);

  async function getCartItems() {
    let response = await getLoggedUserCart();
    // console.log(response.data.data);
    setCartDetails(response?.data.data);
  }

  async function updateQuantity(productId , count) {
    if (count < 1)
    removeCartItem(productId);
    let response = await updateCartItem(productId , count);
    // console.log(response?.data);
    setCartDetails(response?.data.data);
  }


  async function deleteItem(productId) {
    let response = await removeCartItem(productId);
    // console.log(response);
    setCartDetails(response?.data.data);
    setCart(response?.data)
  }

  useEffect(() => {
    getCartItems();
  }, []);

  
  return (
    <>



  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex justify-center px-16 pt-10">
        <h1 className="text-green-600 font-semibold rounded-md p-2 text-2xl md:text-3xl ">
          <span className="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded-lg shadow-lg">
            Shopping Cart
          </span>
        </h1>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-500 text-center py-4">
          Total Cart Price: {CartDetails?.totalCartPrice} EGP
        </h3>
      </div>
      <table className="w-3/4 mx-auto my-6 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-100 dark:bg-emerald-500">
          <tr>
            <th scope="col" className="px-16 py-3">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-6 py-3">Product</th>
            <th scope="col" className="px-6 py-3">Qty</th>
            <th scope="col" className="px-6 py-3">Price</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {CartDetails?.products?.map((product) => (
            <tr
              key={product._id}
              className="bg-white border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-200"
            >
              <td className="p-4">
                <img
                  src={product.product.imageCover}
                  className="w-16 md:w-32 max-w-full max-h-full"
                  alt={product.product.title || "Product Image"}
                />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-green-400">
                {product.product.title || "Product Name"}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(product.product.id, product.count - 1)}
                    className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button"
                  >
                    <span className="sr-only">Decrease quantity</span>
                    <svg
                      className="w-3 h-3 text-green-400"
                      aria-hidden="true"
                      fill="none"
                      viewBox="0 0 18 2"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M1 1h16"
                      />
                    </svg>
                  </button>
                  <div>
                    <span className="text-green-400">{product.count}</span>
                  </div>
                  <button
                    onClick={() => updateQuantity(product.product.id, product.count + 1)}
                    className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button"
                  >
                    <span className="sr-only">Increase quantity</span>
                    <svg
                      className="w-3 h-3 text-green-400"
                      aria-hidden="true"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                <span className="text-green-400">{product.price || "0.00"} EGP</span>
              </td>
              <td className="px-6 py-4">
                <span
                  onClick={() => deleteItem(product.product.id)}
                  className="font-medium text-green-500 dark:text-red-300 bg-slate-600 p-2 rounded hover:text-red-400 cursor-pointer"
                >
                  Remove
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  </div>

    </>
  );
}
