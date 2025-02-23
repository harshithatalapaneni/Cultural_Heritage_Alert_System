// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String,
//   },
//   requests: [
//     {
//       from: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true,
//       },
//       message: {
//         type: String,
//         required: true,
//       },
//       status: {
//         type: String,
//         enum: ['pending', 'accepted', 'rejected'],
//         default: 'pending',
//       },
//     },
//   ],
//   friends: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//     },
//   ],
// });

// const User = mongoose.model("User",userSchema);

// module.exports = User;
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: 'https://cdn-icons-png.flaticon.com/128/149/149071.png', // Optional default image
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // Restrict to specific roles
    default: 'user', // Default role is 'user'
  },
  requests: [
    {
      from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
      },
    },
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
