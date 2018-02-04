const express = require('express');
const userCtrl = require('./users.controller');

const router = express.Router();

router.route('/')
    .get(userCtrl.listAllUsers)
    .post(userCtrl.createUser);

module.exports = router;
