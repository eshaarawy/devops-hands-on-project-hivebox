const client = require('prom-client');

const register = new client.Registry();
client.collectDefaultMetrics({ register });

const getMetrics = async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    let metrics = await register.metrics();
    res.send(metrics);
  } catch (error) {
    res.status(500).json({ message: "Error generating metrics", error: error.message });
  }
};

module.exports = getMetrics;