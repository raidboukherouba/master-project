const express = require('express');
const router = express.Router();
const { analyzeSentimentArabicBertMedium } = require('../controllers/arabic_bert_medium');

// Define POST route for sentiment analysis
router.post('/transformers/arabic-bert-medium', analyzeSentimentArabicBertMedium);

module.exports = router;