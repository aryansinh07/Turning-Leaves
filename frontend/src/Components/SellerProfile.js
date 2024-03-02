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
            <div class="profile-container mx-16 flex md:flex-row md:justify-start md:space-x-10 flex-col">
    
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
            <div className="flex flex-row justify-between mx-16 flex-wrap">
              {sellerProfile.listings.map((listing) => (
                 <div class="relative flex flex-col mb-4">
                 
                <img
            class="m-2 w-60 h-44 rounded-2xl"
            src={listing.images[0]}
            alt={listing.title}
          />
       
                 <h3 class="text-sm font-bold mt-2 ml-2">{listing.title}</h3>
                 <h3 class="text-sm font-bold ml-2 mt-1">${listing.price}</h3>

                 <Link to={`/book-details/${listing._id}`} >
                    <button className="border-2 w-60 mt-2 rounded-lg p-2 bg-gray-200 ml-2 text-sm font-bold">
                        Buy now
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
            <Footer/>
        </div>
      )
}

export default SellerProfile ; 

