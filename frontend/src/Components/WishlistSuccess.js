import React from 'react'
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import img from "../assets/wishlist success.png"

const WishlistSuccess = () => {

    const location = useLocation() ; 
    const {name} = location.state;

  return (
    <div>
      <Navbar/>
        <div class="min-h-screen flex items-center justify-center">
  <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
    <div class="text-center">
      <img src={img} alt="Success" class="mx-auto mb-4 md:h-48"/>
      <svg class="mx-auto mb-4 w-16 h-16 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h1 class="text-2xl font-bold text-gray-800 mb-4 font-varela">Book Added to Wishlist</h1>
      <p class="text-gray-600 mb-8">{name} has been added to wishlist successfully </p>
      <a href="/buy" class="block md:inline-block w-full md:w-auto">
        <button class="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Continue</button>
      </a>
    </div>
  </div>
</div>
<Footer/>
    </div>
  )
}

export default WishlistSuccess