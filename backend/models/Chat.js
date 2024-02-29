const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
      ref: 'User'
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", ChatSchema);
module.exports = Chat;
