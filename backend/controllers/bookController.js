const Book = require("../models/Book");
const User = require("../models/User");
const { appErr } = require("../utilis/appErr");

const postBookCtrl = async (req,res,next) =>{
    const {title , author , description , condition , price , category , seller} = req.body  ; 
    try {
        
        const bookposted = await Book.create({
            title , 
            author , 
            description , 
            condition , 
            price, 
            category, 
            seller
        }); 
        console.log(bookposted); 
        const userFound = await User.findById(seller); 
        console.log(userFound); 
        userFound.listings.push(bookposted._id); 
        await userFound.save() ; 
        return res.json({status:"success", bookposted}); 

        
    } catch (error) {
        return next(appErr(error.message,404)); 
    }
}

const fetchAllBookCtrl = async(req,res,next) => {
    try {
        const books = await Book.find() ; 
        return res.json({status:"success",books}); 
    } catch (error) {
        return next(appErr(error.message,404)); 
    }
}

const fetchSingleBookDetailCtrl = async(req,res,next) =>{
    try {
        const bookfound = await Book.findById(req.params.id) ; 
        if(!bookfound)
        {
            return next(appErr("Book Does not Exist",404)); 
        }
        return res.json({status:"success",bookfound}); 
    } catch (error) {
        return next(appErr(error.message,404));
    }
}

const bookUpdateCtrl = async(req,res,next) =>{
    try {
        const bookupdateddata = await Book.findByIdAndUpdate(req.params.id,req.body,{
            new: true , 
            runValidators : true , 
        }); 
        res.json({status:"success", bookupdateddata}); 
    } catch (error) {
        return next(appErr(error.message,404));
    }
}

const bookDeleteCtrl = async (req, res, next) => {
    try {
      const bookId = req.params.id;
  
      // Find the book by ID
      const deletedBook = await Book.findByIdAndDelete(bookId);
  
      if (!deletedBook) {
        return res.status(404).json({
          status: 'fail',
          message: 'Book not found',
        });
      }
  
      const sellerId = deletedBook.seller; 
      await User.findByIdAndUpdate(
        sellerId,
        { $pull: { listings: bookId } },
        { new: true }
      );
  
      await User.updateMany(
        { wishlist: bookId },
        { $pull: { wishlist: bookId } }
      );
  
      return res.json({
        status: 'success',
        data: null,
      });

    } catch (error) {
      return next(appErr(error.message, 500)); 
    }
  };
  

  const addBookWishlist = async (req, res, next) => {
    try {
      const bookFound = await Book.findById(req.params.id);
  
      // Assuming user details are sent in the request body
      const { userId } = req.body;
      
      if (!userId) {
        return next(appErr("User ID is required", 400));
      }
  
      const user = await User.findById(userId);
      
      if (!user) {
        return next(appErr("User not found", 404));
      }
  
      user.wishlist.push(bookFound);
      await user.save();
  
      return res.json({
        status: "success",
        data: user,
      });
    } catch (error) {
      return next(appErr(error.message, 404));
    }
  };
  

const bookImageUpload = async (req, res, next) => {
    try {
        const bookId = req.params.id;
        const bookFound = await Book.findById(bookId);
        console.log(req); 
        if (!req.files || req.files.length === 0) {
            return next(appErr("Please upload at least one image", 404));
        }

        // Assuming you want to add the new images to the existing array
        const newImages = req.files.map(file => file.path);
        const updatedImages = [...bookFound.images, ...newImages];

        const updatedBook = await Book.findByIdAndUpdate(bookId, {
            images: updatedImages,
        }, {
            new: true,
        });

        return res.json({
            status:"success",
            data: updatedBook,
        });
    } catch (error) {
        return next(appErr(error.message));
    }
};

const searchBooksCtrl = async(req,res, next) => {
  try {
    const {bookName} = req.body ; 
    const bookFound = await Book.find({ 'title': { $regex: new RegExp(bookName, 'i') } });
    res.json({
      status:"success",
      data: bookFound
    }); 

  } catch (error) {
    next(appErr(error)); 
  }
}

const fetchBookByCategory = async (req, res, next) => {
  try {
    const category = req.params.category; 
    const bookFound = await Book.find({ category: { $in: [category] } });
    return res.json({ status: "success", bookFound });
  } catch (error) {
    return next(appErr(error.message, 404));
  }
};




module.exports = {
    postBookCtrl , 
    fetchAllBookCtrl, 
    fetchSingleBookDetailCtrl , 
    bookUpdateCtrl, 
    bookDeleteCtrl,
    addBookWishlist,
    bookImageUpload,
    searchBooksCtrl,
    fetchBookByCategory,
}; 