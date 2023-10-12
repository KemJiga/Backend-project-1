const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  category: {
    type: String,
    enum: ['Food', 'Drink', 'Dessert'],
    default: 'Food',
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'restaurants',
    //required: [true, "Product must belong to a restaurant"],
    validate: {
      async validator(restaurantId) {
        const restaurant = await mongoose.model('restaurants').findById(restaurantId);
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
