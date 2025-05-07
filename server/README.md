# 🧠 Sentiment Analysis API (Express Server)

This is the Express.js backend server that acts as a bridge between the React frontend and the Python-based Flask sentiment analysis API. It exposes RESTful endpoints to forward requests to the Flask service and return results in a standardized format.


## 1. 👀 Overview

- Accepts Arabic/Algerian dialect input from the frontend
- Forwards the text to Flask endpoints
- Returns the sentiment result and model confidences
- Handles CORS, environment variables, and error management


## 2. 🔧 Tech Stack

- **Backend Framework**: Node.js with Express.js
- **HTTP Client**: Axios (to communicate with Flask)
- **Environment Variables**: dotenv
- **CORS Handling**: cors
- **Validation** (optional): express-validator or custom middleware
- **Security**: 
   - `helmet` (for setting secure HTTP headers) 
   - `express-rate-limit` (to prevent abuse and control API request rates)


## 3. 🚀 Getting Started

### 3.1. ✅ Prerequisites
- Node.js (v22.12.0 or higher)
- npm (Node Package Manager)
- Flask backend running on `http://127.0.0.1:8000`

### 3.2. ⬇️ Installation
1. Navigate to the `server` directory:

   ```bash
   cd server
2. Install dependencies:

   ```bash
   npm install
3. Start the server:

    ```bash
    npm run dev
    ```

## 4. 🔌 API Endpoints
### 4.1 POST /ml/svm, /ml/knn, /ml/nbm, /dl/cnn, /dl/lstm, /transformers/arabic-bert-base, /transformers/arabic-bert-medium, /transformers/arabic-bert-mini, /transformers/distil-bert-cased, /transformers/aragpt2
These endpoints predict sentiment for the given text using different models. Each response contains the original and cleaned text, along with the sentiment and confidence score.
#### 🔹 Example Response
```
{
  "text": "تعيش خويا ربي يحفضك"
}
```

#### 🔹 Example Response
```
{
  "original_text": "تعيش خويا ربي يحفضك",
  "cleaned_text": "تعيش خويا ربي يحفضك",
  "sentiment": "Positive",
  "confidence": 0.96
}
```

### 4.2 POST /majority-voting
Performs majority voting across the models (arabic_bert_base, distil_bert_cased, aragpt2) and returns the final sentiment with confidence, along with individual model responses.

#### 🔹 Example Response
```
{
  "text": "تعيش خويا ربي يحفضك"
}
```

#### 🔹 Example Response
```
{
  "text": "تعيش خويا ربي يحفضك",
  "majority_vote": {
    "sentiment": "Positive",
    "confidence": 0.96
  },
  "models": {
    "arabic_bert_base": {
      "sentiment": "Positive",
      "confidence": 0.94
    },
    "distil_bert_cased": {
      "sentiment": "Positive",
      "confidence": 0.97
    },
    "aragpt2": {
      "sentiment": "Positive",
      "confidence": 0.95
    }
  }
}
```
### 4.3 POST /stacking
Performs stacking ensemble prediction across the models (arabic_bert_base, distil_bert_cased, aragpt2) using a meta-model and returns the final sentiment with confidence, along with individual model probabilities.

#### 🔹 Example Response
```
{
  "text": "تعيش خويا ربي يحفضك"
}
```

#### 🔹 Example Response
```
{
  "text": "تعيش خويا ربي يحفضك",
  "stacking_vote": {
    "sentiment": "Positive",
    "confidence": 0.92
  },
  "models": {
    "arabic_bert_base": {
      "positive_prob": 0.92,
      "negative_prob": 0.08
    },
    "distil_bert_cased": {
      "positive_prob": 0.95,
      "negative_prob": 0.05
    },
    "aragpt2": {
      "positive_prob": 0.93,
      "negative_prob": 0.07
    }
  }
}
```

## 7. 📁 Folder Structure
```
server/
├── routes/
├── controllers/
├── services/
├── .env
├── app.js
|── server.js
└── package.json
```

## 8. 💡 Notes
Make sure your Flask server is running and accessible.

This Express server simply proxies requests — no model logic is implemented here.

Enable CORS if frontend and backend are on different ports during development.

## 9. 📬 Future Enhancements
- Add caching (e.g. Redis) to reduce redundant predictions
- Add logging middleware
- Dockerize both client, server, and Flask API for easier deployment