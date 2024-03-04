import React, { useState , useContext } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { bookContext } from './context/bookContext/bookContext'
const Home = () => {

  const { searchBookAction } = useContext(bookContext); 
  const [formData , setBookName] = useState({
    bookName:""
  })
  
  const {bookName} = formData ; 

  const onChangeInput = (e) => {
    setBookName({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault() ; 
    searchBookAction(formData); 
  }

    return (
    <>
    <Navbar/>
    <div class="mx-16 my-16 flex flex-row-reverse justify-center">
      <div class="flex flex-row items-end justify-center text-center text-4xl font-bold tracking-wide">
        Discover the perfect <br />
        book for you
      </div>
      <div class="h-32 w-52">
        <img src="https://img.freepik.com/free-vector/telecommuting-illustration_23-2148485189.jpg?w=740&t=st=1701956903~exp=1701957503~hmac=fc09d9f45628fdd63d74cf9c39d59dba674c013e64a4792b6613c22038de00d2" />
      </div>
    </div>

    <div class="mx-16 my-16 flex flex-row items-center justify-center">
      <form onSubmit={onSubmitHandler}> 
        <input onChange = {onChangeInput} class="my-5 rounded-lg bg-gray-100 p-2 px-28 text-center font-mono" type="text" name="bookName" placeholder="Search for Books" value={bookName} />
        <button class="rounded-lg border-2 bg-black p-2 px-6 text-sm font-medium text-white" type='submit' > Search </button>
      </form>
    </div>

    <hr class="mx-16" />
    <div class="mx-16 my-4 font-bold tracking-normal">How it Works</div>
    <hr class="mx-16" />

    <div class="guide mx-16 flex flex-row">
      <div class="1 flex flex-col border-r">
        <img class="h-52 w-80" src="https://img.freepik.com/free-vector/girl-picking-book_53876-16966.jpg?w=740&t=st=1701958324~exp=1701958924~hmac=f29ac74da1eade84f9e4d81b269c224815ffaa72fa4a48a903306e51e0de7e19" />
        <span class="mx-2 font-semibold"> Step1 </span>
        <p class="mx-2 mb-8 mt-2 text-lg font-normal">Enter your search criteria. Type in the book title, author, or ISBN to find the books you're looking for.</p>
      </div>

      <div class="1 flex flex-col border-r">
        <img class="h-52 w-80" src="https://img.freepik.com/free-vector/young-man-with-laptop-relaxing-sofa-home_74855-5606.jpg?w=996&t=st=1705327016~exp=1705327616~hmac=912d948eec89128f8d3680527049a3df77896be4ec2fbe0cc1d945d1b78395d7" />
        <span class="mx-2 font-semibold"> Step2 </span>
        <p class="mx-2 mb-8 mt-2 text-lg font-normal">Browse and select your desired book. You're one step closer to finding the perfect read.</p>
      </div>

      <div class="1 flex flex-col border-r">
        <img class="h-52 w-80" src="https://img.freepik.com/free-vector/man-library-scene-young-guy-sitting-table-with-books-lamp-studying-working-reading-modern-room-interior-design-with-desk-chairs-bookcase-with-ladder_575670-1119.jpg?w=740&t=st=1705327286~exp=1705327886~hmac=93d01ec23cae38baf57e53e5a70e378a093d66b0643c6f6a79de68d2767d2c10" />
        <span class="mx-2 font-semibold"> Step3 </span>
        <p class="mx-2 mb-8 mt-2 text-lg">Complete your purchase by contacting and collaborating with the seller !</p>
      </div>

    </div>

    <hr class="mx-16 mb-4" />

    <div class="mx-16 my-4 font-bold tracking-normal">Sell it with Online Book Thrift Store</div>

    <hr class="mx-16 mb-4" />

    <div class="mx-16 flex flex-row justify-around">
      <img class="h-80 w-80" src="https://img.freepik.com/free-vector/men-going-food-shopping_74855-1362.jpg?w=740&t=st=1701963016~exp=1701963616~hmac=b92c8921f5602d656e0ac796c9a14e375debee07865d625c7375e347b3383916" alt="" />

      <div class="flex flex-col justify-around">
        <span class="text-2xl font-semibold"> As a Seller </span>
        <p class="w-60 text-lg">Earn money by selling your used books. All you need is a book and an account with us.</p>
        <button class="rounded-lg border-2 bg-black p-2 text-sm font-medium text-white">Sell with us</button>
      </div>
    </div>

    <hr class="mx-16 my-4" />

    <div class="mx-16 flex flex-row justify-around">
      <img class="h-80 w-80" src="https://img.freepik.com/free-vector/student-boy-with-reading-book-hands_25030-39022.jpg?w=740&t=st=1701962860~exp=1701963460~hmac=863bd428ac34d23c7f9ab1e1693c0ba2e44488b6297717de399402a5399912b9" alt="" />

      <div class="flex flex-col justify-around">
        <span class="text-2xl font-semibold"> As a Buyer </span>
        <p class="w-60 text-lg">Online Book Thrift Store offers a wide selection of used books, with detailed information and secure checkout.</p>
        <button class="rounded-lg border-2 bg-black p-2 text-sm font-medium text-white">Buy with us</button>
      </div>
    </div>
    <hr class="mx-16 my-4" />

    <div class="mx-16 flex flex-row justify-around">
      <img class="h-80 w-80" src="https://img.freepik.com/free-vector/happy-friend-sitting-talking-each-other-laptop_1308-97730.jpg?w=740&t=st=1701962964~exp=1701963564~hmac=d80109e0edbd4a4788ac3d418dfc4b1ecfc205b3d9f551b3882040c83aa62502" alt="" />

      <div class="flex flex-col justify-around">
        <span class="text-2xl font-semibold"> Join our team </span>
        <p class="w-60 text-lg">Be part of a community that's passionate about books and connecting readers.</p>
        <button class="rounded-lg border-2 bg-black p-2 text-sm font-medium text-white">Join us</button>
      </div>
    </div>
    <hr class="mx-16 my-4 mb-10" />
    <Footer/>
    </>
    
  );
}

export default Home ; 