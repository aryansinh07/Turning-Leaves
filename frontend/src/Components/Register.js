import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { useState} from 'react'


const emailjs = require("@emailjs/browser"); 
 
const Register = () => {
  
  const [formData, setFormData] = useState({
    name:"",
    email: "",
    password: "",
    bio: "",
  });
  

  const generateRandomCode = () => {
    return Math.floor(100000 + Math.random() * 900000); // Generates a random 6-digit number
  };

  
  
  const { name , email, password , bio } = formData;


  const onChangeInput = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = e => {

    e.preventDefault();
    //dispatch action
    const serviceId = "service_2uoe68m" ; 
    const templateId = "template_afw1zrm" ; 
    const publicKey = "vGwDmMB7XybMR10h6" ; 
    const otp = generateRandomCode() ; 
    const templateparams = {
        user_name : name , 
        otp, 
        to_email : email , 
    }

    emailjs
    .send(serviceId, templateId, templateparams, publicKey)
    .then((promise) => {
      console.log(promise);

      // Redirect to OTP verification page with otp and formData
      const queryParams = new URLSearchParams({
        otp: otp,
        formData: JSON.stringify(formData),
      });

      window.location.href = `/otp-verification?${queryParams.toString()}`;
    })
    .catch((error) => {
      console.log(error);
    });
    
  };

  return (
    <div>
        <Navbar/>
        <div class="m-16 flex flex-row justify-around">
      <div class="rounded-lg border-2 shadow-lg">
        <h1 class="m-3 text-center text-xl font-thin ">Sign Up</h1>
        <form  onSubmit={onSubmitHandler}  class="flex flex-col">
          <input onChange={onChangeInput} type="text"  value={name}   name="name" class="m-3 rounded-md border-2 bg-gray-50 py-2 pl-2 pr-20 font-mono" placeholder="Name" />
          <input onChange={onChangeInput} type="text" value={ email} name="email" class="m-3 rounded-md border-2 bg-gray-50 py-2 pl-2 pr-20 font-mono" placeholder="Email" />
          <input onChange={onChangeInput} type="text" value={password} name="password" class="m-3 rounded-md border-2 bg-gray-50 py-2 pl-2 pr-20 font-mono" placeholder="Password" />
          <textarea onChange={onChangeInput} rows="5" value={bio} cols="10" name="bio" placeholder="Bio" class="m-3 rounded-md border-2 bg-gray-50 py-2 pl-2 pr-20 font-mono"> </textarea>
          <button class="m-3 rounded-md border-2 bg-black p-2 px-10 text-sm font-medium text-white hover:bg-gray-900" type='submit'>
            Sign Up
          </button>
        </form>
      </div>
    </div>
        <Footer/>
    </div>
  )
}

export default Register ; 