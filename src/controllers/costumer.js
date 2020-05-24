const { Costumer } = require('../sequelize');

exports.createCostumer = (req, res) => {
  Costumer.create(req.body).then(costumer => res.status(201).json(costumer));
};
