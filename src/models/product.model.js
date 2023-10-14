const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    validate: {
      validator(description) {
        return description.length <= 150 && description.length >= 10;
      },
      message: '{VALUE} is not a valid description',
    }
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  category: {
    type: [String],
    required: [true, 'Category is required'],
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'restaurants',
    required: [true, "Product must belong to a restaurant"],
    validate: {
      async validator(restaurantId) {
        const restaurant = await mongoose.model('Restaurants').findById(restaurantId);
        if (!restaurant) {
          throw new Error('Restaurant not found');
        }
      },
    },
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

module.exports = mongoose.model('Products', productSchema);
