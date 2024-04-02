import React, { useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { bookContext } from './context/bookContext/bookContext';
import Navbar from './Navbar';
import Footer from './Footer';
import { authContext } from './context/AuthContext/AuthContext';


// ... (import statements)

const BookDetails = () => {
  const { id } = useParams();
  const { book, getBookDetailsAction } = useContext(bookContext);
  const { userBooks , getBooksByUser } = useContext(authContext);

  useEffect(() => {
    getBookDetailsAction(id);
  }, [id, getBookDetailsAction]);
  
  useEffect(() => {
    // Ensure that book is available and has a seller (userId)
    if (book && book.seller) {
      // Call getBooksByUser and update the state
      getBooksByUser(book.seller);
    }
  }, [book, getBooksByUser]);



  return (
    <div>
      <Navbar />
      <div>
        {book ? (
          <>
            <div className="book-container mt-32 ml-16 mr-4 mb-16 flex md:flex-row md:justify-start md:space-x-10 flex-col md:mx-auto max-w-5xl">
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

                <Link>
                <button class="bg-yellow-300 w-32 py-1.5 rounded-lg font-semibold">
                  Buy Now
                </button>
                </Link>
                
                <Link to={`/seller-profile/${book.seller}`}>
                <button class="bg-pink-300 w-32 py-1.5 rounded-lg font-semibold">
                  Seller
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
      <h1 class="md:mx-auto mx-16 text-3xl text-center my-8 font-varela"> More Books by the User </h1>
      { userBooks ? 
    (
      <div className="flex flex-row mx-16 flex-wrap md:max-w-5xl md:mx-auto ">
      {userBooks.map((listing) => (
  
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
   
   <div className="px-5 pb-5 mt-2">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900">
            {listing.title}
          </h5>
          <div className="flex items-center justify-between my-2">
            <span className="text-3xl font-bold text-gray-900">
              {listing.price}
            </span>
            <Link
              to={`/book-details/${listing._id}`}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Buy Now
            </Link>
          </div>
        </div>
   </div>
   
      
      ))}
      </div>
      ) : (
        <div>
          <h2  className='text-xl font-semibold mt-6 mb-6 text-center'> No More Books Posted By User </h2>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default BookDetails;