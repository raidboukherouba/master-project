const express = require('express');
const router = express.Router();
const { analyzeSentimentArabicBertBase } = require('../controllers/arabic_bert_base');

// Define POST route for sentiment analysis
router.post('/transformers/arabic-bert-base', analyzeSentimentArabicBertBase);

module.exports = router;