const express = require('express');

const router = express.Router();

router.route('/').get(matchController.getAllMatches);

module.exports = router;
