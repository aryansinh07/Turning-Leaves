import React from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';



const EmailSuccess = () => {
  return (
    <div>
        <Navbar/>
        <div class="min-h-screen flex items-center justify-center">
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
      <div class="text-center">
        <img src="https://img.freepik.com/free-vector/business-teamwork-with-letter-computer-message_24877-54777.jpg?t=st=1710130535~exp=1710134135~hmac=b09ea1e31df54068c64daef41898105a3795d223222fc433038eb167a0dfe65b&w=740" alt="Success" class="mx-auto mb-4 md:h-48 "/>
        <svg class="mx-auto mb-4 w-16 h-16 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 class="text-2xl font-bold text-gray-800 mb-4 font-varela">Email Verification Successful</h1>
        <p class="text-gray-600 mb-8">Your email has been successfully verified.</p>
        <Link to={`/`}>
        <button  class="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Continue</button>
        </Link>
      </div>
    </div>
  </div>
    <Footer/>
    </div>
  )
}

export default EmailSuccess ; 