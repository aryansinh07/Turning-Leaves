import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
const emailjs = require("@emailjs/browser");

const ForgetPassword = () => {
  const [otpInput , setOtpInput] = useState(true); 
  const [otpverified , setOtpverified] = useState(false); 

  const generateRandomCode = () => {
    return Math.floor(100000 + Math.random() * 900000); // Generates a random 6-digit number
  };

  const handleSubmitHandler = async (e) => {
    e.preventDefault() ; 
    setOtpInput(false); 
  }
  
  return (
    <div>
      <Navbar/>
      <section class="dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Change Password
            </h2>
            <p class="mb-4 text-sm text-gray-500 dark:text-gray-300">This function is under construction. It does not work !</p> {/* Add this line */}
            <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
              <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
              </div>
              <div hidden={otpInput}>
                <label for="otp" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">OTP</label>
                <input type="number" name="otp" id="otp" placeholder="Enter the Otp" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
              </div>
              <button type="submit" onClick={handleSubmitHandler} class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Reset passwod</button>
            </form>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default ForgetPassword;
