import os
import torch
import numpy as np
import joblib
from transformers import (
    AutoTokenizer, AutoModelForSequenceClassification,
    DistilBertTokenizer, DistilBertForSequenceClassification,
    GPT2Tokenizer, GPT2ForSequenceClassification
)
from torch.nn.functional import softmax
from preprocessing.text_preprocessor import preprocess_full


class StackingModel:
    def __init__(self):
        base_dir = os.path.dirname(os.path.abspath(__file__))

        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

        # Load tokenizers
        self.tokenizer_bert = AutoTokenizer.from_pretrained("asafaya/bert-base-arabic")
        self.tokenizer_distil = DistilBertTokenizer.from_pretrained("distilbert-base-multilingual-cased")
        self.tokenizer_gpt = GPT2Tokenizer.from_pretrained("aubmindlab/aragpt2-base")
        if self.tokenizer_gpt.pad_token is None:
            self.tokenizer_gpt.add_special_tokens({'pad_token': self.tokenizer_gpt.eos_token})

        # Load transformer models
        self.model_bert = AutoModelForSequenceClassification.from_pretrained(
            os.path.join(base_dir, "../models/transformers/arabic_base_bert_2_labels"), num_labels=2
        )
        self.model_distil = DistilBertForSequenceClassification.from_pretrained(
            os.path.join(base_dir, "../models/transformers/distil_bert_cased_multi_language_2_labels"), num_labels=2
        )
        self.model_gpt = GPT2ForSequenceClassification.from_pretrained(
            os.path.join(base_dir, "../models/transformers/aragpt2-base_2_labels"), num_labels=2
        )
        self.model_gpt.config.pad_token_id = self.tokenizer_gpt.eos_token_id
        self.model_gpt.resize_token_embeddings(len(self.tokenizer_gpt))

        # Move models to device
        for model in [self.model_bert, self.model_distil, self.model_gpt]:
            model.eval()
            model.to(self.device)

        # Load stacking meta-model
        self.meta_model = joblib.load(os.path.join(base_dir, "../models/transformers/meta_model.pkl"))

    def _get_probabilities(self, model, tokenizer, text):
        text = preprocess_full(text)
        inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True, max_length=180)
        inputs = {key: val.to(self.device) for key, val in inputs.items()}

        with torch.no_grad():
            outputs = model(**inputs)
            probs = softmax(outputs.logits, dim=1).cpu().numpy()[0]
        return probs

    def predict(self, text):
        # Get probabilities
        probs_bert = self._get_probabilities(self.model_bert, self.tokenizer_bert, text)
        probs_distil = self._get_probabilities(self.model_distil, self.tokenizer_distil, text)
        probs_gpt = self._get_probabilities(self.model_gpt, self.tokenizer_gpt, text)

        # Prepare meta-features (use probability of Positive class = probs[1])
        meta_features = np.array([[probs_bert[1], probs_distil[1], probs_gpt[1]]])
        final_pred = self.meta_model.predict(meta_features)[0]
        final_prob = self.meta_model.predict_proba(meta_features)[0][final_pred]

        final_sentiment = "Positive" if final_pred == 1 else "Negative"

        # Ensure all probabilities are rounded to 4 decimal places
        # Convert float32 values to float
        result = {
            "text": text,
            "stacking_vote": {
                "sentiment": final_sentiment,
                "confidence": float(final_prob)  # Ensure this is a regular float
            },
            "models": {
                "arabic_bert_base": {
                    "positive_prob": float(probs_bert[1]),
                    "negative_prob": float(probs_bert[0])
                },
                "distil_bert_cased": {
                    "positive_prob": float(probs_distil[1]),
                    "negative_prob": float(probs_distil[0])
                },
                "aragpt2": {
                    "positive_prob": float(probs_gpt[1]),
                    "negative_prob": float(probs_gpt[0])
                }
            }
        }
        return result
