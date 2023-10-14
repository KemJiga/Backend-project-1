const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: [true, "Order must belong to a user"],
        validate: {
          async validator(userId) {
            const user = await mongoose.model('Users').findById(userId);
            if (!user) {
              throw new Error('User not found');
            }
          },
        },
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'restaurants',
        required: [true, "Order must belong to a restaurant"],
        validate: {
          async validator(restaurantId) {
            const restaurant = await mongoose.model('Restaurants').findById(restaurantId);
            if (!restaurant) {
              throw new Error('Restaurant not found');
            }
          },
        },
    },
    products: {
        type: Map,
        of: Schema.Types.ObjectId,
        ref: 'products',
        required: [true, "Order must have products"],
        validate: {
          async validator(productId) {
            const product = await mongoose.model('Products').findById(productId);
            if (!product) {
              throw new Error('Product not found');
            }
          },
        },
    },
    status: {
        type: String,
        enum: ['Created', 'Recieved', 'Sended','Delivered'],
        required: [true, "Order must have a status"],
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
    deliveredAt:{
        type: Date,
        default: null,
    },
});

module.exports = mongoose.model('Orders', orderSchema);