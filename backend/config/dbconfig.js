const mongoose = require("mongoose"); 
const { appErr } = require("../utilis/appErr");

const dbConfig = async (next) => {
    try {
        await mongoose.connect(process.env.DatabaseUrl); 
        console.log("Database connected Successfully"); 
    } catch (error) {
        console.log(error); 
    }
}

dbConfig() ; 

module.exports = dbConfig ; 
