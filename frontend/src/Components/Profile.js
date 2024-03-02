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
        <div class="profile-container mx-16 flex md:flex-row justify-start md:space-x-10 flex-col ">

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
        <h2 class="font-bold mb-4"> About me </h2>
        <p class="text-sm w-60 text-justify text-gray-500">
          {userProfile.bio}
        </p>

      </div>

      <div class="info mt-4">
        <div class="text-2xl tracking-widest bg-yellow-200 p-2 font-bold rounded-md px-4 
        w-32 md:block hidden"> HELLO </div>
        <h2 class="p-2 text-2xl "> I'm <span class="text-2xl font-semibold"> {userProfile.name} </span> </h2>
        <div>
          <hr/>
        </div>
        <div class="p-2 mb-1">
           <span class="font-bold "> Location </span>:  Mumbai
        </div>
        <div class="p-2 mb-1">
           <span class="font-bold "> Email </span>  :   {userProfile.email}
        </div>
        <div class="p-2 mb-1">
           <span class="font-bold "> Registered On </span> :  {createdAtDate}
        </div>
        <div class="p-2 mb-1">
           <span class="font-bold "> Mobile no </span> :  9833924584
        </div>
        <div class="mb-5
        ">    
    <div class="flex items-center my-4">
    <svg class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
</div>
          <hr/>
        </div> 

        <Link to={"/update-user-profile"}>
        <button class=" mx-2 p-1.5 px-4 bg-pink-300 rounded-md text-lg font-bold tracking-wide">
          Edit
        </button>
        </Link>
        
      </div>

    </div>

    <h1 class="mx-16 text-2xl font my-4"> Latest Books </h1>
    <hr class="mx-16"/>
    
       
    {userProfile &&  userProfile.listings ? (
        <div className="flex flex-row mx-16 flex-wrap">
          {userProfile.listings.map((listing) => (
             <div class="relative flex flex-col mb-4 md:mx-2">
             {listing.images && listing.images.length > 0 ? (
            <img
        class="m-2 w-60 h-44 rounded-2xl"
        src={listing.images[0]}
        alt={listing.title}
      />
    ) : (
      <Link to={`/upload-book-images/${listing._id}`}>
          <button className="m-2 w-60 h-44 rounded-2xl border-dashed border-2 flex items-center justify-center">
              Upload Image
          </button>
      </Link>
    )}
             <h3 class="text-sm font-bold mt-2 ml-2">{listing.title}</h3>
             <h3 class="text-sm font-bold ml-2 mt-1">${listing.price}</h3>
             <Link to={`/delete-book/${listing._id}`} >
             <button className="border-2 w-60 mt-2 rounded-lg p-2 bg-gray-200 ml-2 text-sm font-bold">
                  View Book
             </button>
             
             </Link>
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
    {userProfile &&  userProfile.wishlist ? (
        <div className="flex flex-row mx-16 flex-wrap">
          {userProfile.wishlist.map((listing) => (
             <div class="relative flex flex-col mb-4 md:mx-2">
             <img class="m-2 w-60 h-44 rounded-2xl"
              src={listing.images[0]}
              alt={listing.title}
      />
             <h3 class="text-sm font-bold mt-2 ml-2">{listing.title}</h3>
             <h3 class="text-sm font-bold ml-2 mt-1">${listing.price}</h3>
             <button class="border-2 w-60 mt-2 rounded-lg p-2 bg-gray-200 ml-2 text-sm font-bold">
                View Book
             </button>

             </div>
))}
        </div>
      ) : (
        <div>
          <h2  className='text-xl font-semibold mt-6 mb-6'> No Books Wishlisted </h2>
        </div>
      )}
    </div>
    <div class="">
  <div class="mx-16 my-2 text-xl">
    Reviews
  </div>
  <hr class="mx-16"/>
  {userProfile && userProfile.review ? (
    <div class="mx-16 flex flex-col max-h-96 overflow-auto">
    { userProfile.review.map((review)=> (
        
        <div class="bg-white my-4 mx-4 rounded-md shadow-md flex flex-col space-y-1 max-w-96">
        <div class="flex flex-row space-x-4 mx-2">
          <img class="w-8 h-8 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src="https://thumbs.dreamstime.com/b/man-2488211.jpg" alt="Bordered avatar"></img>
          <h2 class="text-lg font-semibold">
            Aryan Singh 
          </h2>
  
        </div>
        <hr/>
        <div>
         <p class="text-sm mx-2 text-justify "> {review.reviewText}
         </p>
        </div>
      </div>

    ))

    }
  </div>
  ) : (<> No Reviews Posted </>)}
  </div>
        <Footer/>
    </div>
  )
}

export default Profile ; 