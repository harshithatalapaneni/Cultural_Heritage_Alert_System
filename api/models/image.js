const mongoose = require('mongoose');

const imageMessageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  imageUrl: {
    type: String,
    required: true, // Ensure that the image URL is provided
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
  // Optionally, you can add other fields like message type or status
  messageType: {
    type: String,
    default: 'image', // To indicate the type of message
  },
});

const ImageMessage = mongoose.model("ImageMessage", imageMessageSchema);

module.exports = ImageMessage;
