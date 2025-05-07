const express = require('express');
const router = express.Router();
const { analyzeSentimentCnn } = require('../controllers/cnn');

// Define POST route for sentiment analysis
router.post('/dl/cnn', analyzeSentimentCnn);

module.exports = router;