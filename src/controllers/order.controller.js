const Order = require('../models/order.model');

async function createOrder(req, res){
    const { user, restaurant, products, status } = req.body;
    try{
        const newOrder = new Order({ user, restaurant, products: new Map(products), status });
        await newOrder.save();
        res.status(201).json(newOrder);
        console.log('order added');
    }catch(e){
        res.status(500).json({ error: e.message });
    }
}

module.exports = { createOrder };