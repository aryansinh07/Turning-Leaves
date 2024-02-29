const express = require("express"); 
const User = require("../models/User");
const bcryptjs = require("bcryptjs"); 
const { appErr } = require("../utilis/appErr");
const generateToken = require("../utilis/generateToken");

const userRegisterCtrl = async (req,res,next) => {
    const {name , email , password , bio } = req.body ; 
    try {
        
        if(!name || !email || !password ||!bio)
        { 
            return next(appErr("All fields are mandatory",404)) ; 
        }
        const emailExist = await User.findOne({email}); 
        if(emailExist)
        {
            next(appErr("User Already Exsit",404)); 
        }
        const salt = await bcryptjs.genSalt(10); 
        const passwordHashed = await bcryptjs.hash(password,salt); 
        const userCreated = await User.create({
            name , 
            email , 
            password: passwordHashed,
            bio
        }); 
        return res.json({
            status:"success",
            userCreated
        }); 
        
    } catch (error) {
        return next(appErr(error.message,404)); 
    }
}

const userLoginCtrl = async (req,res,next)=>{
    const {email , password } = req.body ; 
    try {
        if(!email || !password)
        {
            return next(appErr("All fields are mandatory",404)) ; 
        }
        const userFound = await User.findOne({email}).populate('listings').populate('wishlist').populate('review'); 
        if(!userFound)
        {
            return next(appErr("Invalid Login Credentials",404)) ; 
        }
        const salt = await bcryptjs.genSalt(10); 
        const hashedPassword = await bcryptjs.hash(password,salt); 
        if(!(await bcryptjs.compare(password,hashedPassword)))
        {
            return next(appErr("Invalid Login Credentials",404)) ; 
        }
        return res.json({status:"success",
                         userFound,
                         token: generateToken(userFound._id),  
                        }); 
    } catch (error) {
        return next(appErr(error.message,404)); 
    }
}

const userProfileCtrl = async (req,res,next) => {
    try {
        const userfound = await User.findById(req.params.id).populate('listings').populate({ path: 'wishlist', model: 'Book'}).populate({path:'review', model:'Review'}); 
        if(!userfound)
        {
            return next(appErr("User Not Found",404)); 
        }
        res.json({
            status:"success" , 
            data: userfound
        })
    } catch (error) {
        return next(appErr(error.message,404)); 
    }
}

const fetchUsersCtrl = async(req,res,next) => {
    try {
        const users = await User.find().populate('listings'); 
        return res.json({
            status:"success",
            data: users
        })
    } catch (error) {
        return next(appErr(error.message,404)); 
    }
}

const userDeleteCtrl = async (req,res,next)=>{
    try {
        await User.findByIdAndDelete(req.user); 

        res.json({
            msg:"User deleted Successfully", 
            data: null , 
        }) 
    } catch (error) {
        return next(appErr(error.message,404)); 
    }
}

const profilePhotoCtrl = async (req, res , next) => {
    
    if(!req.file)
    {
      return next(appErr("Please upload the image",404)); 
    }
    try {
      const userId = req.user ; 
      const user = await User.findById(userId); 
      await User.findByIdAndUpdate(userId,{
        profilePicture: req.file.path 
      },{
        new: true 
      }); 
      return res.json({
        status:"success",
        data: user
      }) 
    } catch (error) {
      return next(appErr(error.message)); 
    }
  }

  const fetchUserBooksCtrl = async(req,res,next) => {
    try {
        const userid = req.params.id ; 
        const user = await User.findById(userid).populate('listings'); 
        const userBooks = user.listings ; 
        return res.json({
            status:"success",
            userBooks: userBooks 
        })
    } catch (error) {
        return next(appErr(error.message,404)); 
    }
}

const userProfileUpdateCtrl = async(req,res,next) => {
    const {name , email , bio , userId} = req.body ; 
    try {
     console.log(req.body); 
     const user = await User.findByIdAndUpdate(userId,{
        name , 
        email, 
        bio,
      },{
        new: true 
      }); 
      return res.json({
        status:"success",
        data: user
      })
    } catch (error) {
      return next(appErr("Update Failed",404)); 
    }   
}



module.exports = {
    userRegisterCtrl , 
    userLoginCtrl ,
    userProfileCtrl,
    fetchUsersCtrl, 
    userDeleteCtrl,
    profilePhotoCtrl, 
    fetchUserBooksCtrl,   
    userProfileUpdateCtrl,
}; 

