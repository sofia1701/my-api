const express = require('express');

const costumerController = require('../controllers/costumer');

const router = express.Router();

router.route('/')
  .post(costumerController.createCostumer)
  .get(costumerController.listCostumer);

router.route('/:costumerId')
  .get(costumerController.listCostumerById)
  .patch(costumerController.updateCostumerNameById);

module.exports = router;
