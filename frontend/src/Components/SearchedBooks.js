import {React, useContext, useState} from 'react'
import { Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { bookContext } from './context/bookContext/bookContext';
import { API_URL_BOOK } from '../utils/apiURL';
import axios from 'axios';

const SearchedBooks = () => {
const location = useLocation();

    // Extract the booksFound property from the state
const { booksFound } = location.state;
  
    // Use booksFound in your component
console.log(booksFound);

const { searchBookAction } = useContext(bookContext); 
const [formData , setBookName] = useState({
    bookName:""
  })
  
  const {bookName} = formData ; 

  const onChangeInput = (e) => {
    setBookName({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault() ; 
    searchBookAction(formData); 
  }
  const userAuthString = localStorage.getItem('userAuth');
  const userAuth = userAuthString ? JSON.parse(userAuthString) : null;

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

  <div class="mx-4  mt-40 mb-4 flex flex-col-reverse md:flex-row-reverse justify-center items-center md:mt-32 ">
  <div class="font-varela flex flex-col items-center text-center md:text-left md:items-start text-3xl md:text-5xl font-bold tracking-wide typing-animation">
    Discover the perfect <br />
    book for you !
  </div>
  <div class="h-36 md:h-48 w-48 md:w-60 mb-4 md:mb-0">
    <img src="https://img.freepik.com/free-vector/telecommuting-illustration_23-2148485189.jpg?w=740&t=st=1701956903~exp=1701957503~hmac=fc09d9f45628fdd63d74cf9c39d59dba674c013e64a4792b6613c22038de00d2" class="object-contain h-full w-full" />
  </div>
  </div>

    <div >
      <form onSubmit={onSubmitHandler} class="mx-16 my-8 flex flex-row items-center justify-center">
        <input onChange={onChangeInput} class="my-5 rounded-lg bg-gray-100 md:p-2 md:px-28 p-1 text-center font-mono" type="text" name="bookName" placeholder="Search for Books" value={bookName} />
        <button class="rounded-lg border-2 bg-black p-[0.3rem] md:px-6 px-3 md:p-2 text-sm font-medium text-white" type='submit'>Search</button>
      </form>
    </div>

   
    <h1 class="mx-auto text-2xl font-varela my-4 text-center"> Search Result: </h1>
    
    {booksFound && booksFound.length > 0 ? (
  <div className="max-w-5xl flex flex-row mx-auto flex-wrap px-4">
    {booksFound.map((listing) => (
      <div
        key={listing.id}
        className="relative mb-5 bg-white border border-gray-200 rounded-lg shadow mx-4"
      >
        {listing.images && listing.images.length > 0 ? (
          <div>
            <img
              className="w-72 h-72"
              src={listing.images[0]}
              alt="product image"
            />
            <button onClick={() => addWishlist(listing._id, listing.title)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="absolute top-4 left-4 w-8 h-8"
                id={listing._id}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button>
          </div>
        ) : (
          <div>
            {userAuth && userAuth.userFound?._id === listing.seller.toString() ? (
              <Link to={`/upload-book-images/${listing._id}`}>
                <button className="w-72 h-72">Upload Image</button>
              </Link>
            ) : (
              <p className="">No Image Upload</p>
            )}
          </div>
        )}
        <div className="px-5 pb-5">
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
    <h2 className="text-xl font-semibold mt-6 mb-6">No Books Found</h2>
  </div>
)}
    <Footer/>
    </div>
  )
}

export default SearchedBooks ; 