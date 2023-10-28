const Order = require('../models/order.model');
const Restaurant = require('../models/restaurant.model');
const Product = require('../models/product.model');

async function createOrder(req, res) {
  var total = 0;
  const { user, restaurant, products } = req.body;
  const update = { $inc: { popularity: 1 }, updatedAt: Date.now() };
  try {
    const rest = await Restaurant.findByIdAndUpdate(restaurant, update);
    if (rest === null || rest.length === 0) {
      res.status(404).json({ error: 'Restaurant not found' });
    } else {
      await Promise.all(products.map(async (p) => {
        try {
          const orderProduct = await Product.findById(p[0]);
          total += orderProduct.price * p[1];
        } catch (e) {
          res.status(500).json({ error: e.message });
        }
        console.log(total);  
      }));
      console.log('final '+total);
      const newOrder = new Order({
        user,
        restaurant,
        products: new Map(products),
        total,
        status: 'Created',
      });
      await newOrder.save();
      res.status(201).json(newOrder);
      console.log('order added');
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getOrderById(req, res) {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (order.length === 0 || order.deletedAt !== null) {
      res.status(404).json({ error: 'Order not found' });
    } else {
      res.status(200).json(order);
      console.log('Order displayed');
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getCreatedOrders(req, res) {
  try {
    const orders = await Order.find({ status: 'Created', deletedAt: null });
    if (orders.length === 0) {
      res.status(404).json({ error: 'Order not found' });
    } else {
      res.status(200).json(orders);
      console.log('Order displayed');
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getFilteredOrders(req, res) {
  const { user, restaurant, status, startDate, finishDate } = req.query;
  const query = { deletedAt: null };
  if (user) query.user = user;
  if (restaurant) query.restaurant = restaurant;
  if (status) query.status = status;
  if (startDate && finishDate) query.createdAt = { $gte: startDate, $lte: finishDate };
  console.log(query);
  try {
    const orders = await Order.find(query);
    if (orders.length === 0) {
      res.status(404).json({ error: 'Order not found' });
    } else {
      res.status(200).json(orders);
      console.log('Order displayed');
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function updateOrder(req, res) {
  const { id } = req.params;
  const { products, status } = req.body;
  try {
    const order = await Order.findById(id);
    if (order.length === 0 || order.deletedAt !== null) {
      res.status(404).json({ error: 'Order not found' });
    } else {
      if (order.status !== 'Sended' && order.status != 'Delivered') {
        const updatedOrder = await Order.findByIdAndUpdate(id, { products, status }, { new: true });
        res.status(200).json(updatedOrder);
        console.log('Order updated');
      } else {
        res.status(400).json({ error: 'Order can not be updated' });
      }
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function deleteOrder(req, res) {
  const { id } = req.params;
  const update = { deletedAt: Date.now(), updatedAt: Date.now() };
  try {
    const deletedOrder = await Order.findOneAndUpdate({ _id: id, deletedAt: null }, update, {
      new: true,
    });
    if (deletedOrder === null || deletedOrder.length === 0) {
      res.status(404).json({ error: 'Order not found' });
    } else {
      res.status(200).json(deletedOrder);
      console.log('Order deleted');
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = {
  createOrder,
  getOrderById,
  getCreatedOrders,
  getFilteredOrders,
  updateOrder,
  deleteOrder,
};
