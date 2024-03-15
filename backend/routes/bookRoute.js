const express = require("express"); 
const isLogin = require("../middlewares/isLogin");
const multer = require("multer"); 
const storage = require("../config/cloudinary"); 
const { postBookCtrl , fetchAllBookCtrl , fetchSingleBookDetailCtrl , bookUpdateCtrl , bookDeleteCtrl, addBookWishlist, bookImageUpload , searchBooksCtrl , fetchBookByCategory } = require("../controllers/bookController");


const bookRoute = express.Router() ;

const upload = multer({storage}); 

bookRoute.post("/post", isLogin  ,  postBookCtrl); 
bookRoute.get("",  fetchAllBookCtrl); 
bookRoute.get("/:id", fetchSingleBookDetailCtrl); 
bookRoute.put("/update-book/:id", isLogin , bookUpdateCtrl); 
bookRoute.delete("/:id", isLogin , bookDeleteCtrl); 
bookRoute.post("/addwishlist/:id", isLogin , addBookWishlist); 
bookRoute.put("/upload-book-images/:id", isLogin , upload.array('images',5) , bookImageUpload );
bookRoute.post("/search-books",searchBooksCtrl) ;  
bookRoute.get("/category/:category",fetchBookByCategory); 



module.exports = bookRoute ; 