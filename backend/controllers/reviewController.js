const Review = require("../models/Review");
const User = require("../models/User");
const { appErr } = require("../utilis/appErr");

const postReviewCtrl = async(req,res,next) =>{
    const {rating , reviewText , reviewerName , reviewerProfilePicture } = req.body ; 
    try {
        const reviewposted = await Review.create({
            reviewer:req.user , 
            reviewedUser: req.params.id ,
            reviewerName , 
            reviewerProfilePicture , 
            rating , 
            reviewText 
        }); 
        const userreviewed = await User.findById(req.params.id); 
        userreviewed.review.push(reviewposted); 
        await userreviewed.save() ; 
        return res.json({msg:"User Review Process Successfull",reviewposted}); 

    } catch (error) {
        return next(appErr(error.message,404)); 
    }
}

const fetchReviewsCtrl = async(req,res,next) =>{
    try {
        const reviews = await Review.find() ; 
        return res.json({msg:"All reviews fetched Successfully",reviews}); 
    } catch (error) {
        return next(appErr(error.message,404)); 
    }
}

const fetchSingleReviewCtrl = async(req,res,next) =>{
    try {
        const review = await Review.findById(req.params.id); 
        return res.json({msg:" Review fetched Successfully",review}); 
    } catch (error) {
        return next(appErr(error.message,404)); 
    }
}

const deleteSingleReviewCtrl = async(req,res,next) =>{
    try {
        const reviewfound = await Review.findById(req.params.id); 
        console.log(`The user reviewed is ${reviewfound.reviewedUser}`)
        const reviewedUser = await Review.findById(reviewfound.reviewedUser).populate('review'); 
        if(reviewfound.reviewer == req.user)
        {
            await reviewfound.deleteOne() ; 
        }
        else
        {
            return next(appErr("You are not authorized to delete this review",404)); 
        }
        console.log(reviewedUser); 
        const index = reviewedUser.review.indexOf(req.params.id); 
        if (index !== -1) {
             reviewedUser.review.splice(index, 1);
        }
        return res.json({msg:" Review deleted Successfully",data:null}); 
    } catch (error) {
        return next(appErr(error.message,404)); 
    }
}



module.exports =
{ postReviewCtrl , fetchReviewsCtrl , fetchSingleReviewCtrl , deleteSingleReviewCtrl} ; 