const express = require('express');
const router = express.Router();
const { getArrearForm, addArrearForm } = require('../controllers/arrear');

router
    .route('/redoform')
    .get(getArrearForm)
    .post(addArrearForm);


module.exports = router;