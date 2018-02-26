const express = require('express');
const userCtrl = require('./users.controller');

const router = express.Router();

router.route('/')
    .post(userCtrl.register);

module.exports = router;
