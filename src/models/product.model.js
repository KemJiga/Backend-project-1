const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
    },
    ID:{
        type: Number,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        enum: ['Food', 'Drink', 'Dessert'],
        default: 'Food',
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

module.exports = mongoose.model('Products', productSchema);
