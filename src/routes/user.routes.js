const { Router } = require('express');
const router = Router();
const { getUser, getUserById, createUser, deleteUser, updateUser } = require('../controllers/user.controller');

router.post('/', createUser);
router.get('/', getUser);
router.get('/:id', getUserById);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
