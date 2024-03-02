import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { API_URL_REVIEW } from '../utils/apiURL';
import Navbar from './Navbar';
import Footer from './Footer';


const RateUser = () => {

  const {id} = useParams() ; 
  console.log(id); 
  const userAuthString = localStorage.getItem('userAuth');
  const userAuth = userAuthString ? JSON.parse(userAuthString) : null;
  const userId = userAuth.userFound._id ; 

  const [formData , setFormData] = useState({
    reviewer: userId,
    reviewedUser: id ,
    rating:Number , 
    reviewText: ""
  }); 

  const {rating , reviewText } = formData ; 
 
 
  const onChangeInput = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e,) => {
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
  }



  return (

    <div>
        <Navbar/>
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
    </div>
    <Footer/>
    </div>
  )
}

export default RateUser ; 