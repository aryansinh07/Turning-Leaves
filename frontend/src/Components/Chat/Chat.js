import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import ChatBox from './ChatBox';
import { userChats } from './chatHelper';
import { io } from "socket.io-client";

const Chat = () => {
  const userAuthString = localStorage.getItem('userAuth');
  const userAuth = userAuthString ? JSON.parse(userAuthString) : null;
  const user = userAuth?.userFound;
  //console.log(user._id); 

  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [socket, setSocket] = useState(null); 

  useEffect(() => {
		setSocket(io('http://localhost:8800')); 
	}, []); 


  useEffect(() => {
    // Emit new user to server

    socket?.emit("new-user-add", user._id);
    if(socket)
    {
      console.log(socket) ; 
    }
    

    // Listen for get-users event from server
    socket?.on("get-users", (users) => {
      setOnlineUsers(users);
    });

    // Cleanup socket connection on component unmoun
  }, [socket]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        if (user) {
          const chatsData = await userChats(user._id);
          setChats(chatsData.data);
          console.log(chatsData.data); 
           
        }
      } catch (error) {
        console.log('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket?.emit("send-message", sendMessage);
    }
  }, [sendMessage, socket]);

  // Get the message from socket server
  useEffect(() => {
    socket?.on("receive-message", (data) => {
      console.log("Message aa rha h " , data);
      setReceivedMessage(data);
    });
  }, [socket]);

  

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member._id !== user._id)._id;
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? 'Online' : 'Offline';
  };

  return (
    <div>
      <Navbar />
      <div className="flex md:flex-row flex-col mt-32 max-w-7xl mx-auto">
        <div className="mr-4 md:w-[20%] w-[80%] flex-grow bg-white p-4 md:ml-16 ml-10">
          {/* Title */}
          <h1 className="mb-4 text-2xl font-semibold">Chats</h1>
          {/* User List*/}
          <hr />
          <div className="mb-4">
            {chats ? (<>
              {chats.map(chat => (
              <div key={chat._id} className="flex items-center m-2 bg-yellow-100 p-4 rounded-md" onClick={() => setCurrentChat(chat)}>
                
                <img src={chat.members.filter(member => member._id !== user._id)[0].profilePicture?   chat.members.filter(member => member._id !== user._id)[0].profilePicture  : 'https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=626&ext=jpg&ga=GA1.1.104308764.1701955462&semt=ais'} alt="User" className="w-10 h-10 rounded-full mr-2" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{chat.members.filter(member => member._id !== user._id)[0].name}</span>
                  <span className="text-sm font-light">{checkOnlineStatus(chat)}</span>
                </div>
              </div>
              ))}
            </>):
            (<>
              
              <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
            </div>

            </>)
            }
            
          </div>
        </div>

        <div className="border-r"></div>

        <ChatBox chat={currentChat} currentUser={user._id} setSendMessage={setSendMessage} receivedMessage={receivedMessage} />
      </div>
      <Footer />
    </div>
  );
};

export default Chat;
