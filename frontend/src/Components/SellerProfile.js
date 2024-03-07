import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { authContext } from './context/AuthContext/AuthContext';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';
import { userChats } from './Chat/chatHelper';
import { API_URL_CHAT } from '../utils/apiURL';



const SellerProfile = () => {

    const {id} = useParams() ; 
    const {sellerProfile , getSellerProfile} = useContext(authContext); 

    const userAuthString = localStorage.getItem('userAuth');
    const userAuth = userAuthString ? JSON.parse(userAuthString) : null;
    const user = userAuth?.userFound._id ; 

    useEffect(() => {
        getSellerProfile(id);
    }, [id, getSellerProfile]);

    const createdAtAsDate = new Date(sellerProfile.createdAt);

// Extracting date and time from the createdAt property
    const createdAtDate = createdAtAsDate.toDateString();

    const createChat = async (senderId , receiverId) => {
      const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
      try {
         const chats = await userChats(user); 
         console.log(chats); 
         const exist = false ; 
         if(chats.data)
         {
          chats.data.map((chat)=>{
              chat.members.map((member)=>{
                if(member._id === sellerProfile._id)
                {
                  exist = true ; 
                }
              })
          })
         }
         if(exist===false)
         {
           const data = {
              senderId, 
              receiverId
           }
           const chatcreated = await axios.post(`${API_URL_CHAT}/`, data , config ); 
           console.log(chatcreated); 
         }

      } catch (error) {
        console.log(error); 
      }
    }
  
    return (
        <div>
            <Navbar/>
            <div class="profile-container mx-16 flex md:flex-row md:justify-start md:space-x-10 flex-col mt-32">
    
          <div class="image flex flex-col mt-4">
            <img src={sellerProfile.profilePicture} class="h-60 w-60 rounded-md mb-4"/>
            <h2 class="font-bold mb-4"> About me </h2>
            <p class="text-sm w-60 text-justify text-gray-500">
              {sellerProfile.bio}
            </p>
    
          </div>
    
          <div class="info mt-4">
            <div class="text-2xl tracking-widest bg-yellow-200 p-2 font-bold rounded-md px-4 w-32 hidden md:block"> HELLO </div>
            <h2 class="p-2 text-2xl "> I'm <span class="text-2xl font-semibold"> {sellerProfile.name} </span> </h2>
            <div>
              <hr/>
            </div>
            <div class="p-2 mb-1">
               <span class="font-bold "> Location </span>:  Mumbai
            </div>
            <div class="p-2 mb-1">
               <span class="font-bold "> Email </span>  :   {sellerProfile.email}
            </div>
            <div class="p-2 mb-1">
               <span class="font-bold "> Registered On </span> :  {createdAtDate}
            </div>
            <div class="p-2 mb-1">
               <span class="font-bold "> Mobile no </span> :  8779408499
            </div>
            <div class="mb-5
            ">
              <hr/>
            </div> 
            <button class=" mx-2 p-1.5 px-4 bg-pink-300 rounded-md text-lg font-bold tracking-wide">
              <Link to='/chat' onClick={()=> createChat(user , sellerProfile._id)} >
                   Chat
              </Link>
            </button>
            <Link to={`/rate/${sellerProfile._id}`}>
            <button class=" mx-2 p-1.5 px-4 bg-orange-300 rounded-md text-lg font-bold tracking-wide">
              Rate me
            </button>
            </Link>
            
    
          </div>
    
        </div>
    
        <h1 class="mx-16 text-2xl font my-4"> Latest Books </h1>
        <hr class="mx-16"/>
        
           
        {sellerProfile && sellerProfile.listings ? (
            <div className="flex flex-row mx-16 flex-wrap">
            {sellerProfile.listings.map((listing) => (
        
        <div key={listing.id} class="relative mr-5 mb-5 bg-white border border-gray-200 rounded-lg shadow">
             
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
              <h2  className='text-xl font-semibold mt-6 mb-6'> No Books Posted </h2>
            </div>
          )}
  <section class="">
  <div class="max-w-4xl mx-10 px-4">
    <h2 class="text-3xl font-normal text-gray-800 mb-6 ">Reviews</h2>
    <div class="space-y-6">
      
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex items-center mb-4">
          <img class="w-12 h-12 rounded-full mr-4" src="https://img.freepik.com/free-photo/smiling-young-male-professional-standing-with-arms-crossed-while-making-eye-contact-against-isolated-background_662251-838.jpg?w=740&t=st=1709828290~exp=1709828890~hmac=6d84a4d2dab474d4ec56617d72ea8af34dc2df1729fb384562416f765fe52eee" alt="Reviewer Image"/>
          <div>
            <p class="text-gray-800 font-bold">Akshay Rawat</p>
            <p class="text-gray-500 text-sm">2 days ago</p>
          </div>
        </div>
        <div class="flex items-center mb-4">
          <div class="flex items-center mr-2">
            <svg class="text-yellow-400 h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          </div>
          <span class="text-gray-600 font-bold">4/5</span>
        </div>
        <p class="text-gray-700 text-sm">I stumbled upon this book seller by chance, and I'm so glad I did! The wide selection of titles, both new and used, is truly impressive. I've found some rare gems that were difficult to find elsewhere. The books arrived promptly and in pristine condition. I highly recommend this seller to any book lover seeking a fantastic reading experience!</p>
      </div>
      

      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex items-center mb-4">
          <img class="w-12 h-12 rounded-full mr-4" src="https://img.freepik.com/free-photo/smiling-confident-businesswoman-posing-with-arms-folded_1262-20950.jpg?t=st=1709828596~exp=1709832196~hmac=963a5cdcebf5cfa4a4a77215d3cd861eb33a937f909f331bbb237a6a237584a9&w=826" alt="Reviewer Image"/>
          <div>
            <p class="text-gray-800 font-bold">Akansha Tripathi</p>
            <p class="text-gray-500 text-sm">2 days ago</p>
          </div>
        </div>
        <div class="flex items-center mb-4">
          <div class="flex items-center mr-2">
            <svg class="text-yellow-400 h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          </div>
          <span class="text-gray-600 font-bold">4/5</span>
        </div>
        <p class="text-gray-700 text-sm">As an avid reader, I've purchased books from numerous sellers, but this one stands out for their exceptional service. The seller's attention to detail and care in packaging is remarkable. The books arrive as if they were just printed, even when purchasing used copies. The prices are also very reasonable, making it easy to indulge in my book-buying habit. I can't recommend this seller enough!</p>
      </div>

    </div>
  </div>
</section>
            <Footer/>
        </div>
      )
}

export default SellerProfile ; 

