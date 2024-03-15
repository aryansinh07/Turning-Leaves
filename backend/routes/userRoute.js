const express = require("express"); 
const multer = require("multer"); 
const storage = require("../config/cloudinary"); 

const {userRegisterCtrl , userLoginCtrl , userProfileCtrl,  fetchUsersCtrl,  userDeleteCtrl , profilePhotoCtrl , fetchUserBooksCtrl, userProfileUpdateCtrl, userExistCtrl} = require("../controllers/userController") ; 
const isLogin = require("../middlewares/isLogin");

const userRoute = express.Router() ; 
const upload = multer({storage}); 

userRoute.post("/register",userRegisterCtrl); 

userRoute.post("/login",userLoginCtrl); 

userRoute.get("/:id", userProfileCtrl); 

userRoute.get("",fetchUsersCtrl); 

userRoute.get("/books/:id",fetchUserBooksCtrl); 

userRoute.delete('', isLogin ,  userDeleteCtrl);  

userRoute.put("/profile-photo-upload" , isLogin , upload.single('profilePicture') , profilePhotoCtrl); 

userRoute.put("/update-user-profile",isLogin , userProfileUpdateCtrl); 

userRoute.get("/email-exist/:email", userExistCtrl); 

module.exports = userRoute ; 