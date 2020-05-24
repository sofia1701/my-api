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
    it('creates a new costumer in the database', (done) => {
      request(app)
        .post('/costumers')
        .send({
          name: 'Sofia',
          address: 'Avenue 15',
        })
        .then((res) => {
          expect(res.status).to.equal(201);

          Costumer.findByPk(res.body.id, { raw: true }).then((costumer) => {
            expect(costumer.name).to.equal('Sofia');
            expect(costumer.address).to.equal('Avenue 15');
            done();
          });
        });
    });
  });

  describe('with costumers in the database', () => {
    let costumers;
    beforeEach((done) => {
      Promise.all([
        Costumer.create({ name: 'Sofia', address: 'Avenue 15' }),
        Costumer.create({ name: 'Joe', address: 'Street 4' }),
        Costumer.create({ name: 'Mihn', address: 'Road 11' }),
      ]).then((documents) => {
        costumers = documents;
        done();
      });
    });

    describe('GET /costumers', () => {
      it('gets all costumers records', (done) => {
        request(app)
          .get('/costumers')
          .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body.length).to.equal(3);
            res.body.forEach((costumer) => {
              const expected = costumers.find((c) => c.id === costumer.id);
              expect(costumer.name).to.equal(expected.name);
              expect(costumer.address).to.equal(expected.address);
            });
            done();
          });
      });
    });
  });
});
