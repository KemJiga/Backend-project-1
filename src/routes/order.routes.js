const { Router } = require('express');
const router = Router();

const {
  createOrder,
  getOrderById,
  getCreatedOrders,
  getFilteredOrders,
  updateOrder,
  deleteOrder,
} = require('../controllers/order.controller');

router.post('/', createOrder);
router.get('/created/', getCreatedOrders);
router.get('/:id', getOrderById);
router.get('/', getFilteredOrders);
router.patch('/:id', updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;
