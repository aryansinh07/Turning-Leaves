// import React, { } from 'react'
// import Footer from '../Footer'
// import {useContext ,  useState} from 'react'
// import { authContext } from './AuthContext/AuthContext'
// import Navbar from '../Navbar'
// import { useLocation } from 'react-router-dom';

// const emailjs = require("@emailjs/browser");


// const OTPverify = () => {
   
//   const { registerUserAction  } = useContext(authContext); 
//   const [otpformData, setotpFormData] = useState({
//     userOtp: 0,
//   });
//   const [otp , setotp] = useState(null);  
//   const [otpSent , setOtpSent] = useState(false); 
//   const [error , setError] = useState(false); 
//   const [errorMsg , setErrorMsg] = useState(''); 
//   const [emailsendmsg , setEmailSendMsg] = useState(''); 
//   const [loading , setLoading] = useState(false); 

//   const location = useLocation();
//   let { formData } = location.state;

//   const generateRandomCode = () => {
//     return Math.floor(100000 + Math.random() * 900000); // Generates a random 6-digit number
//   };

  

//   const sendEmail = async () => {

//           const generatedOtp = generateRandomCode() ; 
//           setotp(generatedOtp); 
//           setOtpSent(true) ;
//           const serviceId = "service_2uoe68m" ; 
//           const templateId = "template_afw1zrm" ; 
//           const publicKey = "vGwDmMB7XybMR10h6" ; 
//           const templateparams = {
//               user_name : formData.name , 
//               otp:generatedOtp, 
//               to_email : formData.email , 
//           }

//           emailjs
//           .send(serviceId, templateId, templateparams, publicKey)
//           .then((promise) => {
//             console.log(promise);
//             setError(false); 
//             setEmailSendMsg('An 6 digit Otp has been send to your Email-id'); 
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//   }

//   const ResendEmail = async(e) =>{
//       e.preventDefault(); 
//       setOtpSent(false); 
//       await sendEmail(); 
//   }



//   const onChangeInput = e => {
//     setotpFormData({...otpformData , [e.target.name]: e.target.value });
//   };

//   const onSubmitHandler = e => {
      
//       setLoading(true); 
//       e.preventDefault(); 
//       console.log(otp);
//       console.log((otpformData.userOtp)); 

      
    
     
    
//       if(otp.toString() === otpformData.userOtp)
//     {
//         registerUserAction(formData);
//     }
//     else
//     {
//         console.log('Incorrect otp')
//         setError(true); 
//         setErrorMsg('Invalid Otp Entered!!'); 
//     }
//     setLoading(false); 
//   };


//   return (
//     <div>
//         <Navbar/>
    
//     <div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
//   <div class="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
//     <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
//       <div class="flex flex-col items-center justify-center text-center space-y-2">
//         <div class="font-semibold text-3xl">
//           <p>Email Verification</p>
//         </div>
//         {error ? (
//           <div className="flex flex-row text-sm font-medium text-red-400">
//           <p>{errorMsg}</p>
//         </div>
//         ):(<div className="flex flex-row text-sm font-medium text-green-400">
//         <p>{emailsendmsg}</p>
//       </div>)}
//       </div>

//       <div>
//         <form onSubmit={onSubmitHandler}>
//           <div class="flex flex-col space-y-16">
//             <div class="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
//                 <input onChange={onChangeInput} name="userOtp" value={otpformData.userOtp} class="w-full h-full flex flex-col items-center justify-center text-center px-5 py-2 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="number" />
//            </div>

//             <div class="flex flex-col space-y-5">
//             <div>
//                 <button onClick={sendEmail} disabled={otpSent}  class="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-green-700 border-none text-white text-sm shadow-sm">
//                   {otpSent ? 'Otp Sent':'Send Otp'}
//                 </button>
//             </div>
//             <div>
//                 <button disabled={loading} type="submit" class="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
//                   {loading ? 'Verifying...' : 'Verify Account'}
//                 </button>
//             </div>

