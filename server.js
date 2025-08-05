const express = require('express');
const axios = require('axios');
const client = require('prom-client');

const { getVersion } = require('./version');

require('dotenv').config();

const app = express();
const port = 3000;
const SENSEBOX_API_BASE_URL = process.env.SENSEBOX_API_BASE_URL;
const register = new client.Registry();
client.collectDefaultMetrics({ register });

app.get('/version', (req, res) => {
  const version = getVersion();
  res.json({ version });
});

const fetchSenseBoxData = async () => {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const currentDate = new Date().toISOString();
  
    try {
      const response = await axios.get(`${SENSEBOX_API_BASE_URL}?date=${oneHourAgo},${currentDate}&phenomenon=temperature&format=json`);

      return response.data;
    } catch (error) {
      throw new Error('Error fetching SenseBox data: ' + error.message);
    }
  }

app.get('/temperature', async (req, res) => {
    try {
        const boxes = await fetchSenseBoxData();
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
        console.log(JSON.stringify(boxes, null, 2));

        const filteredBoxes = boxes
          .filter(box => box.lastMeasurementAt && new Date(box.lastMeasurementAt) >= new Date(oneHourAgo))
          .map(box => ({
            ...box,
            sensors: (box.sensors || []).filter(sensor => {
              const isTempSensor = 
          sensor.title?.toLowerCase().includes('temperature') ||
          sensor.unit?.toLowerCase() === '°c' ||
          sensor.unit?.toLowerCase() === 'celsius';
        
              const hasRecentMeasurement = sensor.lastMeasurement?.value && 
          new Date(sensor.lastMeasurement.createdAt) >= new Date(oneHourAgo);
        
              const isValidValue = !isNaN(parseFloat(sensor.lastMeasurement?.value));
        
              return isTempSensor && hasRecentMeasurement && isValidValue;
            })
          }))
          .filter(box => box.sensors.length > 0);

        const temperatureData = filteredBoxes.flatMap(box => 
          box.sensors.map(sensor => parseFloat(sensor.lastMeasurement.value))
        );

        const averageTemperature = temperatureData.length > 0 
          ? temperatureData.reduce((sum, temp) => sum + temp, 0) / temperatureData.length 
          : null;

        const status = averageTemperature < 10
          ? 'Too Cold'
          : averageTemperature <= 36
          ? 'Good'
          : 'Too Hot';

        res.json({
          boxes: filteredBoxes,
          totalSensors: temperatureData.length,
          averageTemperature: averageTemperature ? Math.round(averageTemperature * 100) / 100 : null,
          status
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    });

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  let metrics = await register.metrics();
  res.send(metrics);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});