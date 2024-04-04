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
      {/*<div className="m-16 flex flex-row justify-around">
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
  </div>*/}

      <section class="mt-32 md:mt-0">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Update User Information
              </h1>
              <form class="space-y-4 md:space-y-6" onSubmit={onSubmitHandler}>
                  <div>
                      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Name</label>
                      <input  onChange={onChangeInput} type="text"  value={name}  name="name"  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your name" />
                  </div>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input  onChange={onChangeInput} type="email" value={email} name="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                  </div>
                  <div>
                      <label for="bio" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your bio</label>
                      <textarea onChange={onChangeInput} value={bio}  name="bio" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bio"></textarea>
                  </div>
                  
                  <button disabled={loading} type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  {loading ? <div class="flex justify-center items-center">
  <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
  </div> : 'Update Information'}
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

export default UpdateUserInfo;
