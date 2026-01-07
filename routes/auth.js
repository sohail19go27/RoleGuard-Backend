const express = require('express');
const router = express.Router();
bodyParser = require('body-parser').json();

const authController = require('../controllers/auth');

router.post('/signup', authController.signup);
router.post('/login', bodyParser, authController.login);
router.post('/setup-admin', authController.setupAdmin);

module.exports = router; 
