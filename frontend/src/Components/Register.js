import React, {  useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL_USER } from '../utils/apiURL'
import { useNavigate } from 'react-router-dom';

const Register = () => {
  
  const [latitude , setLatitude] = useState(''); 
  const [longitude , setLongitude] = useState(''); 
  const [location , setLocation ] = useState('');
  const [loading , setLoading] = useState(false);

  useEffect(()=>{
    
    

  navigator.geolocation.getCurrentPosition(function(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      
      setLatitude(latitude.toString()); 
     
      setLongitude(longitude.toString()); 
      //getCityFromCoordinates(latitude, longitude);
  });

  if(latitude && longitude)
  {
     setLocation(latitude + ' ' + longitude); 
    
  }
  },[latitude,longitude,location])
  
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState(''); 
  
  
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

  const onSubmitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.get(`${API_URL_USER}/email-exist/${email}`, config);
      console.log(res);
      if (res.data.exist === true) {
        setErrorMsg('User Already Exist');
      } else {
        formData.location = location;
        console.log(formData);
        navigate('/otp-verification', {
          state: {
            formData: formData
          }
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); 
    }
  };  

  return (
    <div>
        <Navbar/>
       <section class="mt-32 ">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create your Account
              </h1>
              <h2 className='text-red-500 leading-tight font-bold tracking-tight ' > {errorMsg}</h2>
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
                        <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="">Terms and Conditions</a></label>
                      </div>
                  </div>
                  <button type="submit" disabled={loading} class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{loading ? <div class="flex justify-center items-center">
  <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
  </div> : 'Create an Account'}</button>
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