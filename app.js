const express = require('express');
const tempRoutes = require('./routes/temperature.js')
const versionRoutes = require('./routes/version.js')
const metricsRoutes = require('./routes/metrics.js')

const app = express();

app.use('/temperature', tempRoutes);
app.use('/version', versionRoutes);
app.use('/metrics', metricsRoutes)

module.exports = app;