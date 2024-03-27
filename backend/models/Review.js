const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
  reviewedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  reviewerName: {
    type: String
  },
  reviewerProfilePicture : {
    type: String
  },
  rating: {
    type: Number, 
    required: true,
    validate: {
        validator: function (value) {
          return value >= 1 && value <= 5;
        },
        message: 'Rating must be between 1 and 5.',
      },
  },
  reviewText: String, 
  date: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
