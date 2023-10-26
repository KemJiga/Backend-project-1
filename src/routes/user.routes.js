const { Router } = require('express');
const router = Router();
const {
  getUser,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
} = require('../controllers/user.controller');

router.post('/create/', createUser);
router.post('/', getUser);
router.get('/:id', getUserById);
router.patch('/', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
