import {BrowserRouter,Routes,Route} from "react-router-dom"  
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import SellBook from "./Components/SellBook";
import BuyBooks from "./Components/BuyBooks";
import Profile from "./Components/Profile";
import UploadBookImages from "./Components/UploadBookImages";
import BookDetails from "./Components/BookDetails";
import SellerProfile from "./Components/SellerProfile";
import DeleteBook from "./Components/DeleteBook";
import UploadProfilePicture from "./Components/UploadProfilePicture";
import UpdateUserInfo from "./Components/UpdateUserInfo";
import OTPverify from "./Components/context/otpverify";
import SearchedBooks from "./Components/SearchedBooks";
import Chat from "./Components/Chat/Chat";
import RateUser from "./Components/RateUser";
import EditBooks from "./Components/EditBooks";
import EmailSuccess from "./Components/EmailSuccess";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import FAQPAGE from "./Components/FAQPAGE";
import WishlistSuccess from "./Components/WishlistSuccess";
import ForgetPassword from "./Components/ForgetPassword";
import Users from "./Components/Users";



function App() {
  return (
    <div className="App">
     <BrowserRouter>
     
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/buy" element={<BuyBooks/>} />
      <Route path="/sell"  element={<SellBook/>}/>
      <Route path="/login" element={<Login/>}  />
      <Route path="/sign-up" element={<Register/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/upload-book-images/:id"  element={<UploadBookImages/>}     />
      <Route path="/book-details/:id"  element={<BookDetails/>}    />
      <Route path="/seller-profile/:id" element={<SellerProfile/>} />
      <Route path="/delete-book/:id"  element={<DeleteBook/>}    />
      <Route path="/upload-profile-picture"  element={<UploadProfilePicture/>}    />
      <Route path="/update-user-profile"  element={<UpdateUserInfo/>}    />
      <Route path="/otp-verification"  element={<OTPverify/>}/>
      <Route path="/search-books"  element={<SearchedBooks/>}/> 
      <Route path="/chat" element={<Chat/>}/>
      <Route path="/rate/:id" element={<RateUser/>}/>
      <Route path="/edit-book/:id" element={<EditBooks/>}/>
      <Route path="/email-verified-success" element={<EmailSuccess/>}/>
      <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
      <Route path="/faq" element={<FAQPAGE/>}/>
      <Route path="/book-added-wishlist-success" element={<WishlistSuccess/>}/>
      <Route path="/forget-password" element={<ForgetPassword/>}/>
      <Route path="/users" element={<Users/>}/>
     </Routes>
     </BrowserRouter>
    </div>

  );
}

export default App;
