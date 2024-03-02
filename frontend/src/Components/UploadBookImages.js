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

  const onSubmitImageHandler = (e) => {
    setLoading(true); 
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
    // You can include additional data in the form data if needed
    
    // Dispatch action to upload images
    uploadBookImageAction(formData,id);
    setLoading(false); 
  };

  return (
    <div>
      <Navbar />
      <hr className="mx-16" />
      <div className="m-16 flex flex-row justify-around">
        <div className="rounded-lg border-2 shadow-lg">
          <h1 className="m-3 text-center text-xl font-thin">Upload Images</h1>
          <hr />
          <form enctype="multipart/form-data" className="flex flex-col" onSubmit={onSubmitImageHandler}>
            <label
              htmlFor="images"
              className="mt-3 ml-3 font-mono text-gray-500 uppercase"
            >
              Select Book Images
            </label>
            <input
              type="file"
              multiple
              name="images"
              onChange={onChangeImageInput}
              className="m-3 rounded-md border-2 bg-gray-50 py-2 pl-2 pr-20 font-mono"
              placeholder=""
            />
            <button className="m-3 rounded-md border-2 bg-black p-2 px-10 text-sm font-medium text-white hover:bg-gray-900" disabled={loading}>
              {loading ? 'Uploading...' : 'Upload'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UploadBookImages;
