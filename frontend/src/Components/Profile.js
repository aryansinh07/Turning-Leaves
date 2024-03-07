import React, { useContext, useEffect, useState} from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { authContext } from './context/AuthContext/AuthContext';
import axios from 'axios';
import { API_URL_USER } from '../utils/apiURL';


const Profile = () => {
 
    const userAuthString = localStorage.getItem('userAuth');
    const userAuth = userAuthString ? JSON.parse(userAuthString) : null;
    const createdAtAsDate = new Date(userAuth.userFound.createdAt);
    const createdAtDate = createdAtAsDate.toDateString();

    const {userProfile , getUserProfile } = useContext(authContext); 
    
    const userId = userAuth.userFound._id ; 

    useEffect(()=>{
    getUserProfile(userId); 
    },[userId,getUserProfile]); 
    

    const returnReviewerData = async (id) => {
      const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
      try {
        const ReviewerData = await axios.get(`${API_URL_USER}/${id}`, config); 
        return ReviewerData.data.data.name ; 
      } catch (error) {
        console.log(error); 
      }

    }

  return (
    <div>
        <Navbar/>
        <div class="profile-container mt-32 mx-16 flex md:flex-row justify-start md:space-x-10 flex-col ">

      <div class="image flex flex-col mt-4">
        {userProfile.profilePicture ? (
          <img src={userProfile.profilePicture} class="h-60 w-60 rounded-md mb-4"/>
        ):(
          <div class="">
            <Link to={"/upload-profile-picture"}>
              <button class="m-2 w-60 h-44 rounded-2xl border-dashed border-2 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
              </svg>
              </button>
            </Link>
          </div>
        )}
        <h2 class="font-varela text-3xl mb-4"> About me </h2>
        <p class="text-lg font-medium w-60 text-justify text-gray-800">
          {userProfile.bio}
        </p>

      </div>

      <div class="flex justify-center mt-4">
  <div class=" overflow-hidden  rounded-lg border border-blue-300 ease-in-out transform hover:scale-105 duration-300  shadow">
    <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
            User Profile
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
            This is some information about the user.
        </p>
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:p-0 ">
        <dl class="sm:divide-y sm:divide-gray-200">
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-lime-100 ">
                <dt class="text-sm font-medium text-gray-500 ">
                    Full name
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userProfile.name}
                </dd>
            </div>
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-orange-100">
                <dt class="text-sm font-medium text-gray-500">
                    Email address
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userProfile.email}
                </dd>
            </div>
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-green-100">
                <dt class="text-sm font-medium text-gray-500">
                    Phone number
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    (123) 456-7890
                </dd>
            </div>
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-purple-100">
                <dt class="text-sm font-medium text-gray-500">
                    Address
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    123 Main St<br/>
                     Anytown, USA 12345
                </dd>
            </div>

            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6  bg-indigo-200">
                <dt class="text-sm font-medium text-gray-500">
                    Registered On
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {createdAtDate}
                </dd>
            </div>
          

        </dl>
    </div>
    <Link to={"/update-user-profile"}>
            <button class="ease-in-out transform hover:scale-105 duration-300 mx-3 my-3 p-1.5 px-8 bg-pink-300 rounded-md text-lg font-bold tracking-wide hover:bg-pink-400 ">
             Edit
            </button>
            </Link>
</div>
</div>

    </div>

    <h1 class="mx-16 text-2xl font my-4"> Latest Books </h1>
    <hr class="mx-16"/>
    
       
    {userProfile &&  userProfile.listings ? (
       
       <div className="flex flex-row mx-16 flex-wrap">
       {userProfile.listings.map((listing) => (
   
         <div key={listing.id} class="relative mr-5 mb-5 bg-white border border-gray-200 rounded-lg shadow ease-in-out transform hover:scale-105 duration-300">
        
        {listing.images && listing.images.length > 0 ? (
     <div>
            <img class=" w-72 h-72  " src={listing.images[0]} alt="product image" />
            
         </div>
   ) : (

     <div>
         <Link to={`/upload-book-images/${listing._id}`}>
             <button className="w-72 h-72 ">
                 Upload Image
             </button>
         </Link>
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
          <h2  className='text-xl font-semibold mt-6 mb-6'> No Books Posted </h2>
        </div>
      )}

    <h1 class="mx-16 text-2xl font my-4"> Wishlists </h1>
    <hr class="mx-16"/>
    <div class=""> 
    {userProfile &&  userProfile.wishlist ? 
    (
      <div className="flex flex-row mx-16 flex-wrap">
      {userProfile.wishlist.map((listing) => (
  
        <div key={listing.id} class="relative mr-5 mb-5 bg-white border border-gray-200 rounded-lg shadow ease-in-out transform hover:scale-105 duration-300">
       
       {listing.images && listing.images.length > 0 ? (
    <div>
           <img class=" w-72 h-72  " src={listing.images[0]} alt="product image" />
           
        </div>
  ) : (

    <div>
        <h2>No Image</h2>
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
          <h2  className='text-xl font-semibold mt-6 mb-6'> No Books Wishlisted </h2>
        </div>
      )}
    </div>
        <Footer/>
    </div>
  )
}

export default Profile ; 