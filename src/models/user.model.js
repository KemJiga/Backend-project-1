const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  phone:{
    type: String,
    required: [true, 'Phone number is required'],
  },
  type: {
    type: String,
    enum: ['Restaurant admin', 'Delivery', 'Client'],
    required: [true, 'Type is required']
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
      type: Date,
      default: Date.now,
  },
  deletedAt: {
      type: Date,
      default: null,
  },
});

module.exports = mongoose.model('Users', userSchema);