//               <div class="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
//                 <p>Didn't recieve code?</p> <button class="flex flex-row items-center text-blue-600" href=''  onClick={ResendEmail}   rel=""> Resend</button>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   </div>
// </div>

//         <Footer/>
//     </div>
//   )
// }

// export default OTPverify ; 

import React, { useState } from 'react';
import Footer from '../Footer';
import { useContext } from 'react';
import { authContext } from './AuthContext/AuthContext';
import Navbar from '../Navbar';
import { useLocation } from 'react-router-dom';

const emailjs = require("@emailjs/browser");

const OTPverify = () => {
   
  const { registerUserAction } = useContext(authContext); 
  const [otpformData, setotpFormData] = useState({
    userOtp: 0,
  });
  const [otp , setotp] = useState(null);  
  const [otpSent , setOtpSent] = useState(false); 
  const [error , setError] = useState(false); 
  const [errorMsg , setErrorMsg] = useState(''); 
  const [emailsendmsg , setEmailSendMsg] = useState(''); 
  const [verifying, setVerifying] = useState(false);

  const location = useLocation();
  let { formData } = location.state;

  const generateRandomCode = () => {
    return Math.floor(100000 + Math.random() * 900000); // Generates a random 6-digit number
  };

  const sendEmail = async () => {
    const generatedOtp = generateRandomCode();
    setotp(generatedOtp);
    setOtpSent(true);
    const serviceId = "service_2uoe68m";
    const templateId = "template_afw1zrm";
    const publicKey = "vGwDmMB7XybMR10h6";
    const templateparams = {
      user_name: formData.name,
      otp: generatedOtp,
      to_email: formData.email,
    };

    emailjs
      .send(serviceId, templateId, templateparams, publicKey)
      .then((promise) => {
        console.log(promise);
        setError(false);
        setEmailSendMsg('An 6 digit Otp has been send to your Email-id');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ResendEmail = async (e) => {
    e.preventDefault();
    setOtpSent(false);
    await sendEmail();
  };

  const onChangeInput = e => {
    setotpFormData({...otpformData , [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault(); 
    if(otp.toString() === otpformData.userOtp) {
        setVerifying(true); // Start the verification process
        await registerUserAction(formData); // Perform the registration action
    } else {
        setError(true); 
        setErrorMsg('Invalid Otp Entered!!'); 
    }
    setVerifying(false); // Verification process completed
  };

  return (
    <div>
      <Navbar />
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Email Verification</p>
              </div>
              {error ? (
                <div className="flex flex-row text-sm font-medium text-red-400">
                  <p>{errorMsg}</p>
                </div>
              ) : (
                <div className="flex flex-row text-sm font-medium text-green-400">
                  <p>{emailsendmsg}</p>
                </div>
              )}
            </div>
            <div>
              <form onSubmit={onSubmitHandler}>
                <div className="flex flex-col space-y-16">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    <input
                      onChange={onChangeInput}
                      name="userOtp"
                      value={otpformData.userOtp}
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 py-2 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="number"
                    />
                  </div>
                  <div className="flex flex-col space-y-5">
                    <div>
                      <button
                        onClick={sendEmail}
                        disabled={otpSent}
                        className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-green-700 border-none text-white text-sm shadow-sm"
                      >
                        {otpSent ? 'Otp Sent' : 'Send Otp'}
                      </button>
                    </div>
                    <div>
                      <button
                        disabled={verifying}
                        type="submit"
                        className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                      >
                        {verifying ? 'Verifying...' : 'Verify Account'}
                      </button>
                    </div>
                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Didn't recieve code?</p>{' '}
                      <button
                        className="flex flex-row items-center text-blue-600"
                        onClick={ResendEmail}
                        rel=""
                      >
                        {' '}
                        Resend
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default OTPverify;
