import React, { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { useContext} from 'react'
import {bookContext} from './context/bookContext/bookContext' 

const SellBook = () => {

  const {createBookAction} = useContext(bookContext) ; 

  const [formData, setFormData] = useState({
    title:"",
    author:"",
    price:Number, 
    tags:"",
    condition:"",
    description:"",
  });

  const { title , author, price , tags, condition, description } = formData;
  const [loading , setLoading] = useState(false); 

  const onChangeInput = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = e => {
    setLoading(true); 
    e.preventDefault();
    //dispatch action
    createBookAction(formData);
    setLoading(false);  
  };

  return (
    <div>
        <Navbar/> 
        <div class="m-16 flex flex-row justify-around">
      <div class="rounded-lg border-2 shadow-lg">
        <h1 class="m-3 text-center text-xl font-thin ">Post Book</h1>
        <form class="flex flex-col" onSubmit={onSubmitHandler}>
          <input  value={title}  onChange={onChangeInput} type="text" name="title" class="m-3 rounded-md border-2 bg-gray-50 py-2 pl-2 pr-20 font-mono" placeholder="Title" />
          <input value={author}  onChange={onChangeInput} type="text" name="author" class="m-3 rounded-md border-2 bg-gray-50 py-2 pl-2 pr-20 font-mono" placeholder="Author" />
          <input value={price} onChange={onChangeInput} type="number" name="price" class="m-3 rounded-md border-2 bg-gray-50 py-2 pl-2 pr-20 font-mono" placeholder="Price in rupees" />
          <input value={tags} onChange={onChangeInput} type="text" name="tags" class="m-3 rounded-md border-2 bg-gray-50 py-2 pl-2 pr-20 font-mono" placeholder="tags" />
          <select value={condition} onChange={onChangeInput} class="m-3 rounded-md border-2 bg-gray-50 py-2 pl-2 pr-20 font-mono text-gray-400" name = "condition" >
            <option selected> Select the book condition </option>
            <option> Excellent  </option>
            <option>  Fair </option>
            <option> Good </option>
          </select>
          <textarea value={description} onChange={onChangeInput} name = "description" rows="5" cols="10"  placeholder="Description" class="m-3 rounded-md border-2 bg-gray-50 py-2 pl-2 pr-20 font-mono"> </textarea>


          <button class="m-3 rounded-md border-2 bg-black p-2 px-10 text-sm font-medium text-white hover:bg-gray-900" type='submit' disabled={loading}>
             {loading ? 'Posting...' : 'Post'}
          </button>
        </form>
      </div>
  </div>
        <Footer/>
    </div>
  )
}

export default SellBook ; 