const express = require('express');
const nationController = require('./../controllers/nationsController');

const router = express.Router();

router.get('/', nationController.getAllNations)

module.exports = router
