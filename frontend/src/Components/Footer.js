import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img className='h-16' src='https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books_23-2149331952.jpg?t=st=1709533812~exp=1709537412~hmac=61a47b119b8e04fd264c23e66a4ca55cca23c6b42647035db5fd8b43ba8f41cd&w=996' alt="Turning Leaves Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"> Turning Leaves </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link  className="hover:text-blue-700 me-4 md:me-6">About Us</Link>
            </li>
            <li>
              <Link  to={'/privacy-policy'} className="hover:text-blue-700 me-4 md:me-6">Privacy Policy</Link>
            </li>
            <li>
              <Link to={'/faq'} className="hover:text-blue-700 me-4 md:me-6">Frequent Questions</Link>
            </li>
            <li>
              <a href="#" className="hover:text-blue-700">Contact Us</a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://flowbite.com/" className="hover:underline">Turning Leaves</a>. All Rights Reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;

