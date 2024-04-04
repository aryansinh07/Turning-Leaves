import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { API_URL_REVIEW } from '../utils/apiURL';
import Navbar from './Navbar';
import Footer from './Footer';


const RateUser = () => {

  const {id} = useParams() ; 
  const userAuthString = localStorage.getItem('userAuth');
  const userAuth = userAuthString ? JSON.parse(userAuthString) : null;
  const userId = userAuth.userFound._id ; 
  const [loading , setLoading ] = useState(false) ; 

  const [formData , setFormData] = useState({
    reviewer: userId,
    reviewedUser: id ,
    reviewerName: userAuth.userFound.name , 
    reviewerProfilePicture : userAuth.userFound.profilePicture , 
    rating:Number, 
    reviewText: ""
  }); 

  const {rating , reviewText } = formData ; 
 
 
  const onChangeInput = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e,) => {
    setLoading(true); 
    e.preventDefault() ; 
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
    
    try {
        const data = await axios.post(`${API_URL_REVIEW}/${id}`,formData, config); 
        window.location.href = "/buy" ; 

    } catch (error) {
        console.log(error); 
    }
    setLoading(false); 
  }



  return (

    <div>
        <Navbar/>
        {/*
        <div class="m-16 flex flex-row justify-around">
      <div class="rounded-lg border-2 shadow-lg">
        <h1 class="m-3 text-center text-xl font-thin ">Post Review</h1>
        <hr/>
        <form class="flex flex-col" onSubmit={onSubmitHandler} >
          <label for="rating" class="m-3 text-xl font-mono text-gray-500"> Enter a Rating between 0 to 5 </label>
          <input type="number" onChange={onChangeInput} value={rating} name="rating" min="1" max="5" class="m-3 rounded-md border-2 bg-gray-50 py-2 pl-2 pr-20 font-mono" placeholder="Rating"/>
          
          <textarea rows="5" cols="10" onChange={onChangeInput} value={reviewText} name="reviewText" placeholder="Enter a Review" class="m-3 rounded-md border-2 bg-gray-50 py-2 pl-2 pr-20 font-mono"> </textarea>
          <button class="m-3 rounded-md border-2 bg-black p-2 px-10 text-sm font-medium text-white hover:bg-gray-900" type='Submit'>Post</button>
        </form>
      </div>
  </div>*/}

<section class="bg-white dark:bg-gray-900 mt-32">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Post a review
              </h1>
              <form class="space-y-4 md:space-y-6" onSubmit={onSubmitHandler} >
                  <div>
                      <label for="rating" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Rating between 1 to 5</label>
                      <input type="number" onChange={onChangeInput} value={rating} name="rating" min="1" max="5" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  
                  <div>
                      <label for="reviewText" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Write a Review </label>
                      <textarea  onChange={onChangeInput} value={reviewText} name="reviewText" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
                  </div>

                  <button type="submit" disabled={loading} class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                   {loading ? <div class="flex justify-center items-center">
  <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
  </div>:'Rate'}
                  </button>
                  
              </form>
          </div>
      </div>
  </div>
</section>
    <Footer/>
    </div>
  )
}

export default RateUser ; 