const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    //required: true,
  },
  ID:{
    type: Number,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ['Admin', 'Delivery', 'Customer'],
    default: 'Customer',
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Users', userSchema);
