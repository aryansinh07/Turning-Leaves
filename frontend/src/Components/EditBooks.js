import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import React, { useContext, useEffect, useState } from 'react'
import { API_URL_BOOK } from '../utils/apiURL';
import { useParams } from 'react-router-dom';
import { bookContext } from './context/bookContext/bookContext';


const EditBooks = () => {
    const { id } = useParams();
    const { book, getBookDetailsAction } = useContext(bookContext);
    

    const userAuthString = localStorage.getItem('userAuth');
    const userAuth = userAuthString ? JSON.parse(userAuthString) : null;

    useEffect(()=>{
        getBookDetailsAction(id);
    },[id, getBookDetailsAction]); 

    const [formData, setFormData] = useState({
    title:"",
    author:"",
    price:Number, 
    category:"",
    condition:"",
    description:"",
  });

  const { title , author, price , category, condition, description } = formData;
  const [loading , setLoading] = useState(false); 

  const onChangeInput = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async(e) => {
    e.preventDefault() ; 
    setLoading(true); 
    try {
        const config = {
            headers: {
              Authorization: userAuth ? `Bearer ${userAuth.token}` : null,
              "Content-Type": "application/json",
            },
          };
        const response = await axios.put(`${API_URL_BOOK}/update-book/${id}`, formData , config) ; 
        setLoading(false);
        if (response.data.status === 'success' ) {
            window.alert("Book Details Updated Successfully !!");  
            window.location.href = "/profile" ; 
          } else {
            console.error('Failed to Update the book');
          }
    } catch (error) {
        console.error('Error:', error);
    }
  }

  return (
    <div>
    <Navbar/>
    {book? (
      
    <section class=" dark:bg-gray-900 my-32 md:mt-40">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Update Book Info
              </h1>
              <form class="space-y-4 md:space-y-6" onSubmit={onSubmitHandler}>
                  <div>
                      <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                      <input  onChange={onChangeInput} type="text"  value={title}  name="title"  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={book.title} required=""/>
                  </div>
                  <div>
                      <label for="author" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Author</label>
                      <input  onChange={onChangeInput} type="text" value={author} name="author" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={book.author} required=""/>
                  </div>
                  <div>
                      <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                      <input onChange={onChangeInput} type="number" value={price} name="price"  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={book.price} required=""/>
                  </div>
                  <div>
                      <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                      <select  value={category} onChange={onChangeInput} name="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={book.category}>

                       <option>Fiction</option>
                       <option>Science Fiction</option>
                       <option>Thriller</option>
                       <option>Fantancy</option>
                       <option>Historical Fiction</option>
                       <option>Romance</option>
                       <option>Horror</option>
                       <option>Adventure</option>
                       <option>Graphical Novel</option>
                       <option>Mystery</option>
                       <option>Young Adult</option>
                       <option>LGBTQ</option>
                       <option>Religion</option>
                       <option>History</option>
                       <option>Geography</option>
                       <option>Science</option>
                       <option>Engineering</option>
                       <option>Engineering Entrance</option>
                       <option>Medical Entrance</option>
                       <option>School</option>
                       </select>
                  </div>
                  <label for="condition" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select the Condition</label>
                  <select  value={condition} onChange={onChangeInput} name="condition" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " placeholder={book.condition}>

                       <option>Excellent </option>
                       <option>Fair</option>
                       <option>Good</option>
                       
                  </select>
                  <div>
                      <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                      <textarea onChange={onChangeInput} value={description}  name="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={book.description}></textarea>
                  </div>
                  <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  {loading ? <div class="flex justify-center items-center">
  <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
  </div> : 'Update'}
                  </button>
              </form>
          </div>
      </div>
  </div>
</section>
          ):(<></>)}
        <Footer/>
    
    </div>
  )
}

export default EditBooks ; 