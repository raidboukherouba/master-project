import joblib
import os
import numpy as np
from preprocessing.text_preprocessor import preprocess_full

class KnnModel:
    def __init__(self, model_dir):
        self.vectorizer = joblib.load(os.path.join(model_dir, "knn_tfidf_vectorizer.pkl"))
        self.selector = joblib.load(os.path.join(model_dir, "knn_select_best.pkl"))
        self.model = joblib.load(os.path.join(model_dir, "knn_model.pkl"))

    def predict(self, text):
        cleaned_text = preprocess_full(text)
        X_vectorized = self.vectorizer.transform([cleaned_text])
        X_selected = self.selector.transform(X_vectorized)
        prediction = self.model.predict(X_selected)[0]
        proba = self.model.predict_proba(X_selected)[0] if hasattr(self.model, "predict_proba") else None
        sentiment = "positive" if prediction == 1 else "negative"

        return {
            "original_text": text,
            "cleaned_text": cleaned_text,
            "sentiment": sentiment,
            "confidence": float(np.max(proba)) if proba is not None else None
        }
