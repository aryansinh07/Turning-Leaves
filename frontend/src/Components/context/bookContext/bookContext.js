import { createContext, useReducer} from "react";
import axios from "axios";
import { API_URL_BOOK } from "../../../utils/apiURL";
import { createBrowserHistory } from 'history';
import {
  BOOK_DETAILS_SUCCESS,
  BOOK_DETAILS_FAIL,
  BOOK_CREATION_SUCCESS,
  BOOK_CREATION_FAIL,
  BOOK_IMAGE_UPLOAD_SUCCESS , 
  BOOK_IMAGE_UPLOAD_FAILED ,
} from "./bookContextTypes";

export const bookContext = createContext();
//Initial State

const INITIAL_STATE = {
  userAuth: JSON.parse(localStorage.getItem("userAuth")),
  book: null,
  books: [],
  loading: false,
  error: null,
};

//reducer
const bookReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    // Details
    case BOOK_DETAILS_SUCCESS:
      return {
        ...state,
        book: payload,
        loading: false,
        error: null,
      };
    case BOOK_DETAILS_FAIL:
      return {
        ...state,
        book: null,
        loading: false,
        error: payload,
      };
    // Create
    case BOOK_CREATION_SUCCESS:
      return {
        ...state,
        book: payload,
        loading: false,
        error: null,
      };
    case BOOK_CREATION_FAIL:
      return {
        ...state,
        book: null,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

//Provider
const BookContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, INITIAL_STATE);
  const history = createBrowserHistory();

  const getBookDetailsAction = async id => {
    const config = {
      headers: {
        Authorization: `Bearer ${state?.userAuth?.token}`,
        "Content-Type": "application/json",
      },
    };
    try {

      const res = await axios.get(`${API_URL_BOOK}/${id}`, config);
      if (res?.data?.status === "success") {
        //dispatch
        dispatch({
          type: BOOK_DETAILS_SUCCESS,
          payload: res?.data?.bookfound,
        });
      }
    } catch (error) {
      dispatch({
        type: BOOK_DETAILS_FAIL,
        payload: error?.data?.response?.message,
      });
    }
  };
  

  const fetchAllBook = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {

      const res = await axios.get(`${API_URL_BOOK}`, config);
      if (res?.data?.status === "success") {
        //dispatch
        dispatch({
          type: BOOK_DETAILS_SUCCESS,
          payload: res?.data?.books,
        });
      }
    } catch (error) {
      dispatch({
        type: BOOK_DETAILS_FAIL,
        payload: error?.data?.response?.message,
      });
    }
  }; 



  //Get account Details action
  const createBookAction = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state?.userAuth?.token}`,
      },
    };
    try {
      const res = await axios.post(`${API_URL_BOOK}/post`, formData, config);
      if (res?.data?.status === "success") {
        //console.log(res.data.data)
        //dispatch
        dispatch({
          type: BOOK_CREATION_SUCCESS,
          payload: res?.data?.data?.bookFound,
        });
      }
      window.location.href = "/profile" ; 
    } catch (error) {
      dispatch({
        type: BOOK_CREATION_FAIL,
        payload: error?.data?.response?.message,
      });
    }
  };

  const uploadBookImageAction = async (formData,id) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${state?.userAuth?.token}`,
      },
    };
    try {
      const res = await axios.put(`${API_URL_BOOK}/upload-book-images/${id}`, formData, config);
      if (res?.data?.status === "success") {
        //console.log(res.data.data)
        //dispatch
        dispatch({
          type: BOOK_IMAGE_UPLOAD_SUCCESS,
          payload: res?.data?.data?.bookFound,
        });
      }
      window.location.href = "/buy" ; 
    } catch (error) {
      dispatch({
        type: BOOK_IMAGE_UPLOAD_FAILED,
        payload: error?.data?.response?.message,
      });
    }
  };

  const searchBookAction = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json', // Update content type
      }}; 
    try {
      const res = await axios.post(`${API_URL_BOOK}/search-books`, formData , config); 
      if(res.data.status === 'success')
      {
        const booksFound = res.data.data ;
        console.log(booksFound);  
        history.push('/search-books', { booksFound });
        window.location.href = "/search-books" ; 
      }
    }
    catch (error)
    {
      console.log(error); 
    }
  }
  

  return (
    <bookContext.Provider
      value={{
        getBookDetailsAction,
        book: state?.book,
        createBookAction,
        fetchAllBook,
        uploadBookImageAction,
        searchBookAction, 
        error: state?.error,
      }}
    >
      {children}
    </bookContext.Provider>
  );
};

export default BookContextProvider ; 
