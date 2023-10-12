const Product = require('../models/product.model');

async function createProduct(req, res) {
  const { name, price, category } = req.body;
  try {
    const newProduct = new Product({ name, price, category });
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
    const product = await Product.find({ _id: id });
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

async function getProducts(req, res) {
  try {
    const products = await Product.find();
    res.status(200).json(products);
    console.log('products displayed');
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function deleteProduct(req, res) {}

async function updateProduct(req, res) {}

module.exports = { createProduct, getProductById, getProducts, deleteProduct, updateProduct };
