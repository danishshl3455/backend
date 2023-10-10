const userController = require('../controllers/userController');
const router = require('express').Router();
const authConfig = require('../config/authConfig.js');

router.post('/signUp', userController.signUp);
router.post('/login', userController.login);

module.exports = router;
