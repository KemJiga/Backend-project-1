const { Router } = require('express');
const router = Router();

const {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
} = require('../controllers/product.controller');

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.delete('/:id', deleteProduct);
router.patch('/:id', updateProduct);

module.exports = router;
