const User = require('../models/user.model');

async function getUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.find({ email, password });
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
  const id = req.params.id;
  try {
    const user = await User.find({ ID: id });
    if (user.length === 0) {
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
  const { name, email, password, ID, type } = req.body;
  try {
    const newUser = new User({ name, email, password, ID, type });
    await newUser.save();
    res.status(201).json(newUser);
    console.log('user added');
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function deleteUser(req, res) {
  const { ID } = req.params.id;
  const update = { isDeleted: true };
  try {
    const user = await User.findOneAndUpdate(ID, update, {
      new: true,
    });
    if (user.length === 0) {
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
  const { ID } = req.params.id;
  const { name, email, password, isDeleted } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      ID,
      { name, email, password, isDeleted },
      {
        new: true,
      }
    );
    if (user.length === 0) {
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
