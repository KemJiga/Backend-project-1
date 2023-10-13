const Product = require('../models/product.model');

async function createProduct(req, res) {
  const { name, price, category, restaurant } = req.body;
  try {
    const newProduct = new Product({ name, price, category, restaurant });
    await newProduct.save();
    res.status(201).json(newProduct);
    console.log('product added');
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getProductById(req, res) {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (product.length === 0) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.status(200).json(product);
      console.log('product displayed');
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

// Implement search by restaurant on model file
async function getProducts(req, res) {
  const { category, restaurant } = req.body;
  const query = {};
  if (category) query.category = category;
  if (restaurant) query.restaurant = restaurant;
  console.log(query);
  try {
    const products = await Product.find(query);
    res.status(200).json(products);
    console.log('products displayed');
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function deleteProduct(req, res) {
  const { id } = req.params;
  const update = { deletedAt: Date.now(), updatedAt: Date.now() };
  try {
    const product = await Product.findOneAndUpdate({ _id: id }, update, {
      new: true,
    });
    if (product.length === 0) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.status(200).json(product);
      console.log('product deleted');
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function updateProduct(req, res) {
  const { id } = req.params;
  const { name, price, category, deletedAt } = req.body;
  const update = { name, price, category, deletedAt, updatedAt: Date.now() };
  try {
    const product = await Product.findOneAndUpdate({ _id: id }, update, {
      new: true,
    });
    if (product.length === 0) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.status(200).json(product);
      console.log('product updated');
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = { createProduct, getProductById, getProducts, deleteProduct, updateProduct };
