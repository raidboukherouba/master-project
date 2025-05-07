import os
import pickle
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras import backend as K
from gensim.models import Word2Vec
from preprocessing.text_preprocessor import preprocess_full_dl

# Custom F1 metric
def f1_metric(y_true, y_pred):
    y_pred = K.round(y_pred)
    tp = K.sum(K.cast(y_true * y_pred, 'float'), axis=0)
    fp = K.sum(K.cast((1 - y_true) * y_pred, 'float'), axis=0)
    fn = K.sum(K.cast(y_true * (1 - y_pred), 'float'), axis=0)
    precision = tp / (tp + fp + K.epsilon())
    recall = tp / (tp + fn + K.epsilon())
    f1 = 2 * precision * recall / (precision + recall + K.epsilon())
    return K.mean(f1)

class CNNModel:
    def __init__(self, model_path, tokenizer_path, max_length=180):
        self.max_length = max_length

        self.model = load_model(model_path, custom_objects={'f1_metric': f1_metric})
        with open(tokenizer_path, 'rb') as handle:
            self.tokenizer = pickle.load(handle)

    def predict(self, text):
        cleaned_text = preprocess_full_dl(text)
        sequences = self.tokenizer.texts_to_sequences([cleaned_text])
        padded = pad_sequences(sequences, maxlen=self.max_length, padding='post')
        predictions = self.model.predict(padded)

        score = predictions[0][0]
        sentiment = "positive" if score >= 0.5 else "negative"
        confidence = float(score if sentiment == "positive" else 1 - score)

        return {
            "original_text": text,
            "cleaned_text": cleaned_text,
            "sentiment": sentiment,
            "confidence": confidence
        }
