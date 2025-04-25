const express = require('express');
const { registration, login } = require('../controllers/user.controller');
const router = express.Router();

router.post('/registration', registration );
router.post('/login', login);

module.exports = router