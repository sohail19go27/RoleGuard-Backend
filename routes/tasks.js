const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');
const isAuth = require('../middleware/auth');

router.post('/', isAuth, taskController.createTask);
router.get('/', isAuth, taskController.getTasks);
router.patch('/:id', isAuth, taskController.updateTask);
router.delete('/:id', isAuth, taskController.deleteTask);

module.exports = router;
