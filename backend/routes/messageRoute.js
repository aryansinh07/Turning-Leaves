const express = require("express"); 
const { addMessage, getMessages } = require('../controllers/messageController');

const messageRouter = express.Router();

messageRouter.post('/', addMessage);

messageRouter.get('/:chatId', getMessages);

module.exports = messageRouter ; 