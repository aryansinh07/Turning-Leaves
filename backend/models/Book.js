const mongoose = require("mongoose"); 

const bookSchema = new mongoose.Schema({
    title:{
        type:String , 
        required: true
    }, 
    author:{
        type:String, 
        required: true
    },
    description:{
        type:String, 
        required: true
    }, 
    condition:{
        type:String, 
        enum:['Excellent','Fair','Good']
    }, 
    price:{
        type:Number,
        required: true 
    },
    images:[{
        type:String, 
        default: null 
    }],
    tags:{
        type: String,
    },
    seller:{
                type:mongoose.Schema.Types.ObjectId, 
                ref:'User'
    },
},{
    timestamps:true , 
    toJSON :{ virtuals:true},
}); 

const Book = mongoose.model("Book",bookSchema); 
module.exports = Book ; 

// Reviews (references to reviews left by this user)
// Listings (references to book listings by this user)