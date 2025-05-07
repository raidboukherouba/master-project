const express = require('express');
const router = express.Router();
const { analyzeSentimentSvm } = require('../controllers/svm');

// Define POST route for sentiment analysis
router.post('/ml/svm', analyzeSentimentSvm);

module.exports = router;