const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const isAuth = require('../middleware/auth');
const isAdmin = require('../middleware/admin');

router.get('/users', [isAuth, isAdmin], adminController.getAllUsers);
router.get('/tasks', [isAuth, isAdmin], adminController.getAllTasks);

module.exports = router;
