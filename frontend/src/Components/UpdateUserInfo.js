import React, { useContext, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { authContext } from './context/AuthContext/AuthContext';

const UpdateUserInfo = () => {
  const { updateUserProfileAction } = useContext(authContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
  });

  const [loading, setLoading] = useState(false); // Added loading state

  const { name, email, bio } = formData;

  const onChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    // Set loading to true when the update starts
    setLoading(true);

    // Call the updateUserProfileAction function
    await updateUserProfileAction(formData);

    // Set loading back to false when the update is complete
    setLoading(false);
  };

  return (
    <div>
      <Navbar />
      <div className="m-16 flex flex-row justify-around">
        <div className="rounded-lg border-2 shadow-lg">
          <h1 className="m-3 text-center text-xl font-thin ">Update User Profile</h1>
          <form onSubmit={onSubmitHandler} className="flex flex-col">
            <input
              onChange={onChangeInput}
              type="text"
              value={name}
              name="name"
              className="m-3 rounded-md border-2 bg-gray-50 py-2 pl-2 pr-20 font-mono"
              placeholder="Name"
            />
            <input
              onChange={onChangeInput}
              type="text"
              value={email}
              name="email"
              className="m-3 rounded-md border-2 bg-gray-50 py-2 pl-2 pr-20 font-mono"
              placeholder="Email"
            />
            <textarea
              onChange={onChangeInput}
              rows="5"
              value={bio}
              cols="10"
              name="bio"
              placeholder="Bio"
              className="m-3 rounded-md border-2 bg-gray-50 py-2 pl-2 pr-20 font-mono"
            ></textarea>
            <button
              className="m-3 rounded-md border-2 bg-black p-2 px-10 text-sm font-medium text-white hover:bg-gray-900"
              type="submit"
              disabled={loading} // Disable the button while loading
            >
              {loading ? 'Updating...' : 'Update'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateUserInfo;
