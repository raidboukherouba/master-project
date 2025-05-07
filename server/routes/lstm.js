const express = require('express');
const router = express.Router();
const { analyzeSentimentLstm } = require('../controllers/lstm');

// Define POST route for sentiment analysis
router.post('/dl/lstm', analyzeSentimentLstm);

module.exports = router;