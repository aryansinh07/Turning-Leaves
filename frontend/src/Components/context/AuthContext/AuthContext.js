import { createContext , useReducer, useState } from "react" ; 
import axios from "axios";
import { LOGIN_FAILED, LOGIN_SUCCESS , REGISTER_SUCCESS , REGISTER_FAIL , LOGOUT , FETCH_PROFILE_FAIL , FETCH_PROFILE_SUCCESS , FETCH_BOOKS_SUCCESS, FETCH_BOOKS_FAILED, USER_PROFILE_PICTURE_UPLOAD_SUCCESS , USER_PROFILE_PICTURE_UPLOAD_FAILED} from "./AuthActionTypes";
import {  API_URL_USER } from "../../../utils/apiURL";
export const authContext = createContext() ; 



const INITIAL_STATE = {
    userAuth: JSON.parse(localStorage.getItem('userAuth')) , 
    error: null , 
    loading: false , 
    profile: null,
}; 

 

const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
      //Register

      case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        userAuth: payload,
      };

    case REGISTER_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
        userAuth: null,
      };

      //Login
      case LOGIN_SUCCESS:
        //Add user to localstorage
        localStorage.setItem("userAuth", JSON.stringify(payload));
        return {
          ...state,
          loading: false,
          error: null,
          userAuth: payload,
        };

      case LOGIN_FAILED:
        return {
          ...state,
          error: payload,
          loading: false,
          userAuth: null,
        };

     
      case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        profile: payload,
      };

      case FETCH_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        profile: null,
      };

      case FETCH_BOOKS_SUCCESS:
      return {
        ...state , 
        loading: false , 
        error: null , 
        profile: null , 
      }

      case FETCH_BOOKS_FAILED: 
      return {
        ...state , 
        loading: false , 
        error: payload , 
        profile : null , 
      }



     case LOGOUT:
      //remove from storage
      localStorage.removeItem("userAuth");
      return {
        ...state,
        loading: false,
        error: null,
        userAuth: null,
      };
        

      // Profile
      default:
        return state;
    }
  };


const AuthContextProvider = ({children}) => {
    const [ state , dispatch] = useReducer(reducer,INITIAL_STATE); 
    const [userBooks, setUserBooks] = useState([]);
    const [sellerProfile , setSellerProfile] = useState([]); 
    const [userProfile , setUserProfile] = useState([]); 
    const [error, setError] = useState(''); 

    // register action 
    

       const registerUserAction = async formData => {
       
      
       const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        try {
          const res = await axios.post(
            `${API_URL_USER}/register`,
            formData,
            config
          );
          if (res?.data?.status === "success") {
            dispatch({
              type: REGISTER_SUCCESS,
              payload: res.data,
            });
            window.location.href = "/email-verified-success";
          }
          else
          {
            setError(res.data.message); 
          }
          //Redirect
          
        } catch (error) {
          dispatch({
            type: REGISTER_FAIL,
            payload: error?.response?.data?.message,
          });
        }
      };

    


    //login action 
    const loginUserAction =  async (formdata) => {
        const config = {
            headers : {
                "Content-Type":"application/json",
            }
        };
        try {
            const res = await axios.post(`${API_URL_USER}/login`,formdata,config);  
            if(res?.data?.status === "success")
            {
                dispatch({
                    type:LOGIN_SUCCESS,
                    payload: res.data,
                })
                window.location.href = "/"
            }
            else
            {
              setError(res.data.message); 

            }
            
        } catch (error) {
            
            dispatch({
                type:LOGIN_FAILED,
                payload: error?.response?.data?.message,
            })
        }
    }

    const getBooksByUser = async (id) => {
      const config = {
        headers: {
          "Content-Type":"application/json",
      }
      };
      try {
        const res = await axios.get(`${API_URL_USER}/books/${id}`,config) ; 
        if(res?.data?.status === "success")
            {
              setUserBooks(res.data.userBooks);
            }
        
      } catch (error) {
        dispatch({
          type:FETCH_BOOKS_FAILED,
          payload: error?.response?.data?.message,
      })
        
      }
    } 



    const getSellerProfile = async (id) => {
      const config = {
        headers: {
          "Content-Type":"application/json",
      }
      };
      try {
        const res = await axios.get(`${API_URL_USER}/${id}`,config) ; 
        if(res?.data?.status === "success")
            {
              setSellerProfile(res.data.data);
            }
        
      } catch (error) {
        console.log(error); 
      }
        
      }
     

      const getUserProfile = async (id) => {
        const config = {
          headers: {
            "Content-Type":"application/json",
        }
        };
        try {
          const res = await axios.get(`${API_URL_USER}/${id}`,config) ; 
          if(res?.data?.status === "success")
              {
                setUserProfile(res.data.data);
              }
          
        } catch (error) {
          console.log(error); 
        }
    
      }

      const uploadProfilePictureAction = async (formData) => {
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${state?.userAuth?.token}`,
          },
        };

        try {
          const res = await axios.put(`${API_URL_USER}/profile-photo-upload`,  formData, config);
          if (res?.data?.status === "success") {
            //console.log(res.data.data)
            //dispatch
            dispatch({
              type: USER_PROFILE_PICTURE_UPLOAD_SUCCESS,
              payload: res?.data?.data?.bookFound,
            });
          }
          window.location.href = "/profile" ; 
        } catch (error) {
          dispatch({
            type: USER_PROFILE_PICTURE_UPLOAD_FAILED,
            payload: error?.data?.response?.message,
          });
        }
      };

    const updateUserProfileAction = async (formData)=> {
      const config = {
        headers: {
          Authorization: `Bearer ${state?.userAuth?.token}`,
        },
      };
      try {
        const userIdString = state?.userAuth?.userFound._id?.toString();
        const newformData = {
          ...formData,  // Include other form data properties
          userId: userIdString,
        };
        const res = await axios.put(`${API_URL_USER}/update-user-profile`, newformData , config ); 
        console.log(res); 
        if (res?.data?.status === "success") {
          window.location.href = "/profile" ; 
        }
      } catch (error) {
        console.log(error);
      }
    } 
    

    //logout 
    const logoutUserAction = () => {
        dispatch({
          type: LOGOUT,
          payload: null,
        });
        //Redirect
        window.location.href = "/login";
      };

      const fetchProfileAction = async () => {
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${state?.userAuth?.token}`,
            },
          };
          const res = await axios.get(`${API_URL_USER}/`, config);
          if (res?.data) {
            dispatch({
              type: FETCH_PROFILE_SUCCESS,
              payload: res.data,
            });
          }
        } catch (error) {
          dispatch({
            type: FETCH_PROFILE_FAIL,
            payload: error?.response?.data?.message,
          });
        }
      };  

    //post book 
    return (
        
        <authContext.Provider value={{loginUserAction,registerUserAction,logoutUserAction,fetchProfileAction, getBooksByUser,userBooks, sellerProfile , getSellerProfile , userProfile , getUserProfile, uploadProfilePictureAction, updateUserProfileAction, error}}>
            {children}
        </authContext.Provider>
        
    ); 
}; 

export default AuthContextProvider ; 