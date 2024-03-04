import React from 'react'
import {Link} from "react-router-dom"
import { useContext , useEffect } from 'react'
import { authContext } from './context/AuthContext/AuthContext'
 

const Navbar = () => {
  
  const userAuthString = localStorage.getItem('userAuth');
  const userAuth = userAuthString ? JSON.parse(userAuthString) : null; // Parse the string to an object

  const { logoutUserAction } = useContext(authContext);

  const logoutFunc = () => {
    logoutUserAction(); 
  }

  if(userAuth)
  { 
    return (
      <div>
  <div className="navbar mx-16 my-2 flex md:flex-row md:justify-between md:items-center flex-col">
    <div className="md:text-3xl text-xl ">
      Turning Leaves
    </div>

    <div className="my-3 flex flex-row space-x-5 font-thin items-center  md:text-xl md:space-x-10">
      <Link to='/' className="hover:border-[2px] hover:border-black hover:px-4 py-2 hover:rounded-full border-transparent border-2 transition-all duration-500"> Home </Link>
      <Link to='/buy' className="hover:border-[2px] hover:border-black hover:px-4 py-2 hover:rounded-full border-transparent border-2 transition-all duration-500"> Buy </Link>
      <Link to='/sell' className="hover:border-[2px] hover:border-black hover:px-4 py-2 hover:rounded-full border-transparent border-2 transition-all duration-500"> Sell</Link>
      <Link onClick={logoutFunc} className="hover:border-[2px] hover:border-black hover:px-4 py-2 hover:rounded-full border-transparent border-2 transition-all duration-500"> Logout </Link>
      <Link to="/profile" className="hidden md:block">
        <img className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src={userAuth.userFound.profilePicture} alt="Bordered avatar" />
      </Link>
      <Link to='/profile' className="hover:text-blue-500 hover:cursor-pointer md:hidden"> Profile </Link>
    </div>
  </div>
</div>

    )
  }
  
  else
  {
    return (
      <div>
  <div className="navbar mx-16 my-2 flex md:flex-row md:justify-between md:items-center flex-col">
    <div className="md:text-3xl text-xl ">
      Turning Leaves
    </div>

    <div className="my-3 flex flex-row space-x-5 font-thin items-center  md:text-xl md:space-x-10">
      <Link to='/login' className="hover:border-[2px] hover:border-black hover:px-4 py-2 hover:rounded-full border-transparent border-2 transition-all duration-500"> Login </Link>
      <Link to='/sign-up' className="hover:border-[2px] hover:border-black hover:px-4 py-2 hover:rounded-full border-transparent border-2 transition-all duration-500"> Sign Up </Link>
    </div>
  </div>
</div>
    )
  }
  
}

export default Navbar ; 

