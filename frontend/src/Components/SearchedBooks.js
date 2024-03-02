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

  const addWishlist = async (id) => {
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
        window.location.href = "/profile";
      } else {
        console.error('Failed to wishlist the book');
      }
    } catch (error) {
      console.error('Error:',error); 
    }}; 
   
  return (
    <div>
    <Navbar/>

    <div class="mx-16 my-16 flex md:flex-row-reverse justify-center flex-col">
      <div class="flex flex-row items-end justify-center text-center md:text-4xl font-bold tracking-wide text-xl">
        Discover the perfect <br />
        book for you
      </div>
      <div class="h-28 w-48 md:h-32 md:w-52">
        <img src="https://img.freepik.com/free-vector/telecommuting-illustration_23-2148485189.jpg?w=740&t=st=1701956903~exp=1701957503~hmac=fc09d9f45628fdd63d74cf9c39d59dba674c013e64a4792b6613c22038de00d2" />
      </div>
    </div>

    <div >
      <form onSubmit={onSubmitHandler} class="mx-16 my-8 flex flex-row items-center justify-center">
        <input onChange={onChangeInput} class="my-5 rounded-lg bg-gray-100 md:p-2 md:px-28 p-1 text-center font-mono" type="text" name="bookName" placeholder="Search for Books" value={bookName} />
        <button class="rounded-lg border-2 bg-black p-[0.3rem] md:px-6 px-3 md:p-2 text-sm font-medium text-white" type='submit'>Search</button>
      </form>
    </div>

    <hr class="mx-16 my-4" />
    <h1 class="mx-16 text-2xl font-light my-4"> Search Result: </h1>
    {booksFound && booksFound.length > 0 ? (
  <div className="flex flex-row justify-between mx-16 flex-wrap">
    {booksFound.map((listing) => (
      <div key={listing.id} className="relative flex flex-col mb-4">
        {listing.images && listing.images.length > 0 ? (
  <img
    className="m-2 w-60 h-44 rounded-2xl"
    src={listing.images[0]}
    alt={listing.title}
  />
) : (
  <div>

    {userAuth && userAuth.userFound?._id === listing.seller.toString() ? (
      <Link to={`/upload-book-images/${listing._id}`}>
          <button className="m-2 w-60 h-44 rounded-2xl border-dashed border-2 flex items-center justify-center">
              Upload Image
          </button>
      </Link>
    ) : (
      <p className="m-2 w-60 h-44 rounded-2xl border-dashed border-2 flex items-center justify-center">
        No Image Upload 
      </p>
    )}
  </div>
)}

<button onClick={() => addWishlist(listing._id)}>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="absolute top-4 left-4 w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
</svg>
</button>
        <h3 className="text-sm font-bold mt-2 ml-2">{listing.title}</h3>
        <h3 className="text-sm font-bold ml-2 mt-1">${listing.price}</h3>
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
    <h2 className="text-xl font-semibold mt-6 mb-6 ml-16">No Books Found</h2>
  </div>
)}

    <Footer/>
    </div>
  )
}

export default SearchedBooks ; 