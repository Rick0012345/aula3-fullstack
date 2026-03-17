const express = require('express');
const routes = require('./routes');
const logger = require('./middlewares/logger');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Global middleware
app.use(logger);

// API routes
app.use(routes);

module.exports = app;
