const express = require('express');
const router = express.Router();
const { getLogin, logoutUser, authenticateUser } = require('../controllers/auth');

router
    .route('/login')
    .post(authenticateUser);

router
    .route('/logout')
    .post(logoutUser);

router
    .route('/get-login')
    .post(getLogin);

module.exports = router;