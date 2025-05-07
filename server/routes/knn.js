const express = require('express');
const router = express.Router();
const { analyzeSentimentKnn } = require('../controllers/knn');

// Define POST route for sentiment analysis
router.post('/ml/knn', analyzeSentimentKnn);

module.exports = router;