import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { useContext , useState} from 'react'
import { authContext } from './context/AuthContext/AuthContext'
import { Link } from 'react-router-dom'


const Login = () => {
  const { loginUserAction , error } = useContext(authContext); 

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const [loading , setLoading] = useState(false); 

  const onChangeInput = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
  
    
    setTimeout(() => {
      loginUserAction(formData)
        .then(() => setLoading(false))
        .catch((error) => {
          setLoading(false);
        });
    }, 500); // Adjust the delay time as needed
  };


  return (
    <div>
        <Navbar/>
        <section class="bg-white dark:bg-gray-900 mt-32 md:mt-0">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <h2 className='text-red-500 leading-tight font-bold tracking-tight ' > {error}</h2>
              <form class="space-y-4 md:space-y-6" onSubmit={onSubmitHandler} >
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input onChange={onChangeInput}  type="text" name="email" value={email} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input onChange={onChangeInput} type="password" name="password" value={password} placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div class="flex items-center justify-between">
                      <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                          </div>
                      </div>
                      <Link to={`/forget-password`} class="text-sm font-medium text-blue-600 hover:underline dark:text-primary-500">
                        Forgot password?
                      </Link>
                  </div>
                  <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  {loading? (<>
              <div class="flex justify-center items-center">
  <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
  </div>
             </>) : 'Sign in'} 
                  </button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <Link to="/sign-up" class="font-medium text-blue-600 hover:underline hover:text-blue-700 dark:text-primary-500">Sign up </Link>
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

export default Login ; 