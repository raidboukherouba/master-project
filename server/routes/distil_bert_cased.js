const express = require('express');
const router = express.Router();
const { analyzeSentimentDistilBertCased } = require('../controllers/distil_bert_cased');

// Define POST route for sentiment analysis
router.post('/transformers/distil-bert-cased', analyzeSentimentDistilBertCased);

module.exports = router;