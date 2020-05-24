const express = require('express');

const costumerRouter = require('./routes/costumer');

const app = express();

app.use(express.json());

app.use('/costumers', costumerRouter);

module.exports = app;
