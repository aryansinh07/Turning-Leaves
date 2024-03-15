import React, { useContext, useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { authContext } from './context/AuthContext/AuthContext';
import axios from 'axios';
import { API_URL_USER } from '../utils/apiURL';

const Profile = () => {
  const userAuthString = localStorage.getItem('userAuth');
  const userAuth = userAuthString ? JSON.parse(userAuthString) : null;
  const createdAtAsDate = new Date(userAuth.userFound.createdAt);
  const createdAtDate = createdAtAsDate.toDateString();

  const { userProfile, getUserProfile } = useContext(authContext);
  const userId = userAuth.userFound._id;

  useEffect(() => {
    getUserProfile(userId);
  }, [userId, getUserProfile]);

  const returnReviewerData = async (id) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const ReviewerData = await axios.get(`${API_URL_USER}/${id}`, config);
      return ReviewerData.data.data.name;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="relative">
          <div
            className="h-64 bg-cover bg-center rounded-t-lg"
            style={{ backgroundImage: 'url("https://img.freepik.com/free-photo/arrangement-different-sized-books-with-copy-space_23-2148721311.jpg?w=1060&t=st=1710519099~exp=1710519699~hmac=18a39980bc4499162e0d0ca6a908d5ce50cbda5e7ecb34a0607500a2ec5b6505")' }}
          ></div>
          <Link to={'/upload-profile-picture'}>
          <button>
          <img
            src={userProfile.profilePicture || 'profile-picture.jpg'}
            alt="Profile Picture"
            className="w-32 h-32 rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 border-4 border-white"
          />
          </button>
          </Link>
          
        </div>
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold">{userProfile.name}</h2>
          <p className="text-gray-600">{userProfile.bio}</p>
        </div>

        
        <div class="mt-8 overflow-hidden  rounded-lg border    shadow">
    <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
            User Profile
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
            This is some information about the user.
        </p>
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:p-0 ">
        <dl class="sm:divide-y sm:divide-gray-200">
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6  ">
                <dt class="text-sm font-medium text-gray-500 ">
                    Full name
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userProfile.name}
                </dd>
            </div>
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ">
                <dt class="text-sm font-medium text-gray-500">
                    Email address
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userProfile.email}
                </dd>
            </div>
            
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ">
                <dt class="text-sm font-medium text-gray-500">
                    Address
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    123 Main St<br/>
                     Anytown, USA 12345
                </dd>
            </div>

            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6  ">
                <dt class="text-sm font-medium text-gray-500">
                    Registered On
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {createdAtDate}
                </dd>
            </div>
          

        </dl>
    </div>
    </div>

        <Link to="/update-user-profile">
          <button className="ease-in-out transform hover:scale-105 duration-300 mt-2 p-1.5 px-8 bg-pink-300 rounded-md text-lg font-bold tracking-wide hover:bg-pink-400">
            Edit
          </button>
        </Link>
      </div>

      <h1 className="mx-16 text-3xl font my-8 text-center font-varela">Latest Books</h1>
      

      {userProfile && userProfile.listings ? (
        <div className="max-w-5xl flex flex-row mx-auto  flex-wrap px-4">
          {userProfile.listings.map((listing) => (
            <div
              key={listing.id}
              className="relative mx-4 mb-5 bg-white border border-gray-200 rounded-lg shadow ease-in-out transform hover:scale-105 duration-300"
            >
              {listing.images && listing.images.length > 0 ? (
                <img
                  className="w-72 h-72"
                  src={listing.images[0]}
                  alt="product image"
                />
              ) : (
                <div>
                  <Link to={`/upload-book-images/${listing._id}`}>
                    <button className="w-72 h-72">Upload Image</button>
                  </Link>
                </div>
              )}

              <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900">
                  {listing.title}
                </h5>

                <div className="flex items-center justify-between my-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {listing.price}
                  </span>
                  <Link
                    to={`/delete-book/${listing._id}`}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mt-6 mb-6">No Books Posted</h2>
        </div>
      )}

      <h1 className="mx-auto text-3xl font-varela my-8 text-center">Wishlists</h1>
      
      <div className="">
        {userProfile && userProfile.wishlist ? (
          <div className="max-w-5xl flex flex-row mx-auto  flex-wrap px-4">
            {userProfile.wishlist.map((listing) => (
              <div
                key={listing.id}
                className="relative mx-4 mb-5 bg-white border border-gray-200 rounded-lg shadow ease-in-out transform hover:scale-105 duration-300"
              >
                {listing.images && listing.images.length > 0 ? (
                  <img
                    className="w-72 h-72"
                    src={listing.images[0]}
                    alt="product image"
                  />
                ) : (
                  <div>
                    <h2>No Image</h2>
                  </div>
                )}

                <div className="px-5 pb-5">
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900">
                    {listing.title}
                  </h5>

                  <div className="flex items-center justify-between my-2">
                    <span className="text-3xl font-bold text-gray-900">
                      {listing.price}
                    </span>
                    <Link
                      to={`/book-details/${listing._id}`}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Buy Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mt-6 mb-6">
              No Books Wishlisted
            </h2>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Profile;