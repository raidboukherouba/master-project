const express = require('express');
const router = express.Router();
const { analyzeSentimentStacking } = require('../controllers/stacking');

// Define POST route for sentiment analysis
router.post('/stacking', analyzeSentimentStacking);

module.exports = router;