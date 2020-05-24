module.exports = (sequelize, DataTypes) => {
  const schema = {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
  };

  const Costumer = sequelize.define('Costumer', schema);
  return Costumer;
};
