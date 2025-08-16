const express = require('express')
const getVersion = require('../controllers/version.js');
const router = express.Router()

router.get('/', getVersion)

module.exports = router;