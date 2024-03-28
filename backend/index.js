require("dotenv").config() ; 
const express = require("express"); 
const { createServer } = require('http');
const dbConfig = require("./config/dbconfig");
const userRoute = require("./routes/userRoute"); 
const bookRoute = require("./routes/bookRoute");
const reviewRoute = require("./routes/reviewRoute");
const cors = require("cors"); 
const chatRouter = require("./routes/chatRoute");
const messageRouter = require("./routes/messageRoute");

const app = express() ; 

app.use(express.json()); 

app.use(cors()); 



app.use(express.static(__dirname + "/public")); 

//Routes 

//Users 



app.get("/",(req,res)=>{
     res.send({
        "msg":"Welcome to my API"
    }); 
}); 

app.use('/api/v1/users',userRoute); 

app.use('/api/v1/books',bookRoute); 

app.use('/api/v1/review',reviewRoute);

app.use('/api/v1/chat',chatRouter); 

app.use('/api/v1/message',messageRouter); 


const PORT = process.env.PORT || 7000 ; 

app.listen(PORT , ()=>{
    console.log(`Server is up and running on the port no ${PORT}`)
}); 

  
