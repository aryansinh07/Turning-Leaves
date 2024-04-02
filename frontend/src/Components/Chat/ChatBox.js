import React, { useContext, useEffect, useState } from 'react';
import { getMessages , addMessages } from './chatHelper';
import { format } from "timeago.js";
import { useRef } from "react";
import InputEmoji from 'react-input-emoji' ; 
import { authContext } from '../context/AuthContext/AuthContext';
const emailjs = require("@emailjs/browser"); 

const ChatBox = ({ chat, currentUser , setSendMessage,  receivedMessage  }) => {
  const otherUser = chat?.members.find(member => member._id !== currentUser);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const {userProfile , getUserProfile} = useContext(authContext); 

  const userAuthString = localStorage.getItem('userAuth');
  const userAuth = userAuthString ? JSON.parse(userAuthString) : null;
  
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messagesData = await getMessages(chat._id);
        setMessages(messagesData.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    if (chat !== null) {
      fetchMessages();
    }
  }, [chat,messages]);

  useEffect(()=> {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  },[messages])

 //Handle Change
  const handleChange = (newMessage)=> {
    setNewMessage(newMessage); 
  }


  // Send Message
  const handleSend = async(e)=> {
    e.preventDefault()
    const message = {
      senderId : currentUser,
      text: newMessage,
      chatId: chat._id,
  }

  const receiverId = chat.members.find((member)=>member._id!==currentUser)._id;

  
  //send message to socket server
  setSendMessage({message, receiverId}); 
  
  // send message to database
  try {
    const { data } = await addMessages(message);
    console.log(data); 
    setMessages([...messages, data]);
    setNewMessage("");
  }
  catch
  {
    console.log("error")
  }
  
  sendNotification(receiverId) ; 
}

const sendNotification = async (receiverId) => {

  try {
     
    await getUserProfile(receiverId); 
    if(userProfile)
    {
      
      const serviceId = "service_2uoe68m" ; 
      const templateId = "template_0e8ode9" ; 
      const publicKey = "vGwDmMB7XybMR10h6" ; 
      const templateparams = {
                to_name : userProfile.name , 
                from_name : userAuth.userFound.name, 
                to_email : userProfile.email  
            }
        
            emailjs
            .send(serviceId, templateId, templateparams, publicKey)
            .then((promise) => {
              // console.log(promise);
            })
            .catch((error) => {
              console.log(error);
            }); 
    }
    
  } catch (error) {
    console.log(error); 
  }
}

  
useEffect(()=> {
  console.log("Message Arrived: ", receivedMessage)
  if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
    setMessages([...messages, receivedMessage]);
  }

},[receivedMessage])


  const scroll = useRef();
  //const imageRef = useRef();

  return (
   <>
    {/* User information section */}

    {otherUser ? (
    <div class="container mx-10 my-2 md:w-[75%] w-[80%] pr-4">
    <div class="mb-4 flex items-center justify-between">
      <div class="flex items-center">
        <img src={otherUser.profilePicture ? otherUser.profilePicture : 'https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=626&ext=jpg&ga=GA1.1.104308764.1701955462&semt=ais'} alt="User Profile" class="mr-4 h-10 w-10 rounded-full" />
        <h1 class="text-2xl font-semibold">{otherUser.name}</h1>
      </div>
    </div>
    {/* Horizontal rule */}
    <hr class="mb-4" />
    
    {/* Message Section */}
    <div class="md:max-h-72   md:min-h-72  min-h-96 max-h-[28rem] overflow-y-auto">
      
      <div class="flex flex-col space-y-4">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          messages.length > 0 ? (
            messages.map((message, index) => (
              <div key={index} className = {message.senderId === currentUser ? "flex items-end justify-end" : "flex items-start justify-start"}>
                <div key={index} className = {message.senderId === currentUser ? "rounded-lg bg-gradient-to-l from-blue-500 to-blue-300 p-3 text-white mr-2 max-w-72" : "rounded-lg bg-gradient-to-r from-orange-300 to-orange-500 p-3 ml-2 max-w-72"}>
                  <p class="text-sm">{message.text}</p>
                  <span class="text-sm font-light"> {format(message.createdAt)}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center"></div>
          )
        )}

      </div>
    </div>
    
    {/* Typing Section */}
    <div class="mt-8 flex items-center">
    <InputEmoji value={newMessage} onChange={handleChange} />
      <button class="rounded-r-lg bg-blue-500 px-4 py-2 text-white" onClick = {handleSend}> Send</button>
    </div>

    </div>
    ) : (
      <div className='container mx-10 my-2 w-[75%] pr-4 text-xl font-semibold text-center flex justify-center items-center  min-h-[27rem] '>
         <div>
          Tap on a Chat to load Conversations
         </div>
       </div>
    ) }
    

    
    
   </>
  );
};

export default ChatBox;
