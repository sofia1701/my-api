const { Costumer } = require('../sequelize');

exports.createCostumer = (req, res) => {
  Costumer.create(req.body).then(costumer => res.status(201).json(costumer));
};

exports.listCostumer = (req, res) => {
  Costumer.findAll().then(costumers => res.status(200).json(costumers));
};
