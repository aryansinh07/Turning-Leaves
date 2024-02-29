const express = require("express"); 
const isLogin = require("../middlewares/isLogin"); 
const { postReviewCtrl , fetchReviewsCtrl , fetchSingleReviewCtrl , deleteSingleReviewCtrl } = require("../controllers/reviewController");

const reviewRoute = express.Router() ; 

reviewRoute.post("/:id", isLogin , postReviewCtrl); 

reviewRoute.get("" , fetchReviewsCtrl);

reviewRoute.get("/:id" , fetchSingleReviewCtrl);

reviewRoute.delete("/delete/:id", isLogin,  deleteSingleReviewCtrl); 


module.exports = reviewRoute ; 