import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { useContext} from 'react'
import {bookContext} from './context/bookContext/bookContext'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL_BOOK } from '../utils/apiURL'

const BuyBooks = () => {

  const { fetchAllBook , book } = useContext(bookContext);
  const userAuthString = localStorage.getItem('userAuth');
  const userAuth = userAuthString ? JSON.parse(userAuthString) : null;
  fetchAllBook() ; 
 

  const addWishlist = async (id,name) => {

    try {
      const config = {
        headers: {
          Authorization: userAuth ? `Bearer ${userAuth.token}` : null,
          "Content-Type": "application/json",
        },
      };
  
      const data = {
        userId: userAuth.userFound._id, // Assuming userFound contains user details
      };
  
      const response = await axios.post(`${API_URL_BOOK}/addwishlist/${id}`, data, config);
  
      if (response.data.status === 'success') {
        window.alert(`The book ${name} has been added to your wishlist successfully`); 
        //window.location.href = "/profile";
      } else {
        console.error('Failed to wishlist the book');
      }
    
    } catch (error) {
      console.error('Error:',error); 
    }}; 
  

  return (
    <div>
        <Navbar/>
        <h2 class="mx-16  text-2xl font-light mb-4"> Books Categories </h2>
    <hr class="mx-16 my-4" />
    <h1 class="mx-16 text-2xl font-light my-4"> Latest Books </h1>
    {book && book.length > 0 ? (
  <div className="flex flex-row mx-16 flex-wrap">
    {book.map((listing) => (

      <div key={listing.id} class="relative mr-5 mb-5 bg-white border border-gray-200 rounded-lg shadow">
     
     {listing.images && listing.images.length > 0 ? (
  <div>
         <img class=" w-72 h-72  " src={listing.images[0]} alt="product image" />
         <button onClick={() => addWishlist(listing._id,listing.title)}>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="absolute top-4 left-4 w-8 h-8" id={listing._id}>
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
</svg>
</button> 
      </div>
) : (
  <div>

    {userAuth && userAuth.userFound?._id === listing.seller.toString() ? (
      <Link to={`/upload-book-images/${listing._id}`}>
          <button className="w-72 h-72 ">
              Upload Image
          </button>
      </Link>
    ) : (
      <p className="">
        No Image Upload 
      </p>
    )}
  </div>
)}
 
     <div class="px-5 pb-5">
         
         <h5 class="text-xl font-semibold tracking-tight text-gray-900 "> {listing.title} </h5>
 
         <div class="flex items-center justify-between my-2">
             <span class="text-3xl font-bold text-gray-900"> {listing.price} </span>
             <Link to={`/book-details/${listing._id}`} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Buy Now</Link>
         </div>
     </div>
 </div>
 
    
    ))}
    </div>
) : (
  <div>
    <h2 className="text-xl font-semibold mt-6 mb-6">No Books Posted</h2>
  </div>
)}

    <div class=" flex justify-center">
      <button class="border-2 my-8 rounded-lg px-5 py-2 bg-black text-white  text-sm font-bold"> View More </button> 
    </div>
        <Footer/>
    </div>
  )
}

export default BuyBooks