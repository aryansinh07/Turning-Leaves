import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { useContext , useState} from 'react'
import { authContext } from './context/AuthContext/AuthContext'


const Login = () => {
  const { loginUserAction } = useContext(authContext); 

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
          console.error("Login failed:", error);
          setLoading(false);
        });
    }, 1000); // Adjust the delay time as needed
  };


  return (
    <div>
        <Navbar/>
        <div class="m-16 flex flex-row justify-around">
      <div class="rounded-lg border-2 shadow-lg">
        <h1 class="m-3 text-center text-xl font-thin ">Log in</h1>
        <form class="flex flex-col" onSubmit={onSubmitHandler}>
          <input  onChange={onChangeInput}  type="text" name="email" value={email} class="m-3 rounded-md border-2 bg-gray-50 py-2 pl-2 pr-20 font-mono" placeholder="Email" />
          <input  onChange={onChangeInput} type="text" name="password" value={password} class="m-3 rounded-md border-2 bg-gray-50 py-2 pl-2 pr-20 font-mono" placeholder="Password" />
          
          <button class="m-3 rounded-md border-2 bg-black p-2 px-10 text-sm font-medium text-white hover:bg-gray-900 " type="submit" >
             {loading? (<>
              <div class="flex justify-center items-center">
  <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
  </div>
             </>) : 'Login'} 
          </button>
        </form>
      </div>
    </div>
        <Footer/>
    </div>
  )
}

export default Login ; 