const axios = require('axios');
const { StatusCodes } = require('http-status-codes');

const analyzeSentimentStacking = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: "Missing 'text' in request" });
  }

  try {
    const response = await axios.post('http://flask-api:8000/stacking', { text });
    return res.status(StatusCodes.OK).json(response.data);

  } catch (error) {
    console.error("Error calling Flask API (stacking):", error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to perform stacking sentiment analysis" });
  }
};

module.exports = { analyzeSentimentStacking };
