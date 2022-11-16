const express = require('express');
const nationController = require('./../controllers/nationsController');

const router = express.Router();

router.route('/').get(nationController.getAllNations)
router.route('/:id').get(nationController.getNation)

module.exports = router
