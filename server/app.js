const express = require('express');
const cors = require('cors');
const { StatusCodes } = require('http-status-codes');
const rateLimit = require("express-rate-limit");
const helmet = require('helmet');

const svmRouter = require("./routes/svm");
const knnRouter = require("./routes/knn");
const nbmRouter = require("./routes/nbm");

const cnnRouter = require("./routes/cnn");
const lstmRouter = require("./routes/lstm");

const arabicBertBaseRouter = require("./routes/arabic_bert_base");
const arabicBertMiniRouter = require("./routes/arabic_bert_mini");
const arabicBertMediumRouter = require("./routes/arabic_bert_medium");
const distilBertCasedRouter = require("./routes/distil_bert_cased");
const aragpt2Router = require("./routes/aragpt2");

const majorityVotingRouter = require("./routes/majority_voting");
const stackingRouter = require("./routes/stacking")

// Define rate limiter middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `windowMs`
    message: "Too many requests from this IP, please try again later.",
    headers: true, // Include rate limit info in response headers
});

const app = express();

// Middleware
app.use(cors());          // Enable CORS
app.use(express.json());  // Middleware to parse JSON

// Use Helmet for security
app.use(helmet());

// Apply rate limiter to all requests
app.use(limiter);


// Routes
app.use('/api/v1', svmRouter); 
app.use('/api/v1', knnRouter);
app.use('/api/v1', nbmRouter);

app.use('/api/v1', cnnRouter);
app.use('/api/v1', lstmRouter);

app.use('/api/v1', arabicBertBaseRouter);
app.use('/api/v1', arabicBertMiniRouter);
app.use('/api/v1', arabicBertMediumRouter);
app.use('/api/v1', distilBertCasedRouter);
app.use('/api/v1', aragpt2Router);

app.use('/api/v1', majorityVotingRouter);
app.use('/api/v1', stackingRouter)

// Handle non-existent routes
app.use((req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({ error: "route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error("Server Error:", err.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "internel server error" });
});

module.exports = app;  // Export the app for use in server.js
