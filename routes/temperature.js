const express = require('express')
const getTemp = require('../controllers/temperature.js')
const router = express.Router()

router.get('/', getTemp)

module.exports = router;