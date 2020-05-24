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
    describe('GET /costumers/:costumerId', () => {
      it('gets costumers records by id', (done) => {
        const costumer = costumers[0];
        request(app)
          .get(`/costumers/${costumer.id}`)
          .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body.name).to.equal(costumer.name);
            expect(res.body.address).to.equal(costumer.address);
            done();
          });
      });
      it('returns a 404 if no costumer is found', (done) => {
        request(app)
          .get('/costumers/12345')
          .then((res) => {
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('Sorry, there is no costumer with such id.');
            done();
          });
      });
    });
    describe('PATCH /costumers/:costumerId', () => {
      it('updates costumer name by id', (done) => {
        const costumer = costumers[0];
        request(app)
          .patch(`/costumers/${costumer.id}`)
          .send({ name: 'Maria' })
          .then((res) => {
            expect(res.status).to.equal(200);
            Costumer.findByPk(costumer.id, { raw: true }).then((updatedCostumer) => {
              expect(updatedCostumer.name).to.equal('Maria');
              done();
            });
          });
      });

      it('updates costumer address by id', (done) => {
        const costumer = costumers[0];
        request(app)
          .patch(`/costumers/${costumer.id}`)
          .send({ address: 'Chatedral Way 12' })
          .then((res) => {
            expect(res.status).to.equal(200);
            Costumer.findByPk(costumer.id, { raw: true }).then((updatedCostumer) => {
              expect(updatedCostumer.address).to.equal('Chatedral Way 12');
              done();
            });
          });
      });

      it('returns a 404 if no costumer is found', (done) => {
        request(app)
          .get('/costumers/12345')
          .then((res) => {
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('Sorry, there is no costumer with such id.');
            done();
          });
      });
    });
    describe('DELETE /costumers/:costumerId', () => {
      it('deletes a costumer by id', (done) => {
        const costumer = costumers[0];
        request(app)
          .delete(`/costumers/${costumer.id}`)
          .then((res) => {
            expect(res.status).to.equal(204);
            Costumer.findByPk(costumer.id, { raw: true }).then((deletedCostumer) => {
              expect(deletedCostumer).to.equal(null);
              done();
            });
          });
      });
      it('returns a 404 if no costumer is found', (done) => {
        request(app)
          .get('/costumers/12345')
          .then((res) => {
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('Sorry, there is no costumer with such id.');
            done();
          });
      });
    });
  });
});
