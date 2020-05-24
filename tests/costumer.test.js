const { expect } = require('chai');
const request = require('supertest');
const { Costumer } = require('../src/sequelize');
const app = require('../src/app');

describe('/costumers', () => {
  before(async () => {
    try {
      await Costumer.sequelize.sync();
    } catch (err) {
      console.log(err);
    }
  });

  beforeEach(async () => {
    try {
      await Costumer.destroy({ where: {} });
    } catch (err) {
      console.log(err);
    }
  });

  describe('POST /costumers', () => {
    it('creates a new costumer in the database', async () => {
      const response = await request(app).post('/costumers').send({
        name: 'Sofia',
        address: 'Avenue 15',
      });

      await expect(response.status).to.equal(201);
      await expect(response.body.name).to.equal('Sofia');

      const costumerRecords = await Costumer.findByPk(response.body.id, { raw: true });
      await expect(costumerRecords.name).to.equal('Sofia');
      await expect(costumerRecords.address).to.equal('Avenue 15');
    });
  });
});
