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
      <hr className="mx-16" />
      <div className="m-16 flex flex-row justify-around">
        <div className="rounded-lg border-2 shadow-lg">
          <h1 className="m-3 text-center text-xl font-thin">Upload Profile Picture</h1>
          <hr />
          <form encType="multipart/form-data" className="flex flex-col" onSubmit={onSubmitImageHandler}>
            <label
              htmlFor="profilePicture"
              className="mt-3 ml-3 font-mono text-gray-500 uppercase"
            >
              Select Image
            </label>
            <input
              type="file"
              name="profilePicture"
              onChange={onChangeImageInput}
              className="m-3 rounded-md border-2 bg-gray-50 py-2 pl-2 pr-20 font-mono"
            />
            <button
              type="submit"
              className="m-3 rounded-md border-2 bg-black p-2 px-10 text-sm font-medium text-white hover:bg-gray-900"
              disabled={loading} // Disable the button while loading
            >
              {loading ? 'Uploading...' : 'Upload'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UploadProfilePicture;
