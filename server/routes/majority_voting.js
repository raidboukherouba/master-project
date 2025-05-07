const express = require('express');
const router = express.Router();
const { analyzeSentimentMajorityVoting } = require('../controllers/majority_voting');

router.post('/majority-voting', analyzeSentimentMajorityVoting);

module.exports = router;
