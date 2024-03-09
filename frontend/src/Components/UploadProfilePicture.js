import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useContext } from 'react';
import { authContext } from './context/AuthContext/AuthContext';

const UploadProfilePicture = () => {
  const { uploadProfilePictureAction } = useContext(authContext);

  const [imageFormData, setImageFormData] = useState({
    profilePicture: null,
  });

  const [loading, setLoading] = useState(false); // New state for loading indicator

  const { profilePicture } = imageFormData;

  const onChangeImageInput = (e) => {
    setImageFormData({ ...imageFormData, profilePicture: e.target.files[0] });
  };

  const onSubmitImageHandler = async (e) => {
    e.preventDefault();

    setLoading(true); // Set loading to true when the upload starts

    try {
      const formData = new FormData();
      formData.append('profilePicture', profilePicture);

      // Dispatch action to upload image
      await uploadProfilePictureAction(formData);
      window.location.href = "/profile";
    } catch (error) {
      console.error('Error:', error);
      // Handle the error if needed
    } finally {
      setLoading(false); // Set loading to false when the upload completes (or fails)
    }
  };

  return (
    <div>
      <Navbar />
      <section class=" my-32">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Upload Profile Picture
              </h1>
              <form  enctype="multipart/form-data" class="space-y-4 md:space-y-6" onSubmit={onSubmitImageHandler}>
                  <div>
                      <label for="profilePicture" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Picture</label>
                      <input  onChange={onChangeImageInput}  type="file"   name="profilePicture"  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select Profile Picture" />
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

export default UploadProfilePicture;
