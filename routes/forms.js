const express = require('express');
const router = express.Router();
const { getRedoForm, addRedoForm } = require('../controllers/redoForm');

router
    .route('/redoform')
    .get(getRedoForm)
    .post(addRedoForm);


module.exports = router;