import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";


export let CartContext = createContext();

export default function CartContextProvider(props)
{

    const [cart, setCart] = useState(null)

    let headers =  {
        token : localStorage.getItem('userToken')
    }

    

    function getLoggedUserCart()
    {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers
        })
        .then((response) => {
            // console.log(response);
            return response
        })
        .catch((error) => error)
        
    }

    function updateCartItem(productId , count)
    {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {
            count
        } , {
            headers
        })
        .then((response) => {
            // console.log(response?.data?.data);
            return response
        })
        .catch((error) => error)
    }

    function addProductToCart(productId)
    {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
            productId: productId
        } , {
            headers
        })
        .then((response) => {
            // console.log(response?.data?.data);
            return response
        })
        .catch((error) => error)
    }


    function removeCartItem(productId)
    {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {
            headers
        })
        .then((response) => {
            // console.log(response?.data?.data);
            return response
        })
        .catch((error) => error)
    }

    async function getCart()
    {
        let response = await getLoggedUserCart();
        setCart(response.data);
    }
    useEffect(() => {
        getCart();
    }, []);



    return (
        <CartContext.Provider value={ { cart , setCart,  getLoggedUserCart , addProductToCart , removeCartItem , updateCartItem } } >
            {props.children}
        </CartContext.Provider>
    )
}