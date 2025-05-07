const express = require('express');
const router = express.Router();
const { analyzeSentimentAragpt2 } = require('../controllers/aragpt2');

// Define POST route for sentiment analysis
router.post('/transformers/aragpt2', analyzeSentimentAragpt2);

module.exports = router;