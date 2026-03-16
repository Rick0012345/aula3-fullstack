const express = require('express');
const path = require('path');
const routes = require('./routes');
const logger = require('./middlewares/logger');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Global middleware
app.use(logger);

// Static frontend
const publicDir = path.join(__dirname, '..', 'public');
app.use(express.static(publicDir));

// API routes
app.use(routes);

module.exports = app;
