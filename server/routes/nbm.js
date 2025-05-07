const express = require('express');
const router = express.Router();
const { analyzeSentimentNbm } = require('../controllers/nbm');

// Define POST route for sentiment analysis
router.post('/ml/nbm', analyzeSentimentNbm);

module.exports = router;