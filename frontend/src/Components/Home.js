import React, { useState, useContext } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Carousel } from 'flowbite-react'; 
import { bookContext } from './context/bookContext/bookContext';
import { Flowbite } from 'flowbite-react';

const Home = () => {
  const { searchBookAction } = useContext(bookContext);
  const [formData, setBookName] = useState({ bookName: "" });
  const { bookName } = formData;

  const onChangeInput = (e) => {
    setBookName({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    searchBookAction(formData);
  };

  return (
    <div className="relative bg-gradient-to-b from-purple-800 to-purple-500">
      <div id="video-content" className="relative z-20 text-center p-6">
        <Navbar />
        

        <div className="mx-16 mt-16 mb-10 flex flex-row justify-center items-center">
          <div className="text-center md:text-[65px] md:font-[600] font-varela md:max-w-[650px] md:leading-[60px] text-xl text-white hover:text-stroke-1 hover:text-transparent hover:text-stroke-white transition duration-500 ">
            Discover the perfect book for You
          </div>
        </div>

        <div>
          <form onSubmit={onSubmitHandler} className="mx-16 my-8 flex flex-row items-center justify-center">
            <input onChange={onChangeInput} className="my-5 bg-transparent border md:p-2 md:px-28 p-1 text-center font-mono text-white placeholder-white rounded-full" type="text" name="bookName" placeholder="Search for Books" value={bookName} />
            <button className="border-[1px] border-white px-4 py-2 rounded-full border-transparent bg-gradient-to-b from-white to-gray-300  shadow-lg  font-mono mx-2" type='submit'>Search</button>
          </form>
        </div>

        <div className="mx-16 my-16 flex flex-row justify-center items-center">
          <h3 className='text-center md:text-[28px] md:font-[600] font-varela md:max-w-[557px] md:leading-[32px] text-xl text-white'>
          Welcome to Turning Leaves <br/>
          Your Companion in Book Reselling!
          </h3>
        </div>

        <div>
        
        <Carousel slideInterval={5000}>
            <div className=' max-w-96 p-[30px] rounded-[24px] bg-white bg-opacity-[0.3] shadow-lg text-white text-justify'>
              <p>
              Turning Leaves is more than just a platform; it's your trusted companion in the world of book reselling. Whether you're decluttering your shelves or looking for a new literary adventure, BookWise is here to guide you through every step of the process.
              </p>
            </div>

            <div className='  max-w-96 p-[30px] rounded-[24px] bg-white bg-opacity-[0.3] shadow-lg text-white text-justify'>
              <p>
              Have a collection of well-loved books gathering dust? Turn them into treasures for others by listing them on BookWise. Our intuitive platform makes it easy to showcase your titles, connect with potential buyers, and earn some extra cash along the way.
              </p>
            </div>

            <div className='max-w-96 p-[30px] rounded-[24px] bg-white bg-opacity-[0.3] shadow-lg text-white text-justify'>
              <p>
              On the hunt for your next great read? Explore BookWise's vast collection of pre-loved books from fellow bookworms around the globe. From timeless classics to contemporary bestsellers, you're sure to find something that speaks to your soul.
              </p>
            </div>

            

        </Carousel>

        </div>
        

      </div>
      <Footer />
    </div>
  );
}

export default Home;
