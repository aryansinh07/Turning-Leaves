const mongoose = require("mongoose"); 

const userSchema = new mongoose.Schema({
    name:{
        type:String , 
        required: true
    }, 
    email:{
        type:String, 
        required: true
    },
    password:{
        type:String, 
        required: true
    }, 
    location: {
        type: String,  
        default: null, 
      },
    bio:{
        type:String, 
        required: true
    }, 
    profilePicture:{
        type:String, 
        default: null 
    },
    listings:[{
          type: mongoose.Schema.Types.ObjectId , 
          ref:'Book'
    }],
    review:[
        {
            type: mongoose.Schema.Types.ObjectId , 
            ref:'Review'
        }
    ], 
    wishlist:[
        {
            type:mongoose.Schema.Types.ObjectId , 
            ref: 'Book'
        }
    ],

},{
    timestamps:true , 
    toJSON :{ virtuals:true},
}); 

const User = mongoose.model("User",userSchema); 
module.exports = User ; 
