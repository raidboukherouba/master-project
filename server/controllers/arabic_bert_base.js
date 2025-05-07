const axios = require('axios');
const { StatusCodes } = require('http-status-codes');

const analyzeSentimentArabicBertBase = async (req, res) => {
  const { text } = req.body;
  
  if (!text) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: "Missing 'text' in request" });
  }

  try {
    const response = await axios.post('http://flask-api:8000/transformers/arabic-bert-base', { text });
    const { sentiment, confidence } = response.data;
    return res.status(StatusCodes.OK).json({
      text,  
      sentiment,
      confidence
    });
  } catch (error) {
    console.error("Error calling Flask API:", error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to analyze sentiment" });
  }
};

module.exports = { analyzeSentimentArabicBertBase };