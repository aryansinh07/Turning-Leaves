import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useParams } from 'react-router-dom';
import { bookContext } from './context/bookContext/bookContext';
import { useContext } from 'react';

const UploadBookImages = () => {
  const { id } = useParams();
  const { uploadBookImageAction } = useContext(bookContext);

  const [imageFormData, setImageFormData] = useState({
    images: null,
  });

  const [loading , setLoading] = useState(false); 

  const { images } = imageFormData;

  const onChangeImageInput = (e) => {
    setImageFormData({ ...imageFormData, [e.target.name]: e.target.files });
  };

  const onSubmitImageHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true before form submission
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
    
    // Dispatch action to upload images
    await uploadBookImageAction(formData,id);
    setLoading(false); // Set loading to false after form submission
  };

  return (
    <div>
      <Navbar />
      <section class=" my-32">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Upload Images
              </h1>
              <form  enctype="multipart/form-data" class="space-y-4 md:space-y-6" onSubmit={onSubmitImageHandler}>
                  <div>
                      <label for="images" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Images</label>
                      <input  onChange={onChangeImageInput} multiple type="file"   name="images"  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select Book Images" />
                  </div>
                 
                  <button disabled={loading} type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  {loading ? 'Uploading...' : 'Upload'}
                  </button>
                  
              </form>
          </div>
      </div>
  </div>
</section>

      <Footer />
    </div>
  );
};

export default UploadBookImages;
