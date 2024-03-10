import React, { useContext , useEffect } from 'react'
import {  Link, useParams } from 'react-router-dom';
import { bookContext } from './context/bookContext/bookContext';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Navbar from './Navbar';
import Footer from './Footer';
import { API_URL_BOOK } from '../utils/apiURL';
import axios from 'axios';



const DeleteBook = () => {
    const { id } = useParams();
    const { book, getBookDetailsAction } = useContext(bookContext);

    const userAuthString = localStorage.getItem('userAuth');
    const userAuth = userAuthString ? JSON.parse(userAuthString) : null;
   


    useEffect(() => {
        getBookDetailsAction(id);
      }, [id, getBookDetailsAction]);

      const handleDelete = async () => {
        try {
          const config = {
            headers: {
              Authorization: userAuth ? `Bearer ${userAuth.token}` : null,
              "Content-Type": "application/json",
            },
          };
          const response = await axios.delete(`${API_URL_BOOK}/${id}`, config);
          if (response.data.status === 'success' ) {
            window.location.href = "/" ; 
          } else {
            console.error('Failed to delete the book');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
    

    
  return (
    <div>
      <Navbar />
      <div>
        {book ? (
          <>
            <div className="book-container max-w-5xl mt-32 mx-auto  mb-16 flex md:flex-row md:justify-start md:space-x-8 flex-col">
              <Carousel showArrows={true} showThumbs={false} className="md:w-1/2 w-[70%]">
                {book.images &&
                  book.images.map((image, index) => (
                    <div key={index} className="relative w-full h-96">
                      <img
                        src={image}
                        alt={`Book Image ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ))}
              </Carousel>
              <div class="flex flex-col space-y-2 mr-8 md:mr-0">
                <h2 class="text-yellow-400 text-3xl tracking-widest font-semibold">
                  {' '}
                  {book.title}
                </h2>
                <h3 class="text-red-500 text-xl tracking-widest font-semibold">
                  ${book.price}
                </h3>
                <h3 class=" text-xl"> {book.author} </h3>
                <h3 class=" text-xl"> Condition: {book.condition} </h3>
                <hr />
                <p class="text-justify text-lg">{book.description}</p>
                <hr />
                <div className='flex flex-row space-x-2'>

                
                <button class="bg-red-500 w-32 py-1.5 rounded-lg font-semibold" onClick={handleDelete}>
                  Delete
                </button>
                <Link to={`/edit-book/${book.id}`}>
                <button class="bg-green-500 w-32 py-1.5 rounded-lg font-semibold hover:bg-green-400 ease-in-out transform hover:scale-105 duration-150" >
                  Edit
                </button>

                </Link>
                

                
                
  
                </div>
                
              </div>
            </div>
          </>
        ) : (
            <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        )}
      </div>
      <Footer/>
      </div>
  )
}

export default DeleteBook ; 