const { Router } = require('express');
const router = Router();

const { createOrder } = require('../controllers/order.controller');

router.post('/', createOrder);

module.exports = router;