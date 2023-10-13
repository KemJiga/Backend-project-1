const Restaurant = require('../models/restaurant.model');

async function createRestaurant(req, res) {
  const { name, category } = req.body;
  try {
    const newRestaurant = new Restaurant({ name, category });
    await newRestaurant.save();
    res.status(201).json(newRestaurant);
    console.log('restaurant added');
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

async function getRestaurantById(req, res) {
  const { id } = req.params;
  try {
    const restaurant = await Restaurant.findById(id);
    if (restaurant.length === 0) {
      res.status(404).json({ error: 'restaurant not found' });
    } else {
      res.status(200).json(restaurant);
      console.log('restaurant found');
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getRestaurants(req, res) {
  const { name, category } = req.body;
  const query = {};
  if (name) query.name = { $regex: name, $options: 'i' };
  if (category) query.category = category;
  console.log(query);
  try {
    const restaurants = await Restaurant.find(query);
    if (restaurants.length === 0) {
      res.status(404).json({ error: 'restaurant not found' });
    } else {
      res.status(200).json(restaurants);
      console.log('restaurants displayed');
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function deleteRestaurant(req, res) {
  const { id } = req.params;
  const update = { deletedAt: Date.now(), updatedAt: Date.now() };
  try {
    const restaurant = await Restaurant.findOneAndUpdate({ _id: id }, update, {
      new: true,
    });
    if (restaurant.length === 0) {
      res.status(404).json({ error: 'restaurant not found' });
    } else {
      res.status(200).json(restaurant);
      console.log('restaurant deleted');
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function updateRestaurant(req, res) {
  const { id } = req.params;
  const { name, category, deletedAt } = req.body;
  const update = { name, category, deletedAt, updatedAt: Date.now() };
  try {
    const restaurant = await Restaurant.findOneAndUpdate({ _id: id }, update, {
      new: true,
    });
    if (restaurant.length === 0) {
      res.status(404).json({ error: 'restaurant not found' });
    } else {
      res.status(200).json(restaurant);
      console.log('restaurant updated');
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = {
  createRestaurant,
  getRestaurantById,
  getRestaurants,
  deleteRestaurant,
  updateRestaurant,
};
