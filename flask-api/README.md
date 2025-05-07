# 🧠 Algerian Dialect Sentiment Analysis API (Flask)

This is a Flask-based sentiment analysis API tailored for Algerian dialect text. It integrates a wide range of machine learning, deep learning, and transformer-based models, and supports two ensemble prediction strategies:

## 🔍 Supported Models
- **Machine Learning Models:**
  - **SVM** (Support Vector Machine)
  - **KNN** (K-Nearest Neighbors)
  - **NBM** (Multinomial Naive Bayes)

- **Deep Learning Models:**
  - **CNN** (Convolutional Neural Network)
  - **LSTM** (Long Short-Term Memory)

- **Transformer Models:**
  - **Arabic BERT** (Base, Mini, Medium)
  - **DistilBERT Cased**
  - **araGPT2**

- **Ensemble Strategies:**
  - **Majority Voting:** Aggregates predictions from all models to select the most common label.
  - **Stacking:** A meta-model combines output probabilities from multiple models for final prediction.


## 1. 👀 Overview

This API serves as the machine learning inference layer of an Algerian dialect sentiment analysis system. It supports a variety of models—including machine learning, deep learning, and transformer-based architectures—to analyze user input and predict whether the sentiment is Positive or Negative. Ensemble techniques like Majority Voting and Stacking further enhance prediction accuracy.


## 2. ✨ Features

- **Preprocessing**: Clean input text by removing noise, punctuation, links, mentions, and stopwords.
- **Model Selection**: Supports multiple models for sentiment analysis, including:
  - **Machine Learning**: SVM, KNN, NBM
  - **Deep Learning**: CNN, LSTM
  - **Transformers**: Arabic BERT (Base, Mini, Medium), DistilBERT Cased, araGPT2
- **Majority Voting**: Combine predictions from 3 transformer models to decide the final sentiment.
- **Stacking Ensemble**: Use a trained meta-model (svm linear) to learn from base models' outputs.
- **Detailed Response**: Returns prediction per model and final ensemble result with confidence scores.
- **REST API**: Simple and lightweight RESTful interface using Flask.


## 3. 🔧 Technologies Used

- **API Framework**: `Flask`
- **NLP Models**: transformers (from Hugging Face, including Arabic BERT, DistilBERT, AraGPT2)
- **Model Persistence**: `joblib` (v1.4.2)
- **Array Handling**: `numpy` (v1.26.2)
- **GPU Support**: `torch` (v2.0.0), torchaudio, torchvision
- **Preprocessing**: Custom text preprocessor module (using pyarabic, nltk, and gensim)
- **Deep Learning**: `keras` (v2.15.0), `tensorflow` (v2.15.0)
- **Softmax & Inference**: torch.nn.functional.softmax
- **Environment Configuration**: `python-dotenv`


## 4. 🚀 Getting Started

### 4.1 ✅ Prerequisites

- Python 3.8+
- pip
- Virtual environment tool (recommended)

### 4.2 ⬇️ Installation

1. install the requirements:

```bash
pip install -r requirements.txt
```
2. run the server:

```bash
python app.py
```

## 5. 🔌 API Endpoints
### 5.1 POST /svm, /knn, /nbm, /cnn, /lstm, /arabic-bert-base, /arabic-bert-medium, /arabic-bert-mini, /distil-bert-cased, /aragpt2
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

### 5.2 POST /majority-voting
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
### 5.3 POST /stacking
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

## 6. 📁 Folder Structure
```
├── app.py
├── preprocessing/
│   └── text_preprocessor.py
├── models/
|   └── dl/
│       ├── cnn/
|       ├── lstm/
|   └── traditional/
│       ├── svm/
|       ├── knn/
|       ├── nbm/
│   └── transformers/
│       ├── arabic_base_bert_2_labels/
|       ├── arabic_medium_bert_2_labels/
|       ├── arabic_mini_bert_2_labels/
│       ├── distil_bert_cased_multi_language_2_labels/
│       ├── aragpt2-base_2_labels/
│       └── meta_model.pkl
├── sentiment_models/
|   └── cnn_model.py
|   └── knn_model.py
│   └── lstm_model.py
|   └── majority_voting.py
|   └── nbm_model.py
|   └── stacking_model.py
│   └── svm_model.py
|   └── transformers_bert.py
|   └── transformers_gpt.py
├── word2vec/
|   └── tokenizer.pickle
|   └── word2vec_model.bin
│   └── wordsList.npy
|   └── wordVectors.npy
| algerian_arabic_stopwords.txt
├── requirements.txt
```

## 7. 🧪 Testing
You can use tools like Postman, curl, or any frontend app to send POST requests to the following endpoints:
- **SVM**: POST http://127.0.0.1:8000/ml/svm
- **KNN**: POST http://127.0.0.1:8000/ml/knn
- **NBM**: POST http://127.0.0.1:8000/ml/nbm
- **CNN**: POST http://127.0.0.1:8000/dl/cnn
- **LSTM**: POST http://127.0.0.1:8000/dl/lstm
- **Arabic BERT (Base)**: POST http://127.0.0.1:8000/transformers/arabic-bert-base
- **Arabic BERT (Medium)**: POST http://127.0.0.1:8000/transformers/arabic-bert-medium
- **Arabic BERT (Mini)**: POST http://127.0.0.1:8000/transformers/arabic-bert-mini
- **DistilBERT (Cased)**: POST http://127.0.0.1:8000/transformers/distil-bert-cased
- **AraGPT2**: POST http://127.0.0.1:8000/transformers/aragpt2
- **Majority Voting**: POST http://127.0.0.1:8000/majority-voting
- **Stacking**: POST http://127.0.0.1:8000/stacking


## 8. 🛠️ To-Do & Future Improvements
✅ Add more dialect-specific preprocessing
✅ Support for neutral class (3-label classification)
🔲 Dockerize the application
🔲 Add API key authentication
🔲 Model monitoring and logging