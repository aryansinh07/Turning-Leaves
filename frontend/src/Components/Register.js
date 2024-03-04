import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { useState} from 'react'
import { Link } from 'react-router-dom'


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
        {/*<div class="m-16 flex flex-row justify-around">
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
  </div>*/}
       <section class=" dark:bg-gray-900 my-32">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create your Account
              </h1>
              <form class="space-y-4 md:space-y-6" onSubmit={onSubmitHandler}>
                  <div>
                      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                      <input  onChange={onChangeInput} type="text"  value={name}  name="name"  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input  onChange={onChangeInput} type="email" value={email} name="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input onChange={onChangeInput} type="text" value={password} name="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div>
                      <label for="bio" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your bio</label>
                      <textarea onChange={onChangeInput} value={bio}  name="bio" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
                  </div>
                  <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
                  <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <Link to="/login" class="font-medium text-primary-600 hover:text-blue-500 dark:text-blue-500">Login here</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
        <Footer/>
    </div>
  )
}

export default Register ; 