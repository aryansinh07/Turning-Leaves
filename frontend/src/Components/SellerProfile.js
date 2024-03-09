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
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="relative">
          <div
            className="h-64 bg-cover bg-center rounded-t-lg"
            style={{ backgroundImage: 'url("https://img.freepik.com/free-photo/html-system-website-concept_23-2150376770.jpg?t=st=1709960871~exp=1709964471~hmac=dbbad2408a680bf150d3a99475bcbced56fcf75fa491e50fef9253c7619ce610&w=996")' }}
          ></div>
          
          <img
            src={sellerProfile.profilePicture || 'profile-picture.jpg'}
            alt="Profile Picture"
            className="w-32 h-32 rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 border-4 border-white"
          />
          
          
        </div>
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold">{sellerProfile.name}</h2>
          <p className="text-gray-600">{sellerProfile.bio}</p>
        </div>

        
        <div class="mt-8 overflow-hidden  rounded-lg border border-blue-300   shadow">
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
                    {sellerProfile.name}
                </dd>
            </div>
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-orange-100">
                <dt class="text-sm font-medium text-gray-500">
                    Email address
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {sellerProfile.email}
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
    </div>
    <button class=" mt-2 p-1.5 px-8 mr-3  bg-pink-300 rounded-md text-lg font-bold tracking-wide">
              <Link to='/chat' onClick={()=> createChat(user , sellerProfile._id)} >
                   Chat
              </Link>
            </button>
            <Link to={`/rate/${sellerProfile._id}`}>
            <button class=" mt-2 p-1.5 px-8 bg-orange-300 rounded-md text-lg font-bold tracking-wide">
              Rate me
            </button>
            </Link>
        
      </div>
    
        <h1 class="mx-auto text-3xl font-varela my-8 text-center "> Latest Books </h1>
        
        
           
        {sellerProfile && sellerProfile.listings ? (
            <div className=" max-w-5xl flex flex-row mx-auto flex-wrap px-4 ">
            {sellerProfile.listings.map((listing) => (
        
        <div key={listing.id} class="relative mx-4 mb-5 bg-white border border-gray-200 rounded-lg shadow ease-in-out transform hover:scale-105 duration-300">
             
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
  <div class="max-w-5xl mx-auto px-4">
  <h1 class="mx-auto text-3xl font-varela my-8 text-center tracking-wide "> Reviews </h1>
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

