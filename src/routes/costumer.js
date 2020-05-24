const express = require('express');

const costumerController = require('../controllers/costumer');

const router = express.Router();

router.route('/')
  .post(costumerController.createCostumer);

module.exports = router;
