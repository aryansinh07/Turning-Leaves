import React from 'react'
import Footer from '../Footer'
import {useContext ,  useState} from 'react'
import { authContext } from './AuthContext/AuthContext'
import Navbar from '../Navbar'


const OTPverify = () => {
   
  const { registerUserAction } = useContext(authContext); 
  const [otpformData, setotpFormData] = useState({
    userOtp: 0,
  });

  const queryParams = new URLSearchParams(window.location.search);
  const otp = queryParams.get('otp');
  const formDataString = queryParams.get('formData');
  const formData = JSON.parse(formDataString);

  const onChangeInput = e => {
    setotpFormData({...otpformData , [e.target.name]: e.target.value });
  };

  const onSubmitHandler = e => {

    e.preventDefault();
    console.log(otp); 
    console.log(otpformData.userOtp); 

    if(otp === otpformData.userOtp)
    {
        registerUserAction(formData);
    }
    else
    {
        window.alert("Oops, Wrong Otp Entered !!! "); 
        window.location.href = "/sign-up" ; 
    }

  };


  return (
    <div>
        <Navbar/>
        <div class="m-16 flex flex-row justify-around">
      <div class="rounded-lg border-2 shadow-lg">
        <h1 class="m-3 text-center text-xl font-thin ">OTP Verification </h1>
        <form class="flex flex-col" onSubmit={onSubmitHandler}>
          <input  onChange={onChangeInput}  type="number" name="userOtp" value={otpformData.userOtp} class="m-3 rounded-md border-2 bg-gray-50 py-2 pl-2 pr-20 font-mono" placeholder="OTP" />
          <button class="m-3 rounded-md border-2 bg-black p-2 px-10 text-sm font-medium text-white hover:bg-gray-900 " type="submit">Enter</button>
        </form>
      </div>
    </div>
        <Footer/>
    </div>
  )
}

export default OTPverify ; 