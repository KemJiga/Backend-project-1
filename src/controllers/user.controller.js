const User = require('../models/user.model');

async function getUser(req, res) {
  const { email, password } = req.body;
  try {
    const users = await User.find({ email, password });
    res.status(200).json(users);
    console.log('users displayed');
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function getUserById(req, res) {
  const { ID } = req.params.id;
  try {
    const user = await User.find(ID);
    res.status(200).json(user);
    console.log('user displayed by id');
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

async function createUser(req, res) {
  const { name, email, password, ID, type } = req.body;
  const newUser = new User({ name, email, password, ID, type });
  await newUser.save();
  res.status(201).json(newUser);
  console.log('user added');
}

async function deleteUser(req, res) {
  const { ID } = req.params.id;
  const update = { isDeleted: true };
  const user = await User.findOneAndUpdate(ID, update, {
    new: true,
  });
  res.status(200).json(user);
  console.log('user deleted');
}

async function updateUser(req, res) {
  const { ID } = req.params.id;
  const { name, email, password, isDeleted } = req.body;
  const user = await User.findOneAndUpdate(
    ID,
    { name, email, password, isDeleted },
    {
      new: true,
    }
  );
  res.status(200).json(user);
  console.log('user updated');
}

module.exports = { getUser, getUserById, createUser, deleteUser, updateUser };
