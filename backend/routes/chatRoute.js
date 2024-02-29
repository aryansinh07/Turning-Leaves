const express = require("express"); 
const { findChat , createChat , userChats} = require('../controllers/chatController');
const chatRouter = express.Router(); 
chatRouter.post("/", createChat);
chatRouter.get("/:userId", userChats);
chatRouter.get("/find/:firstId/:secondId", findChat);

module.exports =  chatRouter ; 