import React, { useState , useContext, useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { bookContext } from './context/bookContext/bookContext' 
import FAQ from './FAQ'
import krishna from "../assets/krishna.png"
import omsingh from "../assets/omSingh.jpeg" ; 
import aryan from "../assets/aryan.png"
import img1 from "../assets/man with laptop.png" ; 
import step1 from "../assets/step 1.png" ; 
import img3 from "../assets/man in library.png" ; 
import img2 from "../assets/step 2.png" ; 
import seller from "../assets/as a seller.png" ; 
import buyer from "../assets/buyer.png" ; 
import team from "../assets/join our team.png" ; 

const Home = () => {

  const { searchBookAction } = useContext(bookContext); 
  const [formData , setBookName] = useState({
    bookName:""
  })
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [loading , setLoading] = useState(false) ; 
  
  const {bookName} = formData ; 
  
   

  const cardsData = [
    {
      imageSrc: 'https://img.freepik.com/free-vector/watercolor-family-moments-illustration_23-2150202482.jpg?t=st=1709738321~exp=1709741921~hmac=395067e4aa1b7d65137be24f9fe518ce50fb54c9c827999de0f7da05d1927ded&w=740',
      title: 'Unlock the Treasure Trove of Knowledge!',
      content: "Dive into a world of endless possibilities with Turning Leaves! Discover rare finds and hidden gems as you explore our vast collection of pre-loved books. Whether you're searching for a captivating novel, an insightful biography, or a practical guide, find your next literary adventure right here. Join our community of book enthusiasts today!"},
    {
      imageSrc: 'https://img.freepik.com/premium-photo/ai-generated-illustration-two-cute-cartoon-siblings-reading-books-together_665346-43141.jpg?w=740',
      title: 'Connect, Browse, and Transact Seamlessly!',
      content: "Experience the future of book trading with Turning Leaves. Say goodbye to intermediaries and hello to direct interactions! Browse through a diverse range of categories, from fiction to non-fiction, mystery to self-help, and everything in between. With our secure platform, you can connect with sellers, negotiate prices, and complete transactions hassle-free. Start your journey towards book bliss now!"},
    {
      imageSrc: 'https://img.freepik.com/free-vector/watercolor-poetry-illustration_23-2149300324.jpg?t=st=1709738552~exp=1709742152~hmac=8614bc776c816935597df0f7a8c886a0c00062e8994552ac565b039d7c42c0f4&w=740',
      title: "Your Passport to Book Lovers' Paradise!",
      content: "Welcome to Turning Leaves, where book lovers unite! Create your wishlist, explore curated recommendations, and embark on a journey of literary exploration. With verified user profiles and authentic reviews, you can trust our community to deliver quality reads every time. Whether you're buying, selling, or simply browsing, find your literary haven with us. Join Turning Leaves and let your reading adventures begin!"}
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentCardIndex(prevIndex => (prevIndex + 1) % cardsData.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const onChangeInput = (e) => {
    setBookName({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    setLoading(true); 
    e.preventDefault() ; 
    await searchBookAction(formData); 
    setLoading(false); 
  }

  document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll('.card');
    let currentCardIndex = 0;

    function showCard(index) {
        cards.forEach((card, i) => {
            if (i === index) {
                card.classList.add('active-card');
            } else {
                card.classList.remove('active-card');
            }
        });
    }

    function showNextCard() {
        currentCardIndex = (currentCardIndex + 1) % cards.length;
        showCard(currentCardIndex);
    }

    // Show the first card initially
    showCard(currentCardIndex);

    // Automatically transition to the next card after 3 seconds
    setInterval(() => {
        showNextCard();
    }, 3000);
});

    return (
    <>
    <Navbar/>
    <div class="mx-4  mt-40 mb-4 flex flex-col-reverse md:flex-row-reverse justify-center items-center md:mt-32 ">
  <div class="font-varela flex flex-col items-center text-center md:text-left md:items-start text-3xl md:text-5xl font-bold tracking-wide typing-animation">
    Discover the perfect <br />
    book for you !
  </div>
  <div class="h-36 md:h-48 w-48 md:w-60 mb-4 md:mb-0">
    <img src={img1} class="object-contain h-full w-full" />
  </div>
</div>

<div class="mx-4 my-4 flex flex-col md:flex-row items-center justify-center">
  <form onSubmit={onSubmitHandler} class="mb-4 md:mb-0"> 
    <input onChange={onChangeInput} class="my-2 rounded-lg bg-gray-100 p-2 px-4 md:px-28 text-center font-mono w-full md:w-auto" type="text" name="bookName" placeholder="Search for Books" value={bookName} />
    <button disabled={loading} class="rounded-lg border-2 bg-gray-800 hover:bg-black p-2 px-6 text-sm font-medium text-white w-full md:w-auto" type='submit'>{loading ? 'Searching...':'Search'}</button>
  </form>
</div>


<div className="mx-16 my-16  hidden md:flex justify-center">
    {/* Display only the active card */}
    <div className="active-card card transition-transform duration-300 ease-in-out transform hover:scale-105 h-[300px] border-[#0c7d9d] flex flex-col md:flex-row border rounded-md shadow-md " > {/* Adjust the height as needed */}
        <div className="image-container"> 
            <img src={cardsData[currentCardIndex].imageSrc} alt="" className='md:h-[300px] md:w-[300px] overflow-hidden' /> 
        </div>
        <div className="content-container flex flex-col justify-center md:w-[700px]">
            <h2 className="text-2xl font-bold p-4">{cardsData[currentCardIndex].title}</h2>
            <p className="text-justify font-varela p-4">{cardsData[currentCardIndex].content}</p>
        </div>
    </div>
</div>

<div class="container mx-auto my-16 px-4">
  <div class="flex flex-col md:flex-row justify-between mb-4 space-x-0 md:space-x-3">
    <div class="w-full md:w-1/3 border font-varela bg-lime-100 p-8 rounded-lg mb-4 md:mb-0 ease-in-out transform hover:scale-105 duration-300">
    <h2 class="text-xl font-bold mb-4">Fully Customizable</h2>
      <p>Tailor your reading experience with Turning Leaves. Customize genres, preferences, and recommendations for a personalized journey through literature.</p>
    </div>

    <div class="w-full md:w-1/3 border font-varela bg-blue-100 p-8 rounded-lg mb-4 md:mb-0 ease-in-out transform hover:scale-105 duration-300">
    <h2 class="text-xl font-bold mb-4">Secure by Default</h2>
      <p>Enjoy peace of mind with Turning Leaves' built-in security features. Your data and transactions are safeguarded from start to finish.</p>
    </div>

    <div class="w-full md:w-1/3 border font-varela bg-yellow-100 p-8 rounded-lg mb-4 md:mb-0 ease-in-out transform hover:scale-105 duration-300">
    <h2 class="text-xl font-bold mb-4">Faster Than Light</h2>
      <p>Explore books at the speed of thought with Turning Leaves. Our intuitive interface and lightning-fast search functionality deliver instant access to your next literary adventure.</p>
    </div>
 </div>

  <div class="flex flex-col md:flex-row justify-between space-x-0 md:space-x-3">

    <div class="w-full md:w-1/2 border font-varela p-8 bg-orange-100 rounded-lg mb-4 md:mb-0 ease-in-out transform hover:scale-105 duration-300">
    <h2 class="text-xl font-bold mb-4">Effortless Exploration</h2>
      <p>Dive into a world of endless possibilities with Turning Leaves. Our platform offers seamless navigation and intuitive features, making it easy to discover new authors, genres, and titles.</p>
    </div>

    <div class="w-full md:w-1/2 border font-varela p-8 bg-green-100 rounded-lg mb-4 md:mb-0 ease-in-out transform hover:scale-105 duration-300">
    <h2 class="text-xl font-bold mb-4">Safe and Sound</h2>
      <p>Protect your loved ones with Turning Leaves. Our curated selections and parental controls provide a safe and enriching reading environment, ensuring a worry-free experience for readers of all ages.</p>
    </div>
    
  </div>
</div>

<hr class="mx-16" />
<div class="mx-16 my-4 font-bold tracking-normal">How it Works</div>
<hr class="mx-16" />

<div class="guide mx-16 flex flex-col md:flex-row">
  <div class="flex flex-col border-b md:border-r mb-4 md:mb-0">
        <img class="h-52 w-80" src={step1} />
        <span class="mx-2 font-semibold"> Step1 </span>
        <p class="mx-2 mb-8 mt-2 text-lg font-normal">Enter your search criteria. Type in the book title, author, or ISBN to find the books you're looking for.</p>
  </div>

  <div class="flex flex-col border-b md:border-r mb-4 md:mb-0">
        <img class="h-52 w-80" src={img2} />
        <span class="mx-2 font-semibold"> Step2 </span>
        <p class="mx-2 mb-8 mt-2 text-lg font-normal">Browse and select your desired book. You're one step closer to finding the perfect read.</p>
  </div>

  <div class="flex flex-col border-b md:border-r mb-4 md:mb-0">
        <img class="h-52 w-80" src={img3} />
        <span class="mx-2 font-semibold"> Step3 </span>
        <p class="mx-2 mb-8 mt-2 text-lg">Complete your purchase by contacting and collaborating with the seller !</p>
  </div>
  
</div>

<hr class="mx-16 mb-4" />
<div class="mx-16 my-4 font-bold tracking-normal">Sell it with Online Book Thrift Store</div>
<hr class="mx-16 mb-4" />

<div class="mx-4 flex flex-col md:flex-row justify-around items-center mb-4">
  <img class="h-60 md:h-80 w-full md:w-80 mb-4 md:mb-0" src={seller} alt="" />
  <div class="flex flex-col justify-around">
        <span class="text-2xl font-semibold"> As a Seller </span>
        <p class="w-60 text-lg">Earn money by selling your used books. All you need is a book and an account with us.</p>
        <button class="rounded-lg border-2 bg-black p-2 text-sm font-medium text-white">Sell with us</button>
  </div>
</div>

<hr class="mx-16 my-4" />

<div class="mx-4 flex flex-col md:flex-row justify-around items-center mb-4">
  <img class="h-60 md:h-80 w-full md:w-80 mb-4 md:mb-0" src={buyer} alt="" />
  <div class="flex flex-col justify-around">
        <span class="text-2xl font-semibold"> As a Buyer </span>
        <p class="w-60 text-lg">Online Book Thrift Store offers a wide selection of used books, with detailed information and secure checkout.</p>
        <button class="rounded-lg border-2 bg-black p-2 text-sm font-medium text-white">Buy with us</button>
  </div>
</div>

<hr class="mx-16 my-4" />

<div class="mx-4 flex flex-col md:flex-row justify-around items-center mb-4">
  <img class="h-60 md:h-80 w-full md:w-80 mb-4 md:mb-0" src={team} alt="" />
  <div class="flex flex-col justify-around">
        <span class="text-2xl font-semibold"> Join our team </span>
        <p class="w-60 text-lg">Be part of a community that's passionate about books and connecting readers.</p>
        <button class="rounded-lg border-2 bg-black p-2 text-sm font-medium text-white">Join us</button>
  </div>
</div>

<h2 className=' font-varela font-[500]  text-center text-4xl my-16 mt-32' >Loved By the community</h2>

<section class="mx-4 mb-16 mt-16 flex flex-col md:flex-row space-x-0 md:space-x-4">
  <div class="w-full md:w-[1/3] flex flex-col space-y-3 mb-4 md:mb-0">
    <div class="flex flex-row rounded-2xl border border-blue-200">
      <img class="m-2 h-10 w-10 rounded-full object-cover" alt="John Doe" src="https://randomuser.me/api/portraits/men/1.jpg" loading="lazy" width="120" height="120" />
      <div class="m-2">
        <h2 class="font-medium">Aryan Singh</h2>
        <p class="text-gray-700">Turning Leaves is an excellent platform for book lovers like me. I found some rare gems here!</p>
      </div>
    </div>
    <div class="flex flex-row rounded-2xl border border-green-200">
      <img class="m-2 h-10 w-10 rounded-full object-cover" alt="John Doe" src="https://randomuser.me/api/portraits/men/6.jpg" loading="lazy" width="120" height="120" />
      <div class="m-2">
        <h2 class="font-medium">Shivam Dubey</h2>
        <p class="text-gray-700">I absolutely love Turning Leaves! It's my go-to place for finding the best deals on books.Turning Leaves has a vast collection of books catering to all interests. It's my favorite online bookstore!</p>
      </div>
    </div>
    <div class="flex flex-row rounded-2xl border border-orange-200">
      <img class="m-2 h-10 w-10 rounded-full object-cover" alt="John Doe" src="https://randomuser.me/api/portraits/men/3.jpg" loading="lazy" width="120" height="120" />
      <div class="m-2">
        <h2 class="font-medium">Aayush Upadhyay</h2>
        <p class="text-gray-700">I've had a wonderful experience using Turning Leaves. The process is smooth, and the prices are unbeatable!</p>
      </div>
    </div>
  </div>
  <div class="w-full md:w-[1/3] flex flex-col space-y-3 mb-4 md:mb-0">
    <div class="flex flex-row rounded-2xl border border-purple-200">
      <img class="m-2 h-10 w-10 rounded-full object-cover" alt="John Doe" src="https://randomuser.me/api/portraits/men/4.jpg" loading="lazy" width="120" height="120" />
      <div class="m-2">
        <h2 class="font-medium">Sumit Upadhyay</h2>
        <p class="text-gray-700">Turning Leaves is my go-to destination for all my literary needs. With its vast selection of books and user-friendly interface, finding and purchasing books has never been easier. The website's prompt delivery ensures that I receive my orders in perfect condition every time.</p>
      </div>
    </div>
    <div class="flex flex-row rounded-2xl border border-lime-200">
      <img class="m-2 h-10 w-10 rounded-full object-cover" alt="John Doe" src="https://randomuser.me/api/portraits/men/5.jpg" loading="lazy" width="120" height="120" />
      <div class="m-2">
        <h2 class="font-medium">Om Singh</h2>
        <p class="text-gray-700">Discovering Turning Leaves has been a game-changer for me as a book lover. The platform's extensive collection of books, ranging from classics to contemporary bestsellers, never fails to impress. Navigating through the website is a breeze, thanks to its intuitive interface. The customer support team is exceptional, always ready to assist with any inquiries.</p>
      </div>
    </div>
  </div>
  <div class="w-full md:w-[1/3] flex flex-col space-y-3">
    <div class="flex flex-row rounded-2xl border border-red-200">
      <img class="m-2 h-10 w-10 rounded-full object-cover" alt="John Doe" src="https://randomuser.me/api/portraits/men/7.jpg" loading="lazy" width="120" height="120" />
      <div class="m-2">
        <h2 class="font-medium">Vishal Gupta</h2>
        <p class="text-gray-700">I stumbled upon Turning Leaves while searching for a rare book, and I couldn't be happier with my discovery. The website's intuitive interface made it a breeze to find what I was looking for, and the checkout process was smooth and hassle-free.</p>
      </div>
    </div>
    <div class="flex flex-row rounded-2xl border">
      <img class="m-2 h-10 w-10 rounded-full object-cover" alt="John Doe" src="https://randomuser.me/api/portraits/men/8.jpg" loading="lazy" width="120" height="120" />
      <div class="m-2">
        <h2 class="font-medium">Raghav Singh</h2>
        <p class="text-gray-700">As an avid reader, I'm always on the lookout for new books to add to my collection, and Turning Leaves has become my one-stop shop for all my literary needs.</p>
      </div>
    </div>
    <div class="flex flex-row rounded-2xl border border-pink-200">
      <img class="m-2 h-10 w-10 rounded-full object-cover" alt="John Doe" src="https://randomuser.me/api/portraits/men/2.jpg" loading="lazy" width="120" height="120" />
      <div class="m-2">
        <h2 class="font-medium">Krishna Mistry</h2>
        <p class="text-gray-700">The platform's vast selection of books, ranging from classics to contemporary bestsellers, never fails to impress me.The website's user-friendly interface makes browsing and purchasing books a seamless experience, and the prices are unbeatable.</p>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="font-varela font-[500] text-center text-4xl my-16 mt-32">
    We started with a single goal empower Book Readers
  </div>
  <div class="flex flex-col md:flex-row justify-center mx-4 space-x-0 md:space-x-2">
    <div class="w-full md:w-[1/2] flex flex-col space-y-2 mb-4 md:mb-0">
      <div class="image1 ease-in-out transform hover:scale-105 duration-300">
        <img src="https://img.freepik.com/free-photo/smiling-teenager-reading-cafe_23-2147860713.jpg?t=st=1709788417~exp=1709792017~hmac=712c3f6638724a79a2aa5b851cd69e756ad79ca0453ec066eab9c950a53eac8b&w=360" alt="" class="rounded-2xl h-auto w-full  " />
      </div>
      <div class="image2 ease-in-out transform hover:scale-105 duration-300">
        <img src="https://img.freepik.com/free-photo/full-shot-woman-with-cup-book_23-2148294074.jpg?t=st=1709788330~exp=1709791930~hmac=7951ead8829183ff217cad5d62c2e27a27a55d3324a125c72712dfe36f7c2aea&w=360" alt="" class="rounded-2xl h-auto w-full" />
      </div>
    </div>
    <div class="w-full md:w-[1/2] flex flex-col space-y-2">
      <div class="image3 ease-in-out transform hover:scale-105 duration-300">
        <img src="https://img.freepik.com/free-photo/medium-shot-man-reading-home_23-2149879774.jpg?t=st=1709788770~exp=1709792370~hmac=6c962959abc5a446c3ed68d0940dab9011c1e7e8c84ee607a014f7a22502382f&w=360" alt="" class="rounded-2xl h-auto w-full" />
      </div>
      <div class="image3 ease-in-out transform hover:scale-105 duration-300">
        <img src="https://img.freepik.com/free-photo/man-reading-interesting-book-bench_23-2148873081.jpg?t=st=1709788887~exp=1709792487~hmac=0fa7635df47ce4deb2862ff158c3bdb09fb0e1a77c7cc4436527d0b763134f5d&w=360" alt="" class="rounded-2xl h-auto w-full" />
      </div>
    </div>
  </div>
</section>

<section class="my-16 mx-4">
  <div>
    <h2 class="font-[500] text-center text-4xl my-16 mt-32">This is who we are</h2>
  </div>
  <div class="flex flex-col md:flex-row justify-center space-x-0 md:space-x-10">
    <div class="ease-in-out transform hover:scale-105 duration-300 mb-4 md:mb-0">
      <div class="flex justify-center items-center">
        <img src={aryan} alt="" class="h-32 w-32 rounded-full" />
      </div>
      <div class="flex justify-center flex-col items-center shadow-xl rounded-lg p-4 md:p-12">
        <h2 class="font-medium text-xl">Aryan Singh</h2>
        <h2 class="text-gray-700">Co-founder & COO</h2>
      </div>
    </div>
    <div class="ease-in-out transform hover:scale-105 duration-300 mb-4 md:mb-0">
      <div class="flex justify-center items-center">
        <img src={omsingh} alt="" class="h-32 w-32 rounded-full" />
      </div>
      <div class="flex justify-center flex-col items-center shadow-xl rounded-lg p-4 md:p-12">
        <h2 class="font-medium text-xl">Om Singh</h2>
        <h2 class="text-gray-700">Head of Infrastructure & CEO</h2>
      </div>
    </div>
    <div class="ease-in-out transform hover:scale-105 duration-300">
      <div class="flex justify-center items-center">
        <img src={krishna} alt="" class="h-32 w-32 rounded-full" />
      </div>
      <div class="flex justify-center flex-col items-center shadow-xl rounded-lg p-4 md:p-12">
        <h2 class="font-medium text-xl">Krishna Mistry</h2>
        <h2 class="text-gray-700">Head of People & HR</h2>
      </div>
    </div>
  </div>
</section>
<FAQ/>







    <Footer/>
    </>
    
  );
}

export default Home ; 