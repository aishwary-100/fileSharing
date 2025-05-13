const express = require('express');
const router = express.Router();
const { signup, verifyEmail, login } = require('../controllers/authController.js');

router.post('/signup', signup);
router.get('/verify/:id', verifyEmail);
router.post('/login', login);

module.exports = router;
