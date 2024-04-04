const mongoose = require("mongoose"); 
const { appErr } = require("../utilis/appErr");

const dbConfig = async (next) => {
    try {
        await mongoose.connect("mongodb+srv://saryan72881:fKDnaLGm716R8eC6@cluster0.fszs9rb.mongodb.net/online-book-thrift-store?retryWrites=true&w=majority"); 
        console.log("Database connected Successfully"); 
    } catch (error) {
        console.log(error); 
    }
}

dbConfig() ; 

module.exports = dbConfig ; 
