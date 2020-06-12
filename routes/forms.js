const express = require('express');
const router = express.Router();
const { getArrearForm, addArrearForm } = require('../controllers/arrear');

router
    .route('/arrear')
    .get(getArrearForm)
    .post(addArrearForm);

module.exports = router;