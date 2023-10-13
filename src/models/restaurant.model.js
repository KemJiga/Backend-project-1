const mongoose = require('mongoose');
const { Schema } = mongoose;

const restaurantSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Name is required"],
    },
    category: {
        type: String,
        enum: ['Regular', 'Fast', 'Gourmet'],
        required: [true, "Category is required"],
    },
    createdAt: {
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

module.exports = mongoose.model('Restaurants', restaurantSchema);