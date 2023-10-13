const { Router } = require('express');
const router = Router();

const {
  createRestaurant,
  getRestaurantById,
  getRestaurants,
  deleteRestaurant,
  updateRestaurant,
} = require('../controllers/restaurant.controller');

router.get('/', getRestaurants); // Get all restaurants by category and/or name
router.get('/:id', getRestaurantById);
router.post('/',createRestaurant);
router.delete('/:id', deleteRestaurant);
router.patch('/:id', updateRestaurant);

module.exports = router;
