import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { useContext} from 'react'
import {bookContext} from './context/bookContext/bookContext'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL_BOOK } from '../utils/apiURL'
import { useNavigate } from 'react-router-dom';


const BuyBooks = () => {

  const { fetchAllBook , book } = useContext(bookContext);
  const userAuthString = localStorage.getItem('userAuth');
  const userAuth = userAuthString ? JSON.parse(userAuthString) : null;
  const [categoryBooks,setCategoryBooks] = useState([]); 
  const [searchByCategory, setSearchByCategory] = useState(false); 
  const [selectedCategory , setSelectedCategory] = useState(''); 
  const navigate = useNavigate() ; 

  useEffect(()=>{
    fetchAllBook() ;
  },[]); 

 console.log(userAuth.userFound.wishlist); 
  // console.log(book); 
  
  
  const booksByCategory = async (selected_category) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      if(selected_category === 'All Books')
      {
        setSearchByCategory(false);
      }
      else
      {
        setSearchByCategory(true); 
        setSelectedCategory(selected_category); 
        const categoryBooks = await axios.get(`${API_URL_BOOK}/category/${selected_category}`, config); 
        console.log(categoryBooks); 
        if(categoryBooks) {
           setCategoryBooks(categoryBooks.data.bookFound); 
        }
      }
      
    } catch (error) {
      console.log(error); 
    }
  }
  
 

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
        
        navigate('/book-added-wishlist-success',{
          state:{
            name : name ,
          }
        });
        
        

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
        <section class="max-w-5xl mx-auto my-8 mt-32">
 <h2 class="text-3xl font-varela mb-6 text-center">Book Categories</h2>
 <hr className='max-w-5xl mx-auto my-6' />
 <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
   <div onClick={()=>booksByCategory('Fiction')} class="bg-gray-100 rounded-lg p-4 shadow-md transition duration-300 hover:bg-indigo-500 hover:text-white">
     <h3 class="text-xl font-varela mb-2">Fiction</h3>
   </div>
   <div  onClick={()=>booksByCategory('Science Fiction')} class="bg-gray-100 rounded-lg p-4 shadow-md transition duration-300 hover:bg-indigo-500 hover:text-white">
     <h3 class="text-xl font-varela mb-2">Science Fiction</h3>
   </div>
   <div onClick={()=>booksByCategory('Thriller')} class="bg-gray-100 rounded-lg p-4 shadow-md transition duration-300 hover:bg-indigo-500 hover:text-white">
     <h3 class="text-xl font-varela mb-2">Thriller</h3>
   </div>
   <div onClick={()=>booksByCategory('Fantasy')} class="bg-gray-100 rounded-lg p-4 shadow-md transition duration-300 hover:bg-indigo-500 hover:text-white">
     <h3 class="text-xl font-varela mb-2">Fantasy</h3>
   </div>
   <div onClick={()=>booksByCategory('Historical Fiction')} class="bg-gray-100 rounded-lg p-4 shadow-md transition duration-300 hover:bg-indigo-500 hover:text-white">
     <h3 class="text-xl font-varela mb-2">Historical Fiction</h3>
   </div>
   <div onClick={()=>booksByCategory('Romance')} class="bg-gray-100 rounded-lg p-4 shadow-md transition duration-300 hover:bg-indigo-500 hover:text-white">
     <h3 class="text-xl font-varela mb-2">Romance</h3>
   </div>
   <div onClick={()=>booksByCategory('Horror')} class="bg-gray-100 rounded-lg p-4 shadow-md transition duration-300 hover:bg-indigo-500 hover:text-white">
     <h3 class="text-xl font-varela mb-2">Horror</h3>
   </div>
   <div onClick={()=>booksByCategory('Adventure')} class="bg-gray-100 rounded-lg p-4 shadow-md transition duration-300 hover:bg-indigo-500 hover:text-white">
     <h3 class="text-xl font-varela mb-2">Adventure</h3>
   </div>
   <div onClick={()=>booksByCategory('Graphical Novel')} class="bg-gray-100 rounded-lg p-4 shadow-md transition duration-300 hover:bg-indigo-500 hover:text-white">
     <h3 class="text-xl font-varela mb-2">Graphical Novel</h3>
   </div>
   <div onClick={()=>booksByCategory('Mystery')} class="bg-gray-100 rounded-lg p-4 shadow-md transition duration-300 hover:bg-indigo-500 hover:text-white">
     <h3 class="text-xl font-varela mb-2">Mystery</h3>
   </div>
   <div onClick={()=>booksByCategory('Young Adult')} class="bg-gray-100 rounded-lg p-4 shadow-md transition duration-300 hover:bg-indigo-500 hover:text-white">
     <h3 class="text-xl font-varela mb-2">Young Adult</h3>
   </div>
   <div onClick={()=>booksByCategory('LGBTQ')} class="bg-gray-100 rounded-lg p-4 shadow-md transition duration-300 hover:bg-indigo-500 hover:text-white">
     <h3 class="text-xl font-varela mb-2">LGBTQ</h3>
   </div>
   <div onClick={()=>booksByCategory('Religion')} class="bg-gray-100 rounded-lg p-4 shadow-md transition duration-300 hover:bg-indigo-500 hover:text-white">
     <h3 class="text-xl font-varela mb-2">Religion</h3>
   </div>
   <div onClick={()=>booksByCategory('History')} class="bg-gray-100 rounded-lg p-4 shadow-md transition duration-300 hover:bg-indigo-500 hover:text-white">
     <h3 class="text-xl font-varela mb-2">History</h3>
   </div>
   <div onClick={()=>booksByCategory('Geography')} class="bg-gray-100 rounded-lg p-4 shadow-md transition duration-300 hover:bg-indigo-500 hover:text-white">
     <h3 class="text-xl font-varela mb-2">Geography</h3>
   </div>
   <div onClick={()=>booksByCategory('Science')} class="bg-gray-100 rounded-lg p-4 shadow-md transition duration-300 hover:bg-indigo-500 hover:text-white">
     <h3 class="text-xl font-varela mb-2">Science</h3>
   </div>
   <div onClick={()=>booksByCategory('Engineering')} class="bg-gray-100 rounded-lg p-4 shadow-md transition duration-300 hover:bg-indigo-500 hover:text-white">
     <h3 class="text-xl font-varela mb-2">Engineering</h3>
   </div> 
   <div onClick={()=>booksByCategory('Engineering Entrance')} class="bg-gray-100 rounded-lg p-4 shadow-md transition duration-300 hover:bg-indigo-500 hover:text-white">
     <h3 class="text-xl font-varela mb-2">Engineering Entrance</h3>
   </div>
   <div onClick={()=>booksByCategory('Medical Entrance')} class="bg-gray-100 rounded-lg p-4 shadow-md transition duration-300 hover:bg-indigo-500 hover:text-white">
     <h3 class="text-xl font-varela mb-2">Medical Entrance</h3>
   </div>
   <div onClick={()=>booksByCategory('School')} class="bg-gray-100 rounded-lg p-4 shadow-md transition duration-300 hover:bg-indigo-500 hover:text-white">
     <h3 class="text-xl font-varela mb-2">School</h3>
   </div>
   <div onClick={()=>booksByCategory('All Books')} class="bg-gray-100 rounded-lg p-4 shadow-md transition duration-300 hover:bg-indigo-500 hover:text-white">
     <h3 class="text-xl font-varela mb-2">All Books</h3>
   </div>
 </div>
 <hr className='max-w-5xl mx-auto my-6' />
 {searchByCategory ? (<>
  {categoryBooks && categoryBooks.length > 0 ? (
    <>
    <h1 className="mx-auto  my-8 text-3xl font-varela text-center">
    {selectedCategory} Books
    </h1>
    <hr className='max-w-5xl mx-auto my-6' />
  <div className="max-w-5xl flex flex-row mx-auto flex-wrap px-4">
    {categoryBooks.map((listing) => (
      
      <div
        key={listing.id}
        className="relative mb-5 bg-white border border-gray-200 rounded-lg shadow md:mx-4 ease-in-out transform hover:scale-105 duration-300"
      >
        {listing.images && listing.images.length > 0 ? (
          <div>
            <img
              className="w-72 h-72"
              src={listing.images[0]}
              alt="product image"
            />
            {listing.category? (
            <div className='absolute top-4 right-2 bg-gray-100 border-2  p-1 px-2 font-varela  rounded-2xl hover:bg-indigo-500 hover:text-white'>
              {listing.category}
            </div>):(<></>)}
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
  </>
) : (
  <div>
    <h2 className="text-xl font-semibold mt-6 mb-6 text-center">No Books Found for the Category {selectedCategory} </h2>
  </div>
)}

 </>):(<>
 </>)}
</section>
{!searchByCategory ? (<>
<h1 className="mx-auto  my-8 text-3xl font-varela text-center">
  Latest Books
</h1>
<hr className='max-w-5xl mx-auto my-6' />
{book && book.length > 0 ? (
  <div className="max-w-5xl flex flex-row mx-auto flex-wrap px-4">
    {book.map((listing) => (
      <div
        key={listing.id}
        className="relative mb-5 bg-white border border-gray-200 rounded-lg shadow mx-4 ease-in-out transform hover:scale-105 duration-300"
      >
        {listing.images && listing.images.length > 0 ? (
          <div>
            <img
              className="w-72 h-72"
              src={listing.images[0]}
              alt="product image"
            />
            {listing.category? (
            <div className='absolute top-2 right-2 bg-gray-100 border-2  p-1 px-2 font-varela  rounded-2xl hover:bg-indigo-500 hover:text-white'>
              {listing.category}
            </div>):(<></>)}
            {userAuth && userAuth.userFound ? (
              <div className="absolute top-2 left-2">
                {userAuth.userFound.wishlist.find((item) => item._id.toString() === listing._id.toString()) ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 " >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>

                ) : (
                  // Book is not wishlisted
                  <>
                  {userAuth.userFound.listings.find((item)=> item._id.toString() === listing._id.toString()) ? 
                    (<></>):
                    (
                      <button
                      className="cursor-pointer"
                      onClick={() => addWishlist(listing._id, listing.title)}
                    >
                      
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 hover:stroke-red-500" >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                      </svg>
                      
                    </button>
                  )}
                   </>
                )}
              </div>
            ) : null}
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
  <div className="flex justify-center items-center h-screen">
     <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
  </div>
)} </>):(<> </>)}  
        <Footer/>
    </div>
  )
}

export default BuyBooks ; 