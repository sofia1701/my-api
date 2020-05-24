const { Costumer } = require('../sequelize');

exports.createCostumer = (req, res) => {
  Costumer.create(req.body).then((costumer) => res.status(201).json(costumer));
};

exports.listCostumer = (req, res) => {
  Costumer.findAll().then((costumers) => {
    return res.status(200).json(costumers);
  });
};

exports.listCostumerById = (req, res) => {
  const { costumerId } = req.params;
  Costumer.findByPk(costumerId).then((costumer) => {
    if (!costumer) {
      return res
        .status(404)
        .json({ error: 'Sorry, there is no costumer with such id.' });
    }
    return res.status(200).json(costumer);
  });
};

exports.updateCostumerNameById = (req, res) => {
  const { costumerId } = req.params;
  Costumer.findByPk(costumerId).then((costumer) => {
    if (!costumer) {
      return res
        .status(404)
        .json({ error: 'Sorry, there is no costumer with such id.' });
    }
    Costumer.update(req.body, { where: { id: costumerId } })
      .then((updatedCostumer) => {
        return res.status(204).json(updatedCostumer);
      });
  });
};
