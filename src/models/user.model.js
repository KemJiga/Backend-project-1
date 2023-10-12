const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  ID:{
    type: Number,
    required: true,
    unique: true,
  },
  type: {
    type: [String],
    enum: ['Admin', 'Delivery', 'Customer'],
    default: ['Customer'],
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
      default: Date.now,
      default: null,
  },
});

module.exports = mongoose.model('Users', userSchema);
