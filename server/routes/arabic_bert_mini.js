const express = require('express');
const router = express.Router();
const { analyzeSentimentArabicBertMini } = require('../controllers/arabic_bert_mini');

// Define POST route for sentiment analysis
router.post('/transformers/arabic-bert-mini', analyzeSentimentArabicBertMini);

module.exports = router;