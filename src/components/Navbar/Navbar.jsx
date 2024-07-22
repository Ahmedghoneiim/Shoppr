
import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/images/logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext/UserContext";
import Style from './Navbar.module.css';
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {

  let navigate = useNavigate();
  let { userLogin, setUserLogin } = useContext(UserContext);
  const [show, setShow] = useState(false);

  let {cart} = useContext(CartContext);
  // console.log(cart);

  function logOut() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
  }

  useEffect(() => {}, []);

  return (
    <>
      <nav className="bg-gray-100 fixed top-0 left-0 right-0 z-50">
        <div className="container md:w-[95%] w-[95%] items-center md:flex   justify-between mx-auto py-4">
          <div className="flex flex-col xl:flex-row text-center">
            <img src={logo} width={120} alt="fresh cart logo " />
            <ul className={`flex flex-col xl:flex-row justify-around md:mt-0 mt-2  md:gap-0 gap-5 pl-10 ${show ? 'block' : 'hidden'} xl:flex`}>
              {userLogin !== null ? (
                <>
                  <li className={`text-md mx-4 text-slate-900 font-normal ${Style.navbar}`}>
                    <NavLink to={"/"}> Home </NavLink>
                  </li>
                  
                  <li className={`text-md mx-4 text-slate-900 font-normal ${Style.navbar}`}>
                    <NavLink to={"/products"}> Products </NavLink>
                  </li>
                  <li className={`text-md mx-4 text-slate-900 font-normal ${Style.navbar}`}>
                    <NavLink to={"/categories"}> Categories </NavLink>
                  </li>
                  <li className={`text-md mx-4 text-slate-900 font-normal ${Style.navbar}`}>
                    <NavLink to={"/brands"}> Brands </NavLink>
                  </li>
                  {/* <li className={`text-md mx-4 text-slate-900 font-normal ${Style.navbar}`}>
                    <NavLink to={"/cart"}> Cart </NavLink>
                  </li> */}
                </>
              ) : null}
            </ul>
          </div>

          <ul className={`flex flex-col xl:flex-row justify-around md:mt-0 mt-5 pl-10 md:gap-0 gap-5 ${show ? 'block' : 'hidden'} xl:flex`}>
            {userLogin == null ? (
              <>
                <li className={`text-md mx-4 text-slate-900 font-normal ${Style.navbar}`}>
                  <NavLink to={"/login"}> Login </NavLink>
                </li>
                <li className={`text-md mx-4 text-slate-900 font-normal ${Style.navbar}`}>
                  <NavLink to={"/register"}> Register </NavLink>
                </li>
              </>
            ) :
            <>
            <li   className={`text-md mx-4 text-slate-900 font-normal cursor-pointer relative`}> 
              <NavLink to={'/cart'} className= " text-lg text-salte-900 font-light cursor-pointer">
                <i className="fa-solid fa-cart-arrow-down fa-xl text-[#7f7f90]"></i>
                <span className="bg-green-600 text-[12px] font-semibold text-white py-[1px] px-[9px] text-md absolute top-[-14px] right-[-22px] rounded-full"> 
                    {cart?.numOfCartItems}
                </span>
                </NavLink>
              </li>
            <li onClick={logOut}  className={`text-md mx-4 text-slate-900 font-normal cursor-pointer`}> <span className={`text-[#7f7f90] hover:text-red-400 font-semibold`}>Logout</span> </li>

            </>
              
            }
            <li className="text-md mx-4 text-slate-900 font-normal items-center flex justify-between">
              <i className="fab fa-facebook mx-2 fa-md hover:text-blue-500 cursor-pointer"></i>
              <i className="fab fa-twitter mx-2 fa-md hover:text-blue-300 cursor-pointer"></i>
              <i className="fab fa-instagram mx-2 fa-md hover:text-blue-400 cursor-pointer"></i>
              <i className="fab fa-tiktok mx-2 fa-md hover:text-red-300 cursor-pointer"></i>
              <i className="fab fa-youtube mx-2 fa-md hover:text-red-500 cursor-pointer"></i>
            </li>
          </ul>
        </div>

        <div
          onClick={() => setShow(!show)}
          className="absolute top-[6px] right-[5%] px-4 py-2 border-2 rounded-lg flex justify-center items-center cursor-pointer md:hidden">
          <i className="text-2xl text-green-600 fa-solid fa-bars"></i>
        </div>
      </nav>
          </>
  );
}
