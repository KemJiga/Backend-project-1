const User = require('../models/user.model');

async function getUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.find({ email, password, deletedAt: null });
    if (user.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json(user);
      console.log('user displayed');
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (user.length === 0 || user.deletedAt !== null) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json(user);
      console.log('user displayed by id');
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function createUser(req, res) {
  const { name, email, password, phone, type } = req.body;
  try {
    const newUser = new User({ name, email, password, phone, type });
    await newUser.save();
    res.status(201).json(newUser);
    console.log('user added');
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;
  const update = { deletedAt: Date.now(), updatedAt: Date.now() };
  try {
    const user = await User.findOneAndUpdate({ _id: id, deletedAt:null }, update, {
      new: true,
    });
    if (user === null || user.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json(user);
      console.log('user deleted');
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function updateUser(req, res) {
  const { id } = req.params;
  const { name, email, password, phone } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { name, email, password, phone, updatedAt: Date.now() },
      {
        new: true,
      }
    );
    if (user === null || user.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json(user);
      console.log('user updated');
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = { getUser, getUserById, createUser, deleteUser, updateUser };
